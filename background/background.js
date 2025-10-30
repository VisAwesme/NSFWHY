// background/background.js

// Cached blocked sites for sync checking
// background/background.js

// Cached blocked sites for sync checking (fallback list)
let cachedBlockedSites = [
  "pornhub.com",
  "xvideos.com",
  "rule34.xxx",
  "redtube.com"
];

// Load sites from sites.json at install and keep cached copy in background
browser.runtime.onInstalled.addListener(async () => {
  try {
    const response = await fetch(browser.runtime.getURL('data/sites.json'));
    const sites = await response.json();
    if (sites && Array.isArray(sites)) {
      cachedBlockedSites = sites;
    }
  } catch (err) {
    console.log('No custom sites.json found, using defaults');
  }
});

// Also try to load on startup (to handle reloads)
try {
  fetch(browser.runtime.getURL('data/sites.json')).then(r => r.json()).then(sites => {
    if (sites && Array.isArray(sites)) cachedBlockedSites = sites;
  }).catch(() => {});
} catch (e) {}

// Helper function (sync!)
function isBlockedSite(url) {
  try {
    const hostname = new URL(url).hostname;
    return cachedBlockedSites.some(site => hostname.includes(site));
  } catch (e) {
    return false;
  }
}

// Simple sync visit tracking (in-memory)
const visits = {}; // { hostname: [timestamps] }

function trackVisit(url) {
  const now = Date.now();
  try {
    const hostname = new URL(url).hostname;
    if (!visits[hostname]) visits[hostname] = [];
    visits[hostname] = visits[hostname].filter(ts => now - ts < 60000);
    visits[hostname].push(now);
    return visits[hostname].length >= 5; // too many attempts
  } catch (e) {
    return false;
  }
}

// Handle messages from blocked page
browser.runtime.onMessage.addListener((msg, sender) => {
  if (msg && msg.action === 'closeBlockedTab' && sender.tab && sender.tab.id) {
    try { browser.tabs.remove(sender.tab.id); } catch (e) {}
  }
  if (msg && msg.action === 'userContinued') {
    // Could log or update stats here
    console.log('User chose to continue to', msg.target);
  }
});

// Synchronous blocking listener — redirect to blocked page and include target url
browser.webRequest.onBeforeRequest.addListener(
  (details) => {
    if (isBlockedSite(details.url)) {
      console.log(`🚫 BLOCKED: ${details.url}`);
      const tooMany = trackVisit(details.url);
      if (tooMany) {
        try {
          browser.notifications.create({
            type: 'basic',
            iconUrl: browser.runtime.getURL('assets/icon.png'),
            title: 'Too Many Attempts!',
            message: 'Multiple visits detected. Your streak may be reset.'
          });
        } catch (e) {}
      }

      const redirectUrl = browser.runtime.getURL('/blocked/blocked.html') + '?target=' + encodeURIComponent(details.url);
      return { redirectUrl };
    }
    return {};
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
);
