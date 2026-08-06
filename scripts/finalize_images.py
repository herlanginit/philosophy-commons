"""
Resolves the final, manually-vetted Commons file per image group by exact title
(no search ranking involved), and writes scripts/resolved_images.json.

Run with: python3 scripts/finalize_images.py
"""
import json
import re
import time
import urllib.parse
import urllib.request

API = "https://commons.wikimedia.org/w/api.php"

FINAL_PICKS = {
    "KANT": "File:Immanuel Kant by Johann Christoph Frisch.jpg",
    "ARISTOTLE": "File:Aristotle Altemps Inv8575.jpg",
    "PLATO": "File:Plato Silanion Musei Capitolini MC1377.jpg",
    "HUME": "File:Allan Ramsay - David Hume, 1711 - 1776. Historian and philosopher - PG 3521 - National Galleries of Scotland.jpg",
    "DESCARTES": "File:Frans Hals, Portrait of René Descartes.jpg",
    "LOCKE": "File:John Locke.jpg",
    "HOBBES": "File:Leviathan frontispiece cropped British Library.jpg",
    "ROUSSEAU": "File:Jean-Jacques Rousseau. Stipple engraving by R. Hart after M. Wellcome V0005111.jpg",
    "MILL": "File:John Stuart Mill, Vanity Fair, 1873-03-29.jpg",
    "BERKELEY": "File:George Berkeley by John Smibert.jpg",
    "AQUINAS": "File:St-thomas-aquinas.jpg",
    "ANSELM": "File:12th-century painters - Meditations of St Anselm - WGA15732.jpg",
    "RAWLS": "File:John Bordley Rawls 1943 Trim.jpg",
    "KIERKEGAARD": "File:Soeren kierkegaard 5627.jpg",
    "CAMUS": "File:Albert Camus, gagnant de prix Nobel, portrait en buste, posé au bureau, faisant face à gauche, cigarette de tabagisme.jpg",
    "SARTRE": "File:Jean Paul Sartre 1967.jpg",
    "EXISTENTIALISM_GENERIC": "File:The Scream Pastel.jpg",
    "CONFUCIUS": "File:Confucius Tang Dynasty, black print.jpg",
    "LAOZI_DAOISM": "File:Zhang Lu-Laozi Riding an Ox.jpg",
    "ZHUANGZI": "File:'Zhuangzi Dreaming of a Butterfly' by Shibata Zeshin, 1888, Honolulu Museum of Art, 13879.1.JPG",
    "NAGARJUNA": "File:Base Panel reliefs of Temple 2 at ancient ruins of Nalanda University 72.jpg",
    "BUDDHA": "File:Statue of Buddha in sarnath in india.jpg",
    "BENTHAM": "File:Mask on the Jeremy Bentham Auto-Icon at UCL.jpg",
    "GREEK_AGORA": "File:View of the newly discovered part of the Ancient Agora of Athens from the space between the train line and Adrianou Street.jpg",
    "JUSTICE_GENERIC": "File:Fountain of Justice (Gerechtigkeitsbrunnen) on the Roemerberg, Frankfurt (2025).jpg",
    "PROBLEM_OF_EVIL": "File:William Blake - Job and His Family.jpg",
    "RELIGION_GENERIC": "File:Sistine Chapel ceiling, Creation of Adam.jpg",
    "PASCAL": "File:Blaise Pascal Versailles-cropped.jpg",
    "SOCIAL_CONTRACT_GENERIC": "File:BEP-GIRSCH-Declaration of Independence (Trumbull).jpg",
    "WAR": "File:El Tres de Mayo, by Francisco de Goya, from Prado in Google Earth-x0-y1.jpg",
    "JUSTICE_STATUE": "File:Lady Justice, the Old Bailey - geograph.org.uk - 7017754.jpg",
    "PERSONAL_IDENTITY": "File:Mark and Scott Kelly at the Johnson Space Center, Houston Texas - profile.jpg",
    "FREE_WILL": "File:Road Fork Baptist Church.jpg",
    "KNOWLEDGE_EPISTEMOLOGY": "File:Centuries or decades old books at the Central Library, Panjim, Goa 2.jpg",
    "INDUCTION": "File:An orbital sunrise crowns Earth's horizon (iss072e340644).jpg",
    "MIND_BRAIN": "File:Brain; dissection showing the top of the brain, with the dur Wellcome V0008398.jpg",
    "LOGIC_CARROLL": "File:Lewis Carroll (Charles Lutwidge Dodgson).jpg",
    "LOGIC_GENERIC": "File:The Elements of Geometry WDL7103.jpg",
    "DEATH": "File:Adriaen Coorte - Vanitas Still Life with skull and hourglass.jpg",
    "METAPHYSICS_GENERIC": "File:Van Gogh - Starry Night - Google Art Project.jpg",
    "AESTHETICS_VENUS": "File:Sandro Botticelli - La nascita di Venere - Google Art Project - edited.jpg",
    "AESTHETICS_VARIETY": "File:Vénus de Milo - Musée du Louvre AGER LL 299 ; N 527 ; Ma 399.jpg",
    "AESTHETICS_NATURE": "File:Caspar David Friedrich - Wanderer above the Sea of Fog.jpeg",
}


def api_get(params):
    url = API + "?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={"User-Agent": "PhilosophyCommons/1.0 (educational nonprofit site, contact: owenjmwu@gmail.com)"})
    for attempt in range(6):
        try:
            with urllib.request.urlopen(req, timeout=20) as resp:
                return json.loads(resp.read().decode("utf-8"))
        except urllib.error.HTTPError as e:
            if e.code == 429 and attempt < 5:
                time.sleep(3 * (attempt + 1))
                continue
            raise


def strip_tags(s):
    s = re.sub(r"<[^>]+>", "", s or "")
    return " ".join(s.split()).strip()


def fetch_title(title):
    params = {
        "action": "query",
        "titles": title,
        "prop": "imageinfo",
        "iiprop": "url|extmetadata|size|mime",
        "iiurlwidth": 1200,
        "format": "json",
    }
    data = api_get(params)
    pages = data.get("query", {}).get("pages", {})
    for page in pages.values():
        if "missing" in page:
            return None
        infos = page.get("imageinfo", [])
        if not infos:
            return None
        info = infos[0]
        meta = info.get("extmetadata", {})
        license_short = (meta.get("LicenseShortName", {}).get("value") or "").strip()
        artist = strip_tags(meta.get("Artist", {}).get("value", "")) or "Unknown"
        return {
            "title": page.get("title"),
            "url": info.get("thumburl") or info["url"],
            "descriptionurl": info["descriptionurl"],
            "width": info.get("thumbwidth"),
            "height": info.get("thumbheight"),
            "mime": info.get("mime"),
            "license": license_short,
            "artist": artist,
        }
    return None


def main():
    results = {}
    for group, title in FINAL_PICKS.items():
        info = fetch_title(title)
        if not info:
            print(f"MISSING: {group} -> {title}")
            continue
        results[group] = info
        print(f"{group}: {info['title']} | {info['license']} | {info['artist'][:60]} | {info['mime']}")
        time.sleep(1.0)
    with open("scripts/resolved_images.json", "w") as f:
        json.dump(results, f, indent=2)
    print("\nWrote scripts/resolved_images.json")


if __name__ == "__main__":
    main()
