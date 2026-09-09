(function () {
  'use strict';

  // ---- CONFIG ----
  // This should point to wherever your PlumaMetrics instance is hosted.
  // For local testing, this points to your local dev server.
  var ENDPOINT = 'http://localhost:3000/api/track';

  // The site owner sets this when embedding the script (explained in the README).
  var SITE_ID = document.currentScript.getAttribute('data-site-id') || 'unknown';

  // ---- 404 DETECTION (automatic, no setup required) ----
  function detectIs404() {
    var title = document.title.toLowerCase();
    var bodyText = document.body ? document.body.innerText.slice(0, 500).toLowerCase() : '';
    var patterns = ['404', 'page not found', 'not found'];

    for (var i = 0; i < patterns.length; i++) {
      if (title.indexOf(patterns[i]) !== -1 || bodyText.indexOf(patterns[i]) !== -1) {
        return true;
      }
    }
    return false;
  }

  // ---- OPTIONAL STATUS CODE (opt-in, only if site owner set it) ----
  function detectStatusCode() {
    // Option 1: JS global variable
    if (typeof window.__PLUMA_STATUS !== 'undefined') {
      return window.__PLUMA_STATUS;
    }
    // Option 2: meta tag
    var meta = document.querySelector('meta[name="pluma-status"]');
    if (meta) {
      return parseInt(meta.getAttribute('content'), 10);
    }
    return null;
  }

  // ---- DEVICE TYPE (simple, broad categories only) ----
  function getDeviceType() {
    var width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  }

  // ---- BROWSER (broad family only, not full version fingerprinting) ----
  function getBrowser() {
    var ua = navigator.userAgent;
    if (ua.indexOf('Edg') !== -1) return 'Edge';
    if (ua.indexOf('Chrome') !== -1) return 'Chrome';
    if (ua.indexOf('Safari') !== -1) return 'Safari';
    if (ua.indexOf('Firefox') !== -1) return 'Firefox';
    return 'Other';
  }

  // ---- REFERRER (just the domain, not the full URL) ----
  function getReferrerDomain() {
    if (!document.referrer) return null;
    try {
      var url = new URL(document.referrer);
      return url.hostname;
    } catch (e) {
      return null;
    }
  }

  // ---- BUILD THE PAYLOAD ----
  var payload = {
    site_id: SITE_ID,
    path: window.location.pathname,
    referrer: getReferrerDomain(),
    device_type: getDeviceType(),
    browser: getBrowser(),
    screen_width: window.innerWidth,
    is_404: detectIs404(),
    status_code: detectStatusCode()
  };

  // ---- SEND IT ----
  // Using sendBeacon when available — it's designed for exactly this kind of
  // "fire and forget" analytics call, and won't block or slow down page navigation.
  if (navigator.sendBeacon) {
    var blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
    navigator.sendBeacon(ENDPOINT, blob);
  } else {
    fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true
    });
  }
})();