// Simple inside jokes based on URL
const jokes = {
  "halflife 2": "you better play that instead of putting your freak on",
  "minecraft": "build blocks, not... bad habits ",
  "elden ring": "git gud in-game, not in… other places",
  "helldivers 2": "stay out of r34, bro 😭"
};

const url = window.location.href.toLowerCase();
for (const key in jokes) {
  if (url.includes(key)) console.log(jokes[key]);
}
