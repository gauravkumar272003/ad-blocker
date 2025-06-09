chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    const url = new URL(details.url);

    if (url.hostname.includes('youtube.com') && url.pathname.includes('/api/stats/ads')) {
      console.log("Intercepted ad tracking ping:", url.href);

      const fakeEvents = ['start', 'firstQuartile', 'midpoint', 'thirdQuartile', 'complete'];

      // Helper function to send fake pings with random delay between 1-5 seconds
      function sendFakePings(events, baseUrl) {
        let delay = 0;
        for (const event of events) {
          delay += Math.floor(Math.random() * 4000) + 1000; // 1000 to 5000 ms delay increment

          setTimeout(() => {
            const spoofedUrl = baseUrl.replace(/event=[^&]*/, `event=${event}`);
            fetch(spoofedUrl)
              .then(() => console.log(`[YT SPOOFER] Sent fake event ping: ${event}`))
              .catch(() => console.warn(`[YT SPOOFER] Failed to send ping: ${event}`));
          }, delay);
        }
      }

      sendFakePings(fakeEvents, url.href);

      // Block original request to avoid duplicate pings
      return { cancel: true };
    }

    return {};
  },
  { urls: ["*://www.youtube.com/api/stats/ads*"] },
  ["blocking"]
);
