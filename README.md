# Sjödin Arkitektur

Komplett statisk webbplats byggd med Cream som visuell referens och Sjödin Arkitekturs egna projekt, bilder och företagsuppgifter.

## Publicera på GitHub Pages

1. Packa upp GitHub-paketet.
2. Ladda upp **innehållet** i paketet till ditt repository. `index.html`, `styles.css`, `site.js`, projektsidorna och mappen `assets` ska ligga på samma nivå.
3. Öppna Settings → Pages. Välj Deploy from a branch, grenen main och mappen / (root).
4. Spara och vänta tills GitHub har publicerat sidan.

Ladda upp alla filer, inte bara index.html. Filernas namn och undermappar måste behållas. `.nojekyll` följer med och gör webbplatsen kompatibel med GitHub Pages utan byggsteg.

## Innehåll

- Startsida med helskärmsbildspel och pausknapp.
- 20 projektsidor med totalt 63 projektbilder och illustrationer.
- Projektarkiv med sex kategorier och länkar som bevarar vald kategori.
- Tjänster, presentation av Susanna, kontakt och integritetsinformation.
- Mobilmeny, bildförstoring, tangentbordsstöd och respekt för minskad rörelse.
- Lokala bilder och typsnitt, sidtitlar, metabeskrivningar, strukturerad företagsinformation, sitemap och robots.txt.

## Kontaktformuläret

Formuläret förbereder ett mejl och öppnar besökarens e-postprogram. Besökaren granskar och skickar själv. Det finns även en kopieringsknapp. Ingen server eller påhittad bekräftelse på skickat meddelande används. För automatisk leverans direkt från sidan behövs en separat formulärtjänst.

## Egen domän och sökmotorer

Länkar mellan sidor och bilder är relativa och fungerar både på webbhotell och i ett GitHub-projekt. Canonical-adresser, Open Graph, strukturerad data och sitemap använder den publicerade förhandsversionens domän. Inför lansering på kundens riktiga domän: ersätt `https://sjodin-arkitektur-stockholm.carlzzon121.chatgpt.site` i HTML-filerna, `sitemap.xml` och `robots.txt` med den slutliga adressen, inklusive eventuell GitHub-undermapp. Det går också att ändra `BASE` i byggfilen och bygga om.

## Källor och bilder

Original: https://sjodinab.se/ och de länkade projekt-, tjänste- och kontaktsidorna. Information hämtad 28 september 2026. Texterna har bearbetats för den nya presentationen. Ingen extern betygssiffra eller utmärkelse har lagts till. Kundordet och sammanfattningarna kommer från originalsidans publicerade kundomdömen.

Projektens angivna samarbetspartners och fotografkrediter finns på respektive sida. Alla källadresser och bildursprung dokumenteras i `sources.json`. Typsnittens licenser finns i `assets/licenses/`.

## Utvecklingsversionen

Källprojektet har `build.py`, `projects.json` och dokumentation. Kör `python3 build.py` för att återskapa HTML-filerna i `dist`. CSS och JavaScript under `dist` är handskrivna. Webbplatsen behöver inget Node-installationssteg eller ramverk.

Verifierat: interna filreferenser, mobilmeny, bildspelskontroller, kategorifilter, bildgalleri med Escape, mejlunderlag och sidbredder 320, 390 och 1440 px. Bildkvaliteten följer originalmaterialets upplösning; mindre original har inte skalats upp som nya bildfiler.
