"""
For every image group that's shared by more than one resource, pulls several
distinct real, correctly-licensed Wikimedia Commons images (instead of one
image reused across every resource in the group) and assigns one per slug.

Writes scripts/resolved_images_per_slug.json: { slug: {url, artist, license,
descriptionurl} }. Singleton groups just inherit their one resolved image
from scripts/resolved_images.json unchanged.

Run with: python3 scripts/diversify_images.py
"""
import json
import re
import subprocess
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

API = "https://commons.wikimedia.org/w/api.php"
FREE_LICENSES = {"pd", "cc0", "cc-by-2.0", "cc-by-3.0", "cc-by-4.0", "cc-by-sa-2.0",
                  "cc-by-sa-3.0", "cc-by-sa-4.0", "cc-by-sa-2.5", "cc-by-2.5", "attribution"}

# slug order per group, and the search-query variants + a correctness regex
# used to keep results on-subject (avoids substring false-positives like
# "Aristotelis Valaoritis" matching a search for "Aristotle").
GROUP_SPEC = {
    "MIND_BRAIN": {
        "queries": ["human brain anatomical illustration engraving", "brain anatomy Wellcome Collection illustration", "neuron nerve cell illustration antique"],
        "keyword": r"brain|neuron|nerve|cerebr",
    },
    "KNOWLEDGE_EPISTEMOLOGY": {
        "queries": ["old library books photograph", "antique books shelf photograph", "reading room library photograph"],
        "keyword": r"book|librar|read",
    },
    "KANT": {
        "queries": ["Immanuel Kant portrait painting", "Immanuel Kant engraving", "Immanuel Kant Konigsberg statue"],
        "keyword": r"\bKant\b",
    },
    "RAWLS": {
        "queries": ["John Rawls philosopher photograph", "Harvard University Widener Library photograph", "John Rawls Harvard"],
        "keyword": r"Rawls|Harvard",
    },
    "ARISTOTLE": {
        "queries": ["Aristotle bust marble sculpture", "Aristotle portrait painting", "School of Athens Raphael fresco"],
        "keyword": r"Aristotle|School of Athens",
    },
    "PROBLEM_OF_EVIL": {
        "queries": ["William Blake Book of Job illustration", "Gustave Dore Job engraving", "Job biblical suffering painting"],
        "keyword": r"Job|Blake|Dor[ée]",
    },
    "LOGIC_GENERIC": {
        "queries": ["Euclid Elements manuscript page geometry", "medieval geometry manuscript diagram", "Aristotle Organon manuscript page"],
        "keyword": r"Euclid|geometr|Organon|logic",
    },
    "HUME": {
        "queries": ["David Hume portrait painting Allan Ramsay", "David Hume engraving", "David Hume statue Edinburgh"],
        "keyword": r"Hume",
    },
    "CAMUS": {
        "queries": ["Albert Camus portrait photograph", "Albert Camus 1957 Nobel", "Albert Camus writer photograph"],
        "keyword": r"Camus",
    },
    "BUDDHA": {
        "queries": ["Buddha statue Sarnath", "seated Buddha statue photograph", "Buddha statue Bodh Gaya photograph"],
        "keyword": r"Buddha",
    },
    "JUSTICE_GENERIC": {
        "queries": ["Justitia statue Frankfurt Romerberg", "Lady Justice statue Europe photograph", "scales of justice statue photograph"],
        "keyword": r"Justi[ct]|scales",
    },
    "RELIGION_GENERIC": {
        "queries": ["Creation of Adam Michelangelo Sistine Chapel", "Sistine Chapel ceiling panel Michelangelo", "Michelangelo Sistine Chapel fresco detail"],
        "keyword": r"Sistine|Michelangelo|Creation",
    },
    "PERSONAL_IDENTITY": {
        "queries": ["identical twins photograph", "mirror reflection black and white photograph", "double exposure portrait photograph"],
        "keyword": r"twin|mirror|reflection|double exposure",
    },
    "AESTHETICS_VENUS": {
        "queries": ["Botticelli Birth of Venus painting", "Renaissance painting beauty Botticelli", "Primavera Botticelli painting"],
        "keyword": r"Botticelli|Venus|Primavera",
    },
    "AESTHETICS_VARIETY": {
        "queries": ["Venus de Milo statue Louvre photograph", "classical Greek sculpture museum photograph", "ancient Greek marble statue museum"],
        "keyword": r"Venus|Greek|marble|statue|sculpture",
    },
    "PLATO": {
        "queries": ["Plato bust marble sculpture", "Plato portrait painting", "Academy of Athens statue Plato"],
        "keyword": r"Plato",
    },
    "DESCARTES": {
        "queries": ["Rene Descartes portrait painting Frans Hals", "Rene Descartes engraving", "Descartes statue photograph"],
        "keyword": r"Descartes",
    },
    "MILL": {
        "queries": ["John Stuart Mill portrait photograph", "John Stuart Mill engraving statue", "John Stuart Mill Vanity Fair"],
        "keyword": r"Stuart Mill",
    },
    "KIERKEGAARD": {
        "queries": ["Kierkegaard Niels Christian Kierkegaard drawing 1840", "Soren Kierkegaard sketch", "Kierkegaard statue Copenhagen photograph"],
        "keyword": r"Kierkegaard",
    },
    "SARTRE": {
        "queries": ["Jean-Paul Sartre", "Sartre Beauvoir photograph", "Jean-Paul Sartre 1965"],
        "keyword": r"Sartre",
    },
    "EXISTENTIALISM_GENERIC": {
        "queries": ["Edvard Munch The Scream 1893", "Edvard Munch painting", "existentialism lone figure silhouette photograph"],
        "keyword": r"Munch|Scream|silhouette",
    },
    "CONFUCIUS": {
        "queries": ["Confucius Wu Daozi Tang dynasty portrait", "Confucius Temple Qufu photograph", "Confucius traditional painting"],
        "keyword": r"Confucius",
    },
    "LAOZI_DAOISM": {
        "queries": ["Laozi riding ox painting", "Taoist temple photograph China", "Yin Yang symbol Taoism"],
        "keyword": r"Laozi|Taois|Daois|Yin.?Yang|Lao.?Tzu",
    },
    "ZHUANGZI": {
        "queries": ["Zhuangzi butterfly dream painting", "Zhuangzi statue photograph", "Chinese ink painting philosopher butterfly"],
        "keyword": r"Zhuangzi|Chuang",
    },
    "NAGARJUNA": {
        "queries": ["Nalanda Bihar ruins Buddhist university", "Buddhist relief sculpture India philosopher", "Nalanda University ruins photograph"],
        "keyword": r"Nalanda|Buddhis|relief",
    },
    "GREEK_AGORA": {
        "queries": ["Ancient Agora Athens photograph", "Parthenon Acropolis Athens photograph", "ancient Greek temple ruins photograph"],
        "keyword": r"Agora|Acropolis|Parthenon|Greek|Athens",
    },
    "SOCIAL_CONTRACT_GENERIC": {
        "queries": ["Declaration of Independence painting Trumbull", "Signing of the US Constitution painting", "Magna Carta manuscript photograph"],
        "keyword": r"Declaration|Independence|Trumbull|Constitution|Magna Carta",
    },
    "WAR": {
        "queries": ["Francisco de Goya Third of May 1808", "Napoleonic war battle painting", "Goya Disasters of War etching"],
        "keyword": r"Goya|war|battle",
    },
    "JUSTICE_STATUE": {
        "queries": ["Old Bailey Lady Justice statue London", "courthouse Lady Justice statue photograph", "Justitia bronze statue courthouse"],
        "keyword": r"Justice|Justitia|courthouse|Bailey",
    },
    "FREE_WILL": {
        "queries": ["crossroads fork in the road photograph", "road fork photograph rural", "signpost crossroads photograph"],
        "keyword": r"road|fork|cross|signpost",
    },
    "LOGIC_CARROLL": {
        "queries": ["Lewis Carroll photograph portrait", "Charles Dodgson photograph", "Lewis Carroll Alice illustration"],
        "keyword": r"Carroll|Dodgson",
    },
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


def search(term, limit=20):
    params = {
        "action": "query",
        "generator": "search",
        "gsrsearch": term,
        "gsrnamespace": 6,
        "gsrlimit": limit,
        "prop": "imageinfo",
        "iiprop": "url|extmetadata|size|mime",
        "iiurlwidth": 1200,
        "format": "json",
    }
    data = api_get(params)
    pages = data.get("query", {}).get("pages", {})
    out = []
    for page in pages.values():
        title = page.get("title", "")
        infos = page.get("imageinfo", [])
        if not infos:
            continue
        info = infos[0]
        if info.get("mime") not in ("image/jpeg", "image/png"):
            continue
        width = info.get("width", 0)
        height = info.get("height", 0)
        if width < 500 or height < 350:
            continue
        meta = info.get("extmetadata", {})
        license_short = (meta.get("LicenseShortName", {}).get("value") or "").strip()
        license_key = (meta.get("License", {}).get("value") or "").strip().lower()
        is_free = license_key in FREE_LICENSES or "public domain" in license_short.lower() or "pd" in license_key
        if not is_free:
            continue
        categories = meta.get("Categories", {}).get("value", "")
        artist = strip_tags(meta.get("Artist", {}).get("value", ""))
        thumburl = info.get("thumburl") or info["url"]
        if thumburl.endswith("_unscaled"):
            thumburl = thumburl[: -len("_unscaled")]
        out.append({
            "title": title,
            "categories": categories,
            "url": thumburl,
            "descriptionurl": info["descriptionurl"],
            "license": license_short or license_key,
            "artist": artist or "Unknown",
        })
    return out


def main():
    with open("scripts/resolved_images.json") as f:
        group_images = json.load(f)

    proc = subprocess.run(
        ["node", "-e", "import('./scripts/slug-image-groups.mjs').then(m => console.log(JSON.stringify(m.SLUG_TO_GROUP)))"],
        cwd=".", capture_output=True, text=True, check=True,
    )
    slug_to_group = json.loads(proc.stdout)
    by_group = {}
    for slug, group in slug_to_group.items():
        by_group.setdefault(group, []).append(slug)

    per_slug = {}
    used_urls = set()

    for group, slugs in by_group.items():
        if len(slugs) == 1 or group not in GROUP_SPEC:
            # Singleton, or no diversification spec: reuse the original pick.
            info = group_images[group]
            for slug in slugs:
                per_slug[slug] = info
            if len(slugs) == 1:
                used_urls.add(info["url"])
            continue

        spec = GROUP_SPEC[group]
        keyword_re = re.compile(spec["keyword"], re.IGNORECASE)
        pool = []
        seen_titles = set()
        for q in spec["queries"]:
            try:
                results = search(q)
            except Exception as e:
                print(f"ERROR searching '{q}' for {group}: {e}")
                continue
            for r in results:
                if r["title"] in seen_titles:
                    continue
                seen_titles.add(r["title"])
                haystack = r["title"] + " " + r["categories"]
                if keyword_re.search(haystack):
                    pool.append(r)
            time.sleep(1.0)

        # Prefer candidates not already used anywhere else on the site.
        fresh = [r for r in pool if r["url"] not in used_urls]
        candidates = fresh if len(fresh) >= len(slugs) else pool

        if not candidates:
            print(f"NO CANDIDATES for {group}, falling back to single image for all {len(slugs)} slugs")
            info = group_images[group]
            for slug in slugs:
                per_slug[slug] = info
            continue

        print(f"{group}: {len(candidates)} candidates for {len(slugs)} slugs")
        for i, slug in enumerate(slugs):
            pick = candidates[i % len(candidates)]
            per_slug[slug] = {
                "title": pick["title"],
                "url": pick["url"],
                "descriptionurl": pick["descriptionurl"],
                "license": pick["license"],
                "artist": pick["artist"],
            }
            used_urls.add(pick["url"])
            print(f"  {slug} -> {pick['title']} ({pick['license']}, {pick['artist'][:40]})")

    with open("scripts/resolved_images_per_slug.json", "w") as f:
        json.dump(per_slug, f, indent=2)
    print(f"\nWrote scripts/resolved_images_per_slug.json ({len(per_slug)} slugs)")


if __name__ == "__main__":
    main()
