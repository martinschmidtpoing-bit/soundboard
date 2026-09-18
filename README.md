# Multilingual Soundbar

Mobile Soundboard mit vier Registerkarten und je 10 häufigen Schimpf-/Beleidigungswörtern:
Russisch, Arabisch, Türkisch und Serbokroatisch.

## GitHub Pages
1. Alle Dateien ins Root deines Repositories kopieren.
2. Commit + Push auf `main`.
3. Unter Settings → Pages als Quelle `Deploy from a branch`, Branch `main`, Ordner `/ (root)` wählen.
4. Die Seite öffnen und einen Sound-Button antippen.

## Audio
Die App nutzt die Web Speech API (`speechSynthesis`). Daher sind keine MP3-Dateien nötig.
Welche Stimme tatsächlich abgespielt wird, hängt von den auf dem Gerät installierten Browser-/Systemstimmen ab.

Hinweis: Die Begriffe sind umgangssprachlich, teils vulgär, und regionale Bedeutungen/Aussprache können variieren.


## Version 2
Die Sprachregister wurden für mobile Browser robuster gemacht. Tab-Wechsel funktioniert unabhängig davon, ob Sprachsynthese verfügbar ist. `app.js?v=2` verhindert außerdem, dass GitHub Pages/Safari eine alte JavaScript-Version aus dem Cache lädt.
