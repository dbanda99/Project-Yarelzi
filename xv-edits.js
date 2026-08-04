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
      arrivalNotice: "Guests are kindly asked to arrive 20 minutes before the presentation.",
      heroPhrase: "Time has flown and the long-awaited day has arrived. I would love to share this special moment with you. I am counting on your presence!",
      guestWelcome: "We are delighted to invite you!",
      giftIntro: "Having you with us is what matters most! If you would like to give a token of affection, we will be very grateful!",
      giftEnvelope: "\u201cThe envelope shower is the tradition of gifting cash in an envelope on the day of the event.\u201d",
      considerationsTitle: "Please keep in mind",
      considerations: [
        "Arrive at least 20 minutes before the start of the event. (Table assignment)",
        "Follow the dress code",
        "Confirm attendance",
        "Follow the instructions of the event coordination staff."
      ]
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
      arrivalNotice: "Se les pide a los invitados llegar 20 minutos antes de la presentaci\u00f3n.",
      heroPhrase: "El tiempo ha volado y el d\u00eda so\u00f1ado ha llegado. Me encantar\u00eda compartir ese momento especial contigo. \u00a1Cuento con tu presencia!",
      guestWelcome: "\u00a1Es un placer invitarlos!",
      giftIntro: "\u00a1Que nos acompa\u00f1es es lo m\u00e1s importante! Y si est\u00e1 en tu disposici\u00f3n realizar una muestra de cari\u00f1o, \u00a1estaremos muy agradecidos!",
      giftEnvelope: "\u201cLa lluvia de sobres, es la tradici\u00f3n de regalar dinero en efectivo en un sobre el d\u00eda del evento\u201d",
      considerationsTitle: "\u00a1A tomar en cuenta!",
      considerations: [
        "Llegar al menos 20 minutos antes del inicio del evento. (Asignaci\u00f3n de mesa)",
        "Respetar el c\u00f3digo de vestimenta",
        "Confirmar asistencia",
        "Seguir las instrucciones del personal de coordinaci\u00f3n del evento."
      ]
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

  function updateHeroPhrase() {
    const hero = document.querySelector("FrasePrincipal_1_Elegance, fraseprincipal_1_elegance");
    const heading = hero && hero.querySelector("h4");
    if (!heading) return;
    const phrase = (copy[language()] || copy.en).heroPhrase;
    if (heading.textContent.trim() !== phrase) heading.textContent = phrase;
    heading.classList.add("xv-hero-message");
  }

  function updateGuestWelcome() {
    const section = document.getElementById("ConfirmAttendance");
    if (!section) return;
    const welcome = Array.from(section.querySelectorAll("h3")).find((element) => {
      const text = normalizedText(element);
      return text.includes("delighted to invite") || text.includes("nos complace invitar") || text.includes("es un placer invitar");
    });
    if (!welcome) return;
    const value = (copy[language()] || copy.en).guestWelcome;
    if (welcome.textContent.trim() !== value) welcome.textContent = value;
  }

  function updateGiftTable() {
    const section = document.getElementById("MesaDeRegalos");
    if (!section) return;
    const localized = copy[language()] || copy.en;
    const messages = Array.from(section.querySelectorAll("h5"));
    if (messages[0] && messages[0].textContent.trim() !== localized.giftIntro) {
      messages[0].textContent = localized.giftIntro;
    }
    if (messages[0]) messages[0].classList.add("xv-gift-intro");
    if (messages[1] && messages[1].textContent.trim() !== localized.giftEnvelope) {
      messages[1].textContent = localized.giftEnvelope;
    }
    if (messages[1]) messages[1].classList.add("xv-gift-envelope");
    const panel = section.querySelector(".bg-primary-200\\/80");
    if (panel) panel.classList.add("xv-gift-panel");
  }

  function updateConsiderations() {
    const dressCode = document.getElementById("CodigoDeVestimenta");
    if (!dressCode) return;
    const localized = copy[language()] || copy.en;
    let section = document.querySelector(".xv-considerations");

    if (!section) {
      section = document.createElement("section");
      section.className = "xv-considerations";
      section.innerHTML = '<div class="xv-considerations-card"><h2></h2><img class="xv-considerations-divider" src="assets/images/division.png" alt="" aria-hidden="true"><ol></ol></div>';
      const host = dressCode.closest("CodigoVestimenta_2_Elegance, codigovestimenta_2_elegance") || dressCode;
      host.insertAdjacentElement("afterend", section);
    }

    const title = section.querySelector("h2");
    const list = section.querySelector("ol");
    if (title && title.textContent !== localized.considerationsTitle) {
      title.textContent = localized.considerationsTitle;
    }
    const listMarkup = localized.considerations.map((item) => `<li>${item}</li>`).join("");
    if (list && list.innerHTML !== listMarkup) list.innerHTML = listMarkup;
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
    updateHeroPhrase();
    updateGuestWelcome();
    updateGiftTable();
    updateConsiderations();
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

    .xv-hero-message {
      max-width: 52rem;
      margin: 0 auto;
      color: var(--xv-ivory) !important;
      font-family: Georgia, "Times New Roman", serif;
      font-size: clamp(1.45rem, 4.6vw, 2.5rem) !important;
      line-height: 1.55;
      text-align: center;
    }

    #MesaDeRegalos .xv-gift-panel {
      min-height: 0 !important;
      padding: clamp(2.5rem, 9vw, 5rem) clamp(1.25rem, 6vw, 3rem) !important;
      background-color: rgba(8, 50, 38, 0.88) !important;
      color: var(--xv-ivory) !important;
      box-shadow: 0 18px 55px rgba(0, 0, 0, 0.24);
    }

    #MesaDeRegalos .xv-gift-panel h1,
    #MesaDeRegalos .xv-gift-panel h4,
    #MesaDeRegalos .xv-gift-panel h5,
    #MesaDeRegalos .xv-gift-panel invitaicon_minenvelope {
      color: var(--xv-ivory) !important;
      text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
    }

    #MesaDeRegalos .xv-gift-panel h1 {
      margin: 0 !important;
      font-family: "Great Vibes", "Allison", cursive;
      font-size: clamp(3.8rem, 15vw, 6rem);
      font-weight: 400;
      line-height: 0.95;
      text-transform: none;
    }

    #MesaDeRegalos .xv-gift-panel h4 {
      margin: 0.7rem 0 3rem !important;
      font-family: Georgia, "Times New Roman", serif;
      font-size: clamp(2rem, 7vw, 3rem);
      font-weight: 400;
      letter-spacing: 0.08em;
      line-height: 1;
      text-transform: uppercase;
    }

    #MesaDeRegalos .xv-gift-panel h5 {
      max-width: 34rem;
      margin-right: auto;
      margin-left: auto;
      font-family: Georgia, "Times New Roman", serif;
      font-size: clamp(1.2rem, 5.2vw, 1.75rem) !important;
      line-height: 1.55;
      text-align: center;
    }

    #MesaDeRegalos .xv-gift-panel .xv-gift-intro {
      margin-bottom: 2.5rem;
      font-weight: 700;
    }

    #MesaDeRegalos .xv-gift-panel .xv-gift-envelope {
      margin-top: 0;
      font-weight: 400;
    }

    #MesaDeRegalos .xv-gift-panel invitaicon_minenvelope {
      display: block;
      width: 9rem;
      margin: 0 auto 2rem;
    }

    #MesaDeRegalos .xv-gift-panel invitaicon_minenvelope svg {
      width: 100%;
      height: auto;
      color: var(--xv-ivory) !important;
    }

    .xv-considerations {
      padding: clamp(2rem, 7vw, 4.5rem) max(1rem, calc((100% - 920px) / 2));
      background: var(--xv-emerald);
      color: var(--xv-emerald);
    }

    .xv-considerations-card {
      padding: clamp(1.75rem, 6vw, 3.5rem);
      border: 1px solid rgba(138, 90, 32, 0.45);
      background: var(--xv-ivory) url("assets/images/texture.jpg") center / cover;
      box-shadow: 0 18px 55px rgba(0, 0, 0, 0.18);
      text-align: center;
    }

    .xv-considerations h2 {
      margin: 0;
      font-family: "Great Vibes", "Allison", cursive;
      font-size: clamp(2.75rem, 10vw, 5rem);
      line-height: 1;
    }

    .xv-considerations-divider {
      width: min(12rem, 58%);
      margin: 1rem auto 2.5rem;
    }

    .xv-considerations ol {
      counter-reset: xv-consideration;
      display: grid;
      gap: clamp(1.5rem, 5vw, 2.35rem);
      max-width: 42rem;
      margin: 0 auto;
      padding: 0;
      list-style: none;
      font-family: Georgia, "Times New Roman", serif;
      font-size: clamp(1.15rem, 4.2vw, 1.7rem);
      line-height: 1.55;
      text-align: center;
    }

    .xv-considerations li {
      counter-increment: xv-consideration;
    }

    .xv-considerations li::before {
      content: counter(xv-consideration) "- ";
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

    /* RSVP/pass card: keep every visible label white on the green design. */
    #ConfirmAttendance,
    #ConfirmAttendance h1,
    #ConfirmAttendance h2,
    #ConfirmAttendance h3,
    #ConfirmAttendance h4,
    #ConfirmAttendance h5,
    #ConfirmAttendance h6,
    #ConfirmAttendance p,
    #ConfirmAttendance span,
    #ConfirmAttendance .text-primary-100,
    #ConfirmAttendance .text-primary-200,
    #ConfirmAttendance .text-primary-500,
    #ConfirmAttendance .simple-rsvp-panel,
    #ConfirmAttendance .simple-rsvp-repair {
      color: var(--xv-ivory) !important;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.62);
    }

    /* Keep only the confirmation thank-you below the table. */
    #ConfirmAttendance h3.mt-5,
    #ConfirmAttendance h3.font-extrabold {
      display: none !important;
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

    /* Unified invitation typography: white over every section and image. */
    app-root *:not(input):not(select):not(option):not(textarea) {
      color: var(--xv-ivory) !important;
      text-shadow: 0 1px 3px rgba(0, 0, 0, 0.72);
    }

    /* Override section- and utility-level colors with higher specificity. */
    body app-root [id] *:not(input):not(select):not(option):not(textarea),
    body app-root .text-primary-100,
    body app-root .text-primary-200,
    body app-root .text-primary-500,
    body app-root .text-primary-600,
    body app-root r_elegance *:not(input):not(select):not(option):not(textarea),
    body app-root sugerenciahospedaje_elegance *:not(input):not(select):not(option):not(textarea),
    body app-root padres_1_minimalista *:not(input):not(select):not(option):not(textarea) {
      color: var(--xv-ivory) !important;
      text-shadow: 0 1px 3px rgba(0, 0, 0, 0.72) !important;
    }

    /* Force the actual glyph fill used by the venue and dress-code fonts. */
    body app-root #Ubicaciones h1,
    body app-root #Ubicaciones h2,
    body app-root #Ubicaciones h3,
    body app-root #Ubicaciones h4,
    body app-root #Ubicaciones h5,
    body app-root #Ubicaciones h6,
    body app-root #Ubicaciones a,
    body app-root #CodigoDeVestimenta h1,
    body app-root #CodigoDeVestimenta h2,
    body app-root #CodigoDeVestimenta h3,
    body app-root #CodigoDeVestimenta h4,
    body app-root #CodigoDeVestimenta h5,
    body app-root #CodigoDeVestimenta h6,
    body app-root sugerenciahospedaje_elegance h1,
    body app-root sugerenciahospedaje_elegance h2,
    body app-root sugerenciahospedaje_elegance h3,
    body app-root sugerenciahospedaje_elegance h4,
    body app-root sugerenciahospedaje_elegance h5,
    body app-root sugerenciahospedaje_elegance h6,
    body app-root sugerenciahospedaje_elegance a {
      color: #fff8f0 !important;
      -webkit-text-fill-color: #fff8f0 !important;
      text-shadow: 0 1px 3px rgba(0, 0, 0, 0.78) !important;
    }

    app-root input,
    app-root select,
    app-root textarea {
      text-shadow: none;
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
