const script = document.createElement('script');
script.textContent = `
  Object.defineProperty(window, 'ytInitialPlayerResponse', {
    set: function(value) {
      if (value && value.adPlacements) {
        console.log("[YT SPOOFER] AdPlacements removed from player response");
        value.adPlacements = [];
        value.playerAds = [];
        value.adBreaks = [];
      }
      window._ytInitialPlayerResponse = value;
    },
    get: function() {
      return window._ytInitialPlayerResponse;
    }
  });
`;
document.documentElement.appendChild(script);
script.remove();

function skipVideoAd() {
    const video = document.querySelector('video');
  
    // If an ad is playing
    if (document.querySelector('.ad-showing')) {
      const skipBtn = document.querySelector('.ytp-ad-skip-button');
      if (skipBtn) {
        skipBtn.click();  // Click skip if available
      }
  
      // Fast-forward video to end of ad
      if (video && video.duration > 0) {
        video.currentTime = video.duration;
      }
  
      console.log("[YT SPOOFER] Skipped video ad and spoofed tracking");
    }
  }
  
  // Run every second to catch ads
  setInterval(() => {
    skipVideoAd();
  }, 1000);
  
