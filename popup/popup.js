const tabs = document.querySelectorAll(".tab-button");
const contents = document.querySelectorAll(".tab-content");
const streakElem = document.getElementById("streak-count");
const quote = document.getElementById("quote");
const motivateBtn = document.getElementById("motivate");

// handle tabs
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    contents.forEach(c => c.classList.remove("active"));
    document.getElementById(tab.dataset.tab).classList.add("active");
  });
});

// default tab
tabs[0].click();

// motivation quotes
const quotes = [
  "You're doing great, stay strong 🫶",
  "Remember why you started 👊",
  "Resist the pixels, embrace the progress 😤",
  "One more clean day, one more W 🔥"
];

// load streak
browser.storage.local.get(["streak"]).then(data => {
  streakElem.textContent = data.streak || 0;
});

// random motivation
motivateBtn.addEventListener("click", () => {
  quote.textContent = quotes[Math.floor(Math.random() * quotes.length)];
});

// temporary blocked attempt tracking
const blockedAttempts = {}; // { url: [timestamps] }

// function to log blocked visit
function logBlockedVisit(url) {
  const now = Date.now();
  if (!blockedAttempts[url]) blockedAttempts[url] = [];
  blockedAttempts[url].push(now);

  // remove timestamps older than 1 minute
  blockedAttempts[url] = blockedAttempts[url].filter(ts => now - ts < 60000);

  if (blockedAttempts[url].length >= 5) {
    // reset streak
    browser.storage.local.set({ streak: 0 });
    alert("Whoa… repeated attempts! Streak reset 😭");
    blockedAttempts[url] = [];
  }
}

// example usage (content script could send a message)
browser.runtime.onMessage.addListener(msg => {
  if (msg.blockedVisit) logBlockedVisit(msg.url);
});
1