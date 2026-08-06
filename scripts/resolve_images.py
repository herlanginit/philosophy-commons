"""
Resolves one real, freely-licensed photo/artwork per "image group" (a philosopher
or theme shared by several resources) via the Wikimedia Commons search API, and
prints a JSON mapping of group -> {url, credit, artist, license, descriptionUrl}.

Run with: python3 scripts/resolve_images.py
"""
import json
import time
import urllib.parse
import urllib.request

API = "https://commons.wikimedia.org/w/api.php"
FREE_LICENSES = {"pd", "cc0", "cc-by-2.0", "cc-by-3.0", "cc-by-4.0", "cc-by-sa-2.0",
                  "cc-by-sa-3.0", "cc-by-sa-4.0", "cc-by-sa-2.5", "cc-by-2.5", "attribution"}

GROUPS = {
    "KANT": "Immanuel Kant portrait painting",
    "ARISTOTLE": "Aristotle bust marble sculpture",
    "PLATO": "Plato bust marble sculpture",
    "HUME": "David Hume portrait painting Allan Ramsay",
    "DESCARTES": "Rene Descartes portrait painting Frans Hals",
    "LOCKE": "John Locke portrait painting Kneller",
    "HOBBES": "Leviathan Thomas Hobbes frontispiece 1651",
    "ROUSSEAU": "Jean-Jacques Rousseau portrait Quentin de La Tour pastel",
    "MILL": "John Stuart Mill portrait photograph",
    "BERKELEY": "George Berkeley portrait painting",
    "AQUINAS": "Thomas Aquinas portrait painting Carlo Crivelli",
    "ANSELM": "Anselm of Canterbury manuscript illumination",
    "RAWLS": "John Rawls philosopher",
    "KIERKEGAARD": "Kierkegaard Niels Christian Kierkegaard drawing 1840",
    "CAMUS": "Albert Camus photograph",
    "SARTRE": "Sartre Beauvoir Cuba 1960",
    "EXISTENTIALISM_GENERIC": "Edvard Munch The Scream 1893",
    "CONFUCIUS": "Confucius portrait traditional painting",
    "LAOZI_DAOISM": "Laozi painting Taoism",
    "ZHUANGZI": "Zhuangzi butterfly dream painting",
    "NAGARJUNA": "Nalanda Bihar ruins Buddhist university",
    "BUDDHA": "Buddha statue Sarnath",
    "BENTHAM": "Jeremy Bentham Auto-Icon UCL photograph",
    "GREEK_AGORA": "Ancient Agora Athens photograph",
    "JUSTICE_GENERIC": "Justitia statue Frankfurt Romerberg",
    "PROBLEM_OF_EVIL": "William Blake Book of Job illustration",
    "RELIGION_GENERIC": "Creation of Adam Michelangelo Sistine Chapel",
    "PASCAL": "Blaise Pascal portrait painting",
    "SOCIAL_CONTRACT_GENERIC": "Declaration of Independence painting Trumbull",
    "WAR": "Francisco Goya Third of May 1808",
    "JUSTICE_STATUE": "Old Bailey Lady Justice statue London",
    "PERSONAL_IDENTITY": "mirror reflection black and white photograph",
    "FREE_WILL": "crossroads fork in the road photograph",
    "KNOWLEDGE_EPISTEMOLOGY": "old library books photograph",
    "INDUCTION": "sunrise horizon photograph",
    "MIND_BRAIN": "human brain anatomical illustration engraving",
    "LOGIC_CARROLL": "Lewis Carroll photograph portrait",
    "LOGIC_GENERIC": "Euclid Elements manuscript page geometry",
    "DEATH": "vanitas still life painting skull",
    "METAPHYSICS_GENERIC": "Van Gogh The Starry Night 1889",
    "AESTHETICS_VENUS": "Botticelli Birth of Venus painting",
    "AESTHETICS_VARIETY": "Venus de Milo statue Louvre photograph",
    "AESTHETICS_NATURE": "Caspar David Friedrich Wanderer above the Sea of Fog",
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


def search_group(term):
    params = {
        "action": "query",
        "generator": "search",
        "gsrsearch": term,
        "gsrnamespace": 6,
        "gsrlimit": 10,
        "prop": "imageinfo",
        "iiprop": "url|extmetadata|size|mime",
        "iiurlwidth": 1200,
        "format": "json",
    }
    data = api_get(params)
    pages = data.get("query", {}).get("pages", {})
    candidates = []
    for page in pages.values():
        title = page.get("title", "")
        infos = page.get("imageinfo", [])
        if not infos:
            continue
        info = infos[0]
        mime = info.get("mime", "")
        if mime not in ("image/jpeg", "image/png"):
            continue
        width = info.get("width", 0)
        height = info.get("height", 0)
        if width < 600 or height < 400:
            continue
        meta = info.get("extmetadata", {})
        license_short = (meta.get("LicenseShortName", {}).get("value") or "").strip()
        license_key = (meta.get("License", {}).get("value") or "").strip().lower()
        artist_raw = meta.get("Artist", {}).get("value", "")
        credit_raw = meta.get("Credit", {}).get("value", "")
        is_free = license_key in FREE_LICENSES or "public domain" in license_short.lower() or "pd" in license_key
        candidates.append({
            "title": title,
            "url": info.get("thumburl") or info["url"],
            "descriptionurl": info["descriptionurl"],
            "width": info.get("thumbwidth") or width,
            "height": info.get("thumbheight") or height,
            "license": license_short or license_key,
            "artist_raw": artist_raw,
            "credit_raw": credit_raw,
            "is_free": is_free,
        })
    # Prefer free-licensed, then larger images
    candidates.sort(key=lambda c: (not c["is_free"], -(c["width"] * c["height"])))
    return candidates


def strip_tags(s):
    import re
    s = re.sub(r"<[^>]+>", "", s or "")
    return " ".join(s.split()).strip()


def main():
    import os
    results = {}
    if os.path.exists("scripts/resolved_images.json"):
        with open("scripts/resolved_images.json") as f:
            results = json.load(f)
    for group, term in GROUPS.items():
        existing = results.get(group)
        if existing and existing.get("is_free") and existing.get("search") == term:
            print(f"{group}: (cached) {existing['title']}")
            continue
        try:
            candidates = search_group(term)
        except Exception as e:
            print(f"ERROR {group}: {e}")
            results[group] = None
            continue
        free_candidates = [c for c in candidates if c["is_free"]]
        pick = free_candidates[0] if free_candidates else (candidates[0] if candidates else None)
        if not pick:
            print(f"NO RESULT for {group} ({term})")
            results[group] = None
            continue
        artist = strip_tags(pick["artist_raw"]) or "Unknown"
        results[group] = {
            "search": term,
            "title": pick["title"],
            "url": pick["url"],
            "descriptionurl": pick["descriptionurl"],
            "width": pick["width"],
            "height": pick["height"],
            "license": pick["license"],
            "artist": artist,
            "is_free": pick["is_free"],
        }
        flag = "OK" if pick["is_free"] else "**NOT CONFIRMED FREE**"
        print(f"{group}: {flag} | {pick['title']} | {pick['license']} | {artist[:60]}")
        with open("scripts/resolved_images.json", "w") as f:
            json.dump(results, f, indent=2)
        time.sleep(1.5)
    print("\nWrote scripts/resolved_images.json")


if __name__ == "__main__":
    main()
