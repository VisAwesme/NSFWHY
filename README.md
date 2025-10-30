# NSFWHY 🧠

> Not Safe For Why — the extension that guilt-tracks you, motivates you, and memes at you.  

NSFWHY is a **browser extension** designed to help people reduce visits to NSFW sites while keeping a bit of humor and personality alive.  

---

## Features

- 🏆 **Counter / Streak tracking**  
  Tracks your clean days and motivates you to keep going.  

- ⚠️ **Blocker system**  
  Redirects you to a fun warning page when visiting blocked sites.  
  - Clicking **“Continue Anyway”** resets the streak.  
  - Repeated visits (5x in a minute) also reset the streak.  

- 🎨 **Stylized popup**  
  Tabs for `Counter | Settings | Help`  
  Motivation quotes with a sprinkle of sarcasm.  

- ⚙️ **Highly customizable**  
  Add/remove blocked sites, toggle notifications, etc.  

---

## Folder Structure

NSFWHY/
├── manifest.json
├── background/
│ └── background.js
├── content/
│ └── content.js
├── popup/
│ ├── popup.html
│ ├── popup.js
│ └── popup.css
├── blocked/
│ ├── blocked.html
│ └── blocked.css
├── assets/
│ ├── icon.png
│ └── mascot.png
├── data/
│ └── sites.json
└── utils/
└── helpers.js


---

## Installation (Firefox Developer Edition)

1. Open Firefox Developer Edition.  
2. Go to `about:debugging#/runtime/this-firefox`.  
3. Click **Load Temporary Add-on**.  
4. Select `manifest.json` from this folder.  
5. NSFWHY should appear in your toolbar.  

> ⚠️ For safe testing, temporarily add `"example.com"` to `blockedSites` in `background.js` instead of real NSFW domains.

---

## Usage

- Click the **NSFWHY icon** → view streak, motivation quotes, or manage settings.  
- Visiting a blocked site redirects you to a playful warning page.  
- Console gremlins log funny messages if certain sites are visited.  

---

## Future Plans

- AI-based keyword detection for more advanced blocking  
- Customizable inside jokes  
- Mascot animations reacting to streak and relapses  
- Export / import streak data  

---

## Contributing

Feel free to open issues, suggest new jokes, or help improve the streak logic.  
Just… keep it safe and gremlin-friendly 😏  

---

## License

MIT License — do whatever you want, just don’t hurt the gremlins.