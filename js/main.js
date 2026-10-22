const menuMarkup = `
  <div class="topbar"><div class="container topbar-inner"><p>Thoughtful hearing and balance care in Kenya</p><a href="contact-us.html">Contact our team <span aria-hidden="true">↗</span></a></div></div>
  <header class="site-header"><div class="container header-inner">
    <a class="brand" href="index.html" aria-label="Doctors of Hearing home"><img src="assets/doh-logo-300x156.png" alt="Doctors of Hearing" width="300" height="156"></a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-navigation" aria-label="Open navigation"><span></span><span></span><span></span></button>
    <nav class="primary-navigation" id="primary-navigation" aria-label="Main navigation">
      <a class="nav-link" href="index.html">Home</a>
      <details class="nav-dropdown"><summary>Our care <span aria-hidden="true">⌄</span></summary><div class="dropdown-panel"><a href="hearing-care-services.html">Hearing care services</a><a href="hearing-balance-testing.html">Hearing &amp; balance testing</a><a href="paediatric-audiology.html">Paediatric audiology</a><a href="newborn-hearing-screening.html">Newborn screening</a><a href="home-visits.html">Home visits</a></div></details>
      <details class="nav-dropdown"><summary>Hearing health <span aria-hidden="true">⌄</span></summary><div class="dropdown-panel"><a href="hearing-disorders.html">Hearing disorders</a><a href="tinnitus-ringing-in-the-ears.html">Tinnitus</a><a href="balance.html">Balance</a><a href="hearing-loss-in-children.html">Children's hearing</a><a href="prevention.html">Hearing protection</a></div></details>
      <details class="nav-dropdown"><summary>Hearing aids <span aria-hidden="true">⌄</span></summary><div class="dropdown-panel"><a href="audifon.html">Audifon</a><a href="phonak.html">Phonak</a><a href="audio-service.html">Audio Service</a><a href="resound.html">ReSound</a><a href="batteries.html">Batteries &amp; care</a></div></details>
      <a class="nav-link" href="richard-mwangi.html">Our team</a><a class="nav-link" href="resources.html">Resources</a><a class="nav-link" href="contact-us.html">Contact</a>
      <a class="button button-small nav-cta" href="contact-us.html">Book an appointment <span aria-hidden="true">↗</span></a>
    </nav>
  </div></header>`;

const footerMarkup = `
  <footer class="site-footer"><div class="container footer-main">
    <div class="footer-brand"><a href="index.html"><img src="assets/doh-logo-300x156.png" alt="Doctors of Hearing" width="300" height="156"></a><p>Hearing and balance care, with clear information and support for every step.</p></div>
    <div class="footer-column"><h2>Explore</h2><a href="hearing-care-services.html">Our services</a><a href="hearing-balance-testing.html">Hearing &amp; balance tests</a><a href="richard-mwangi.html">Our team</a><a href="contact-us.html">Contact us</a></div>
    <div class="footer-column"><h2>Hearing health</h2><a href="hearing-disorders.html">Hearing disorders</a><a href="tinnitus-ringing-in-the-ears.html">Tinnitus</a><a href="balance.html">Balance</a><a href="prevention.html">Hearing protection</a></div>
    <div class="footer-column"><h2>Discover</h2><a href="ask-the-audiologist.html">Ask the audiologist</a><a href="testimonials.html">Patient experiences</a><a href="thesis-and-research.html">Thesis &amp; research</a><a href="resources.html">Resources</a></div>
  </div><div class="container footer-bottom"><span>© <span id="current-year"></span> Doctors of Hearing</span><span>Hearing &amp; balance care in Kenya</span><a href="#main">Back to top ↑</a></div></footer>`;

