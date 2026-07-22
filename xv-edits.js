(function () {
  const copy = {
    en: {
      rsvpTitle: "RSVP",
      rsvpBody: "Please confirm your attendance and guest count through your invitation link.",
      rsvpContact: "Questions or confirmations by phone: (956) 552-3859",
      venueShowcase: "Inside Estancia Events"
    },
    es: {
      rsvpTitle: "Confirmaci\u00f3n de asistencia",
      rsvpBody: "Por favor confirma tu asistencia y cantidad de invitados desde el enlace de tu invitaci\u00f3n.",
      rsvpContact: "Dudas o confirmaciones por tel\u00e9fono: (956) 552-3859",
      venueShowcase: "Interior de Estancia Events"
    }
  };

  function normalizedText(element) {
    return (element.textContent || "").replace(/\s+/g, " ").trim().toLowerCase();
  }

  function language() {
    return window.XV_I18N && window.XV_I18N.getLanguage
      ? window.XV_I18N.getLanguage()
      : "en";
  }

  function removeUnconfirmedItineraryItems() {
    const itinerary = Array.from(document.querySelectorAll("#Itinerario")).find((element) => {
      return element.querySelector("h3");
    });
    if (!itinerary) return;

    const unconfirmed = [
      "presentacion", "presentaci\u00f3n", "presentation",
      "cena", "dinner",
      "baile", "dance",
      "despedida", "farewell"
    ];

    Array.from(itinerary.querySelectorAll("h3")).forEach((title) => {
      if (!unconfirmed.includes(normalizedText(title))) return;
      const card = title.closest(".grid");
      const marker = card && card.previousElementSibling && card.previousElementSibling.querySelector(".fa-heart")
        ? card.previousElementSibling
        : null;
      if (card) card.remove();
      if (marker) marker.remove();
    });

    const reception = Array.from(itinerary.querySelectorAll("h3")).find((element) => {
      return ["recepcion", "recepci\u00f3n", "reception"].includes(normalizedText(element));
    });
    if (reception) {
      const card = reception.closest(".grid");
      const time = card && Array.from(card.querySelectorAll("h3")).find((element) => {
        return /^\d{1,2}:\d{2}/.test(normalizedText(element));
      });
      if (time && normalizedText(time) !== "8:00 p.m.") {
        time.textContent = "8:00 p.m.";
      }
    }
  }

  function removePreviousFamilySection() {
    Array.from(document.querySelectorAll("h1, h2, h3")).forEach((heading) => {
      const text = normalizedText(heading);
      if (text !== "family and court" && text !== "familia y corte") return;
      const section = heading.closest(".bg-primary-500") || heading.parentElement;
      if (section) section.remove();
    });
  }

  function updateRsvpReminder() {
    const reminder = Array.from(document.querySelectorAll("h3, p, div")).find((element) => {
      if (element.closest(".xv-rsvp-reminder")) return false;
      const text = normalizedText(element);
      return text.startsWith("rsvp. please confirm") || text.startsWith("rsvp by may 25") || text.startsWith("confirma antes del 25 de mayo");
    });
    if (!reminder) return;

    const localized = copy[language()] || copy.en;
    const section = reminder.closest(".bg-primary-500") || reminder.parentElement;
    reminder.classList.add("xv-rsvp-reminder");
    if (section) section.classList.add("xv-rsvp-reminder-section");
    reminder.innerHTML = [
      `<span class="xv-rsvp-reminder-title">${localized.rsvpTitle}</span>`,
      `<span class="xv-rsvp-reminder-body">${localized.rsvpBody}</span>`,
      `<a class="xv-rsvp-reminder-contact" href="tel:+19565523859">${localized.rsvpContact}</a>`
    ].join("");
  }

  function labelVenueShowcase() {
    const image = document.querySelector('[style*="estancia-inside-venue.jpeg"]');
    if (!image) return;
    const section = image.closest("section") || image.parentElement;
    if (section) section.setAttribute("aria-label", (copy[language()] || copy.en).venueShowcase);
  }

  function applyEdits() {
    removeUnconfirmedItineraryItems();
    removePreviousFamilySection();
    updateRsvpReminder();
    labelVenueShowcase();
  }

  const styles = document.createElement("style");
  styles.textContent = `
    :root {
      --xv-emerald: #0d5c4b;
      --xv-emerald-dark: #073f34;
      --xv-ivory: #fff8f0;
      --xv-bronze: #b8894a;
    }

    .bg-primary-500 { background-color: var(--xv-emerald) !important; }
    .bg-primary-600 { background-color: var(--xv-ivory) !important; }
    .bg-primary-200 { background-color: var(--xv-bronze) !important; }
    .bg-primary-200\\/80 { background-color: rgba(184, 137, 74, 0.84) !important; }
    .text-primary-500 { color: var(--xv-emerald) !important; }
    .text-primary-600 { color: var(--xv-ivory) !important; }
    .text-primary-200 { color: var(--xv-bronze) !important; }
    .text-primary-100 { color: var(--xv-ivory) !important; }
    .border-primary-500 { border-color: var(--xv-bronze) !important; }
    .border-primary-600 { border-color: var(--xv-ivory) !important; }
    button.carousel-btn { background-color: rgba(184, 137, 74, 0.92) !important; }

    .xv-rsvp-reminder {
      display: grid;
      gap: 0.5rem;
      width: 100%;
      margin: 0 auto;
      padding: 1.35rem max(1rem, calc((100% - 760px) / 2));
      box-sizing: border-box;
      background: var(--xv-emerald);
      color: var(--xv-ivory);
      text-align: center;
    }

    .xv-rsvp-reminder-section {
      background: var(--xv-emerald) !important;
      overflow: hidden;
    }

    .xv-rsvp-reminder-title,
    .xv-rsvp-reminder-body,
    .xv-rsvp-reminder-contact { display: block; }

    .xv-rsvp-reminder-title {
      color: var(--xv-bronze);
      font-size: 1.55rem;
      font-weight: 700;
      line-height: 1.15;
    }

    .xv-rsvp-reminder-body { font-size: 1.05rem; line-height: 1.45; }

    .xv-rsvp-reminder-contact {
      color: var(--xv-ivory);
      font-family: Arial, sans-serif;
      font-size: 0.95rem;
      font-weight: 700;
      line-height: 1.45;
      text-decoration: underline;
      text-underline-offset: 0.2rem;
    }
  `;
  document.head.appendChild(styles);

  const observer = new MutationObserver(applyEdits);
  observer.observe(document.body, { childList: true, subtree: true });
  window.addEventListener("load", applyEdits);
  window.addEventListener("xv-language-change", () => window.setTimeout(applyEdits, 50));
  window.setTimeout(applyEdits, 500);
  window.setTimeout(applyEdits, 1500);
  window.setTimeout(() => observer.disconnect(), 10000);
})();
