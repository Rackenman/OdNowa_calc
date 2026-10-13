# Symulator koncentracji problemów społecznych

Edukacyjny symulator porównujący trzy modele łączenia pięciu wskaźników problemów społecznych. Pozwala zmieniać wartości wskaźników i obserwować obliczony wynik oraz udział poszczególnych problemów.

To niezależne narzędzie edukacyjne, a nie oficjalny system urzędowy ani diagnoza obszaru zdegradowanego.

## Wymagania

- Node.js 18 lub nowszy
- Bun 1.0 lub nowszy

## Uruchomienie lokalne

```sh
bun install
bun run dev
```

Vite wyświetli adres lokalnego serwera w terminalu.

## Architektura

`src/App.tsx` składa nagłówek i kalkulator. Interfejs oraz stan suwaków znajdują się w `src/components/DeprivationCalculator.tsx`, czysta funkcja wyniku w `src/data/calculateSyntheticScore.js`, a wagi modeli i wartości przykładowe w `src/data/examplePresets.ts`.

## Sprawdzenie i build produkcyjny

```sh
bun run typecheck
npm test
bun run build
```

Build tworzy statyczne pliki w `dist/`; zawartość tego katalogu można opublikować na hostingu plików statycznych, bez serwera aplikacji. Dla wdrożenia w podkatalogu ustaw bazową ścieżkę podczas budowania, na przykład:

```sh
npm run build -- --base=/podkatalog/
```

Podgląd buildu produkcyjnego:

```sh
bun run preview
```

Repozytorium zawiera `bun.lock`, dlatego Bun jest preferowanym menedżerem pakietów. `package-lock.json` pozostaje dla użytkowników npm; nie należy mieszać instalacji zależności bez aktualizowania właściwego lockfile.
