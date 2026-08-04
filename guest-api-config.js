window.GUEST_API_URL = "https://script.google.com/macros/s/AKfycbxHGoofY4w5eLrfS1kO2a3TADHbiVH5wsCxQAFXfxs3avOydT8Tz6iLeOPzaZqmfQhM/exec";

// Live Server testing only: this guest is shown when no ?guest= value is present.
window.GUEST_API_LOCAL_DEFAULT_GUEST = "1";

// Keep this empty for production-like testing. Guest names and passes should
// come from the Google Sheet, using URLs such as ?guest=1, ?guest=2, etc.
window.GUEST_API_FALLBACKS = {};
