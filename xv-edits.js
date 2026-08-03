(function () {
  const copy = {
    en: {
      rsvpTitle: "RSVP",
      rsvpBody: "Please confirm your attendance and guest count through your invitation link.",
      rsvpContact: "Questions or confirmations by phone: (956) 552-3859",
      venueShowcase: "Inside Estancia Events",
      itinerary: [
        ["Guest welcome and photo session", "8:00 p.m."],
        ["Presentation", "8:30 p.m."],
        ["Dinner", "9:30 p.m."],
        ["Dance begins", "10:30 p.m."]
      ],
      arrivalNotice: "Guests are kindly asked to arrive 20 minutes before the presentation."
    },
    es: {
      rsvpTitle: "Confirmaci\u00f3n de asistencia",
      rsvpBody: "Por favor confirma tu asistencia y cantidad de invitados desde el enlace de tu invitaci\u00f3n.",
      rsvpContact: "Dudas o confirmaciones por tel\u00e9fono: (956) 552-3859",
      venueShowcase: "Interior de Estancia Events",
      itinerary: [
        ["Bienvenida de los invitados y sesi\u00f3n de fotos", "8:00 p.m."],
        ["Presentaci\u00f3n", "8:30 p.m."],
        ["Cena", "9:30 p.m."],
        ["Inicia el baile", "10:30 p.m."]
      ],
      arrivalNotice: "Se les pide a los invitados llegar 20 minutos antes de la presentaci\u00f3n."
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

  function updateItinerary() {
    const itinerary = Array.from(document.querySelectorAll("#Itinerario")).find((element) => {
      return element.querySelector("h3");
    });
    if (!itinerary) return;

    const localized = copy[language()] || copy.en;
    const headings = Array.from(itinerary.querySelectorAll("h3"));
    const eventTitles = headings.filter((element) => !/^\d{1,2}:\d{2}/.test(normalizedText(element)));

    localized.itinerary.forEach(([title, time], index) => {
      const titleElement = eventTitles[index];
      const card = titleElement && titleElement.closest(".grid");
      const timeElement = card && Array.from(card.querySelectorAll("h3")).find((element) => {
        return /^\d{1,2}:\d{2}/.test(normalizedText(element));
      });
      if (titleElement && titleElement.textContent.trim() !== title) titleElement.textContent = title;
      if (timeElement && timeElement.textContent.trim() !== time) timeElement.textContent = time;
    });

    eventTitles.slice(localized.itinerary.length).forEach((titleElement) => {
      const card = titleElement.closest(".grid");
      const marker = card && card.previousElementSibling && card.previousElementSibling.querySelector(".fa-heart")
        ? card.previousElementSibling
        : null;
      if (card) card.remove();
      if (marker) marker.remove();
    });

    let notice = itinerary.querySelector(".xv-arrival-notice");
    if (!notice) {
      notice = document.createElement("p");
      notice.className = "xv-arrival-notice";
      const panel = itinerary.querySelector(".bg-primary-200\\/80") || itinerary;
      panel.appendChild(notice);
    }
    if (notice.textContent !== localized.arrivalNotice) notice.textContent = localized.arrivalNotice;
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
    updateItinerary();
    removePreviousFamilySection();
    updateRsvpReminder();
    labelVenueShowcase();
  }

  const styles = document.createElement("style");
  styles.textContent = `
    :root {
      --xv-emerald: #083226;
      --xv-emerald-dark: #083226;
      --xv-ivory: #fff8f0;
      --xv-bronze: #8a5a20;
    }

    .bg-primary-500 { background-color: var(--xv-emerald) !important; }
    .bg-primary-600 { background-color: var(--xv-ivory) !important; }
    .bg-primary-200 { background-color: var(--xv-bronze) !important; }
    .bg-primary-200\\/80 { background-color: rgba(138, 90, 32, 0.86) !important; }
    .text-primary-500 { color: var(--xv-emerald) !important; }
    .text-primary-600 { color: var(--xv-ivory) !important; }
    .text-primary-200 { color: var(--xv-bronze) !important; }
    .text-primary-100 { color: var(--xv-ivory) !important; }
    .border-primary-500 { border-color: var(--xv-bronze) !important; }
    .border-primary-600 { border-color: var(--xv-ivory) !important; }
    button.carousel-btn { background-color: rgba(138, 90, 32, 0.94) !important; }

    /* Background visible behind the opening envelope and wax seal. */
    SCM_1_Original .fullscreen-fixed,
    .fullscreen-fixed[class*="bg-[#eae3d5]"] {
      background-color: #083226 !important;
    }

    .xv-arrival-notice {
      max-width: 36rem;
      margin: 1.5rem auto 0;
      padding: 0.9rem 1.1rem;
      border: 1px solid rgba(255, 248, 240, 0.72);
      border-radius: 0.5rem;
      background: var(--xv-emerald);
      color: var(--xv-ivory);
      font-family: Arial, sans-serif;
      font-size: 0.95rem;
      font-weight: 700;
      line-height: 1.45;
      text-align: center;
    }

    /* Replace the old pink copy with high-contrast emerald on light panels. */
    #ConfirmAttendance h1,
    #ConfirmAttendance h2,
    #ConfirmAttendance h3,
    #ConfirmAttendance h4,
    #ConfirmAttendance h5,
    #ConfirmAttendance h6,
    #ConfirmAttendance p,
    padres_1_minimalista h1,
    padres_1_minimalista h2,
    padres_1_minimalista h3,
    padres_1_minimalista h4,
    padres_1_minimalista p,
    #Ubicaciones h1,
    #Ubicaciones h2,
    #Ubicaciones h3,
    #Ubicaciones h4,
    #Ubicaciones h5,
    #Ubicaciones h6 {
      color: var(--xv-emerald-dark) !important;
      text-shadow: 0 1px 0 rgba(255, 248, 240, 0.55);
    }

    #ConfirmAttendance .text-primary-200,
    #ConfirmAttendance .text-primary-500,
    padres_1_minimalista .text-primary-200,
    padres_1_minimalista .text-primary-500,
    #Ubicaciones .text-primary-200,
    #Ubicaciones .text-primary-500 {
      color: var(--xv-emerald-dark) !important;
    }

    #Ubicaciones a {
      color: var(--xv-emerald-dark) !important;
      border-color: var(--xv-bronze) !important;
      background: rgba(255, 248, 240, 0.62);
      font-weight: 700;
    }

    #Ubicaciones a i {
      color: var(--xv-bronze) !important;
    }

    /* Venue showcase: emerald copy, bronze used only as an accent. */
    sugerenciahospedaje_elegance h1,
    sugerenciahospedaje_elegance h2,
    sugerenciahospedaje_elegance h3,
    sugerenciahospedaje_elegance h4,
    sugerenciahospedaje_elegance h5,
    sugerenciahospedaje_elegance h6,
    sugerenciahospedaje_elegance p,
    sugerenciahospedaje_elegance a {
      color: var(--xv-emerald-dark) !important;
      text-shadow: 0 1px 0 rgba(255, 248, 240, 0.55);
    }

    sugerenciahospedaje_elegance a {
      border-color: var(--xv-bronze) !important;
      background: rgba(255, 248, 240, 0.62);
      font-weight: 700;
    }

    sugerenciahospedaje_elegance a i {
      color: var(--xv-bronze) !important;
    }

    /* Dress code and contacts use emerald for maximum contrast. */
    #CodigoDeVestimenta h1,
    #CodigoDeVestimenta h2,
    #CodigoDeVestimenta h3,
    #CodigoDeVestimenta h4,
    #CodigoDeVestimenta h5,
    #CodigoDeVestimenta h6,
    #CodigoDeVestimenta p,
    #CodigoDeVestimenta span,
    #Contacto h1,
    #Contacto h2,
    #Contacto h3,
    #Contacto h4,
    #Contacto h5,
    #Contacto h6,
    #Contacto p,
    #Contacto span,
    #Contacto a {
      color: var(--xv-emerald-dark) !important;
      text-shadow: 0 1px 0 rgba(255, 248, 240, 0.55);
    }

    #CodigoDeVestimenta .text-primary-200,
    #CodigoDeVestimenta .text-primary-500,
    #Contacto .text-primary-200,
    #Contacto .text-primary-500 {
      color: var(--xv-emerald-dark) !important;
    }

    #Contacto a {
      border-color: var(--xv-bronze) !important;
      background: rgba(255, 248, 240, 0.62);
      font-weight: 700;
    }

    #Contacto a i {
      color: var(--xv-bronze) !important;
    }

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