function renderArticlePage() {
  const mount = document.querySelector('#page-content');
  if (!mount || !window.pageData) return;
  const slug = location.pathname.split('/').pop() || 'hearing-care-services.html';
  const data = window.pageData[slug];
  if (!data) return;
  if (data.redirect) { location.replace(data.redirect); return; }
  document.title = `${data.title} | Doctors of Hearing`;
  document.querySelector('meta[name="description"]')?.setAttribute('content', data.intro);
  const profilesMarkup = data.profiles ? `<section class="profile-list${data.profilesAtTop ? ' profile-list-top' : ''}" aria-label="Our specialists">${data.profiles.map((person) => `<article class="profile-card"><img src="${person.image}" alt="${person.alt}" loading="lazy"><div class="profile-copy"><p class="eyebrow">${person.role}</p><h2>${person.name}</h2><p class="profile-credentials">${person.credentials}</p>${person.bio.map((paragraph) => `<p>${paragraph}</p>`).join('')}</div></article></section>`).join('')}</section>` : '';
  const topProfilesMarkup = data.profilesAtTop ? `<div class="container">${profilesMarkup}</div>` : '';
  mount.innerHTML = `
    <section class="page-hero"><div class="container page-hero-grid"><div><p class="eyebrow"><span class="eyebrow-line"></span>${data.eyebrow}</p><h1>${data.title}</h1><p class="page-intro">${data.intro}</p><a class="button" href="contact-us.html">Talk to our team <span aria-hidden="true">↗</span></a></div><figure><img src="${data.heroImage || 'assets/clinic-consultation.jpg'}" alt="${data.heroAlt || 'A patient and hearing professional talking in the clinic'}"><figcaption>Doctors of Hearing · Kenya</figcaption></figure></div></section>
    <div class="container page-layout"><article class="page-article">${data.sections.map(([heading, body]) => `<section><h2>${heading}</h2><p>${body}</p></section>`).join('')}${data.profilesAtTop ? '' : profilesMarkup}${data.contact ? '<section class="contact-details"><h2>Contact details</h2><p><a href="tel:+254733112555">+254 733 112 555</a><br><a href="tel:+254724535224">+254 724 535 224</a><br><a href="tel:+254722112555">+254 722 112 555</a><br><a href="mailto:info@doctorsofhearing.org">info@doctorsofhearing.org</a></p></section><section class="contact-form-section"><h2>Send us a message</h2><form class="contact-form" action="https://formsubmit.co/info@doctorsofhearing.org" method="POST"><input type="hidden" name="_subject" value="New contact enquiry from Doctors of Hearing website"><input type="hidden" name="_url" value="https://doctorsofhearing.org/contact-us.html"><input type="text" name="_honey" tabindex="-1" autocomplete="off" class="contact-honey"><label>Full name<input name="name" autocomplete="name" required></label><label>Phone number<input name="phone" type="tel" autocomplete="tel" required></label><label>Email address<input name="email" type="email" autocomplete="email" required></label><label>Subject<input name="subject" required></label><label class="contact-message">How can we help?<textarea name="message" rows="5" required></textarea></label><button class="button" type="submit">Send message <span aria-hidden="true">↗</span></button></form></section>' : ''}</article><aside class="page-aside"><span class="aside-symbol" aria-hidden="true">✳</span><p class="eyebrow">Here to help</p><h2>Let’s find the right next step.</h2><p>Our team can answer questions and help you enquire about an appointment.</p><a class="text-link" href="contact-us.html">Contact the clinic <span aria-hidden="true">→</span></a></aside></div>
    <section class="page-contact-band"><div class="container"><div><p class="eyebrow eyebrow-light">Doctors of Hearing · Kenya</p><h2>Ready to talk with our team?</h2></div><a class="button button-light" href="contact-us.html">Book an appointment <span aria-hidden="true">↗</span></a></div></section>${topProfilesMarkup}`;
  document.querySelector('#shared-header').innerHTML = menuMarkup;
  document.querySelector('#shared-footer').innerHTML = footerMarkup;
  document.querySelectorAll('.primary-navigation a').forEach((link) => {
    if (link.getAttribute('href') === slug) link.classList.add('active');
  });
  const year = document.querySelector('#current-year');
  if (year) year.textContent = String(new Date().getFullYear());
}

renderArticlePage();

document.body.insertAdjacentHTML('beforeend', `<a class="whatsapp-float" href="https://wa.me/254733112555?text=Hello%20Doctors%20of%20Hearing%2C%20I%E2%80%99d%20like%20to%20talk%20to%20your%20team." target="_blank" rel="noopener noreferrer" aria-label="Chat with Doctors of Hearing on WhatsApp"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.04 2a9.8 9.8 0 0 0-8.38 14.88L2.3 22l5.27-1.38A9.8 9.8 0 1 0 12.04 2Zm0 17.9a8.07 8.07 0 0 1-4.1-1.12l-.3-.18-3.12.82.83-3.04-.2-.32a8.1 8.1 0 1 1 6.89 3.84Zm4.45-6.06c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.42-1.34-1.66-.14-.24-.02-.37.1-.49.1-.1.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.46-.4-.4-.54-.4h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.64.58.26 1.02.4 1.38.52.58.18 1.1.16 1.52.1.46-.08 1.42-.58 1.62-1.16.2-.58.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z"/></svg><span>WhatsApp</span></a>`);

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.primary-navigation');
if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
    navigation.classList.toggle('is-open', !isOpen);
  });
  navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    navigation.classList.remove('is-open');
  }));
}
const year = document.querySelector('#current-year');
if (year) year.textContent = String(new Date().getFullYear());

const bookingDialog = document.querySelector('#booking-form');
if (bookingDialog) {
  document.querySelectorAll('[data-open-booking]').forEach((button) => button.addEventListener('click', () => bookingDialog.showModal()));
  document.querySelectorAll('[data-close-booking]').forEach((button) => button.addEventListener('click', () => bookingDialog.close()));
  bookingDialog.addEventListener('click', (event) => {
    if (event.target === bookingDialog) bookingDialog.close();
  });
}
