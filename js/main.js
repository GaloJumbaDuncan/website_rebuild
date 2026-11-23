const menuMarkup = `
  <div class="topbar"><div class="container topbar-inner"><p>Thoughtful hearing and balance care in Kenya</p><a href="contact-us.html">Contact our team <span aria-hidden="true">↗</span></a></div></div>
  <header class="site-header"><div class="container header-inner">
    <a class="brand" href="index.html" aria-label="Doctors of Hearing home"><img src="assets/doctors-of-hearing-logo.png" alt="Doctors of Hearing" width="300" height="156"></a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-navigation" aria-label="Open navigation"><span></span><span></span><span></span></button>
    <nav class="primary-navigation" id="primary-navigation" aria-label="Main navigation">
      <a class="nav-link" href="index.html">Home</a>
      <details class="nav-dropdown"><summary>Our care <i class="fa-solid fa-chevron-down" aria-hidden="true"></i></summary><div class="dropdown-panel"><a href="how-can-we-help.html">How can we help?</a><a href="hearing-balance-testing.html">Hearing &amp; balance testing</a><a href="paediatric-audiology.html">Paediatric audiology</a><a href="home-visits.html">Home visits</a></div></details>
      <details class="nav-dropdown"><summary>Hearing aids <i class="fa-solid fa-chevron-down" aria-hidden="true"></i></summary><div class="dropdown-panel"><a href="hearing-aids-kenya.html">Hearing aids in Kenya</a><a href="rechargeable-hearing-aids-kenya.html">Rechargeable hearing aids</a><a href="batteries.html">Batteries &amp; care</a></div></details>
      <a class="nav-link" href="deaf-cyclists.html">Deaf Cyclists</a><a class="nav-link" href="our-team.html">Our team</a>
      <details class="nav-dropdown"><summary>Resources <i class="fa-solid fa-chevron-down" aria-hidden="true"></i></summary><div class="dropdown-panel"><a href="resources.html">BLOG</a><a href="hearing-check.html">Try an online hearing test</a><span class="dropdown-label">Hearing health</span><a href="hearing-disorders.html">Hearing disorders</a><a href="tinnitus-ringing-in-the-ears.html">Tinnitus</a><a href="balance.html">Balance</a><a href="hearing-loss-in-children.html">Children's hearing</a><a href="prevention.html">Hearing protection</a></div></details><a class="nav-link" href="contact-us.html">Contact</a>
      <a class="button button-small nav-cta" href="contact-us.html">Book an appointment <span aria-hidden="true">↗</span></a>
    </nav>
  </div></header>
  <div class="social-bar" aria-label="Follow Doctors of Hearing"><div class="container social-bar-inner"><span>Stay connected</span><a href="https://web.facebook.com/DoctorsOfHearing?_rdc=1&amp;_rdr" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i class="fa-brands fa-facebook-f" aria-hidden="true"></i></a><a href="https://www.instagram.com/docsofhearing/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i class="fa-brands fa-instagram" aria-hidden="true"></i></a><a href="https://www.youtube.com/channel/UCBskCqv_ZfF2Rd4tkjsEcGQ" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><i class="fa-brands fa-youtube" aria-hidden="true"></i></a><a href="https://www.tiktok.com/@doctorsofhearing" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><i class="fa-brands fa-tiktok" aria-hidden="true"></i></a></div></div>`;

const footerMarkup = `
  <footer class="site-footer"><div class="container footer-main">
    <div class="footer-brand"><a href="index.html"><img src="assets/doctors-of-hearing-logo.png" alt="Doctors of Hearing" width="300" height="156"></a><p>Hearing and balance care, with clear information and support for every step.</p><div class="footer-social" aria-label="Follow Doctors of Hearing"><a href="https://web.facebook.com/DoctorsOfHearing?_rdc=1&amp;_rdr" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i class="fa-brands fa-facebook-f" aria-hidden="true"></i></a><a href="https://www.instagram.com/docsofhearing/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i class="fa-brands fa-instagram" aria-hidden="true"></i></a><a href="https://www.youtube.com/channel/UCBskCqv_ZfF2Rd4tkjsEcGQ" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><i class="fa-brands fa-youtube" aria-hidden="true"></i></a><a href="https://www.tiktok.com/@doctorsofhearing" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><i class="fa-brands fa-tiktok" aria-hidden="true"></i></a></div></div>
    <div class="footer-column"><h2>Explore</h2><a href="deaf-cyclists.html">Deaf Cyclists</a><a href="hearing-aids-kenya.html">Hearing aids in Kenya</a><a href="rechargeable-hearing-aids-kenya.html">Rechargeable hearing aids</a><a href="hearing-balance-testing.html">Hearing &amp; balance tests</a><a href="our-team.html">Our team</a><a href="contact-us.html">Contact us</a></div>
    <div class="footer-column"><h2>Hearing health</h2><a href="hearing-disorders.html">Hearing disorders</a><a href="tinnitus-ringing-in-the-ears.html">Tinnitus</a><a href="balance.html">Balance</a><a href="prevention.html">Hearing protection</a></div>
    <div class="footer-column"><h2>Discover</h2><a href="hearing-check.html">Try an online hearing test</a><a href="hearing-care-services.html">Hearing care services</a><a href="ask-the-audiologist.html">Ask the audiologist</a><a href="testimonials.html">Patient experiences</a><a href="thesis-and-research.html">Thesis &amp; research</a><a href="resources.html">BLOG</a></div>
  </div><div class="container footer-bottom"><span>© <span id="current-year"></span> Doctors of Hearing</span><span>Hearing &amp; balance care in Kenya</span><a href="#main">Back to top ↑</a></div></footer>`;

function renderArticlePage() {
  const mount = document.querySelector('#page-content');
  if (!mount || !window.pageData) return;
  const slug = location.pathname.split('/').pop() || 'hearing-care-services.html';
  const data = window.pageData[slug];
  if (!data) return;
  mount.classList.toggle('deaf-cyclists-page', slug === 'deaf-cyclists.html');
  if (data.redirect) { location.replace(data.redirect); return; }
  const seoTitles = {
    'hearing-aids-kenya.html': 'Hearing Aids in Kenya | Assessment & Fitting in Nairobi',
    'deaf-cyclists.html': 'Doctors of Hearing Kenya Deaf Cyclists | Our Story',
    'our-journey-recognised-by-the-media.html': 'Deaf Cyclists in Kenya | Media Coverage | Doctors of Hearing'
  };
  const seoDescriptions = {
    'hearing-aids-kenya.html': 'Explore hearing aids in Kenya with professional assessment, personalised recommendations, fitting and aftercare from Doctors of Hearing in Nairobi.',
    'deaf-cyclists.html': 'Meet the Doctors of Hearing Kenya Deaf Cyclists: a team promoting inclusion, visibility and sporting opportunities for Deaf and hard-of-hearing riders.',
    'our-journey-recognised-by-the-media.html': 'Read media coverage of the Doctors of Hearing Kenya Deaf Cyclists and their work promoting inclusion through cycling.'
  };
  const seoTitle = seoTitles[slug] || `${data.title} | Doctors of Hearing Kenya`;
  const seoDescription = seoDescriptions[slug] || data.intro.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim().slice(0, 158).replace(/\s+\S*$/, '') + '.';
  document.title = seoTitle;
  const setMeta = (key, value, property = 'name') => {
    let tag = document.head.querySelector(`meta[${property}="${key}"]`);
    if (!tag) { tag = document.createElement('meta'); tag.setAttribute(property, key); document.head.append(tag); }
    tag.setAttribute('content', value);
  };
  const canonicalUrl = slug === 'index.html' ? 'https://doctorsofhearing.org/' : `https://doctorsofhearing.org/${slug}`;
  const socialImage = data.heroImage && /^https?:/.test(data.heroImage) ? data.heroImage : 'https://doctorsofhearing.org/assets/doh-logo-300x156.png';
  document.querySelector('link[rel="canonical"]')?.remove();
  const canonical = document.createElement('link'); canonical.rel = 'canonical'; canonical.href = canonicalUrl; document.head.append(canonical);
  setMeta('description', seoDescription);
  setMeta('robots', 'index, follow, max-image-preview:large');
  setMeta('og:type', 'website', 'property'); setMeta('og:site_name', 'Doctors of Hearing', 'property');
  setMeta('og:title', seoTitle, 'property'); setMeta('og:description', seoDescription, 'property');
  setMeta('og:url', canonicalUrl, 'property'); setMeta('og:image', socialImage, 'property');
  setMeta('twitter:card', 'summary_large_image'); setMeta('twitter:title', seoTitle);
  setMeta('twitter:description', seoDescription); setMeta('twitter:image', socialImage);
  const structuredData = { '@context': 'https://schema.org', '@type': 'WebPage', name: seoTitle, description: seoDescription, url: canonicalUrl, isPartOf: { '@type': 'WebSite', name: 'Doctors of Hearing', url: 'https://doctorsofhearing.org/' }, about: { '@type': 'MedicalOrganization', name: 'Doctors of Hearing' } };
  let schema = document.querySelector('#page-structured-data');
  if (!schema) { schema = document.createElement('script'); schema.id = 'page-structured-data'; schema.type = 'application/ld+json'; document.head.append(schema); }
  schema.textContent = JSON.stringify(structuredData);
  const profilesMarkup = data.profiles ? `<section class="profile-list${data.profilesAtTop ? ' profile-list-top' : ''}${data.teamIndex ? ' profile-list-grid' : ''}" aria-label="Our specialists">${data.profiles.map((person) => `<article class="profile-card"><img src="${person.image}" alt="${person.alt}" loading="lazy"><div class="profile-copy"><p class="eyebrow">${person.role}</p><h2>${person.name}</h2><p class="profile-credentials">${person.credentials}</p>${person.bio.map((paragraph) => `<p>${paragraph}</p>`).join('')}${person.href ? `<a class="profile-read-more" href="${person.href}">Read more <span aria-hidden="true">→</span></a>` : ''}</div></article>`).join('')}</section>` : '';
  const topProfilesMarkup = data.profilesAtTop ? `<div class="container">${profilesMarkup}</div>` : '';
  const galleryMarkup = data.gallery?.length ? `<section class="cyclist-gallery container" aria-label="Deaf Cyclists photo gallery"><h2>On the road together</h2><div class="cyclist-gallery-grid">${data.gallery.map((photo) => `<figure><img src="${photo.image}" alt="${photo.alt}" loading="lazy"></figure>`).join('')}</div></section>` : '';
  const productGalleryMarkup = data.productGallery?.length ? `<section class="product-gallery container" aria-label="Rechargeable hearing aid styles"><h2>Explore hearing aid styles</h2><div class="product-gallery-grid">${data.productGallery.map((photo) => `<figure><img src="${photo.image}" alt="${photo.alt}" loading="lazy"><figcaption>${photo.caption}</figcaption></figure>`).join('')}</div></section>` : '';
  const faqMarkup = data.faq?.length ? `<section class="faq-section container" aria-label="Frequently asked questions"><h2>Frequently asked questions about rechargeable hearing aids</h2><div class="faq-list">${data.faq.map(([question, answer]) => `<details><summary>${question}</summary><p>${answer}</p></details>`).join('')}</div></section>` : '';
  const socialIconClasses = { Facebook: 'fa-brands fa-facebook-f', TikTok: 'fa-brands fa-tiktok', YouTube: 'fa-brands fa-youtube', Instagram: 'fa-brands fa-instagram' };
  const quickLinksMarkup = data.quickLinks?.length ? `<nav class="page-quick-links" aria-label="Social media quick links"><span class="page-quick-links-label">${data.quickLinksLabel || 'Follow Doctors of Hearing &amp; Deaf Cyclists'}</span><div>${data.quickLinks.map((link) => `<a class="social-card" href="${link.href}" target="_blank" rel="noopener noreferrer"><span class="social-card-mark" aria-hidden="true"><i class="${socialIconClasses[link.platform] || ''}"></i></span><span class="social-card-copy"><strong>${link.platform}</strong><small>${link.audience}</small></span><span class="social-card-arrow" aria-hidden="true">↗</span></a>`).join('')}</div></nav>` : '';
  const heroFigureMarkup = data.heroImage ? `<figure${data.heroImageClass ? ` class="${data.heroImageClass}"` : ''}><img src="${data.heroImage}" alt="${data.heroAlt || 'Doctors of Hearing in Kenya'}"><figcaption>${data.heroCaption || 'Doctors of Hearing · Kenya'}</figcaption></figure>` : '';
  const heroGalleryMarkup = data.heroGallery?.length ? `<div class="hearing-aid-color-grid" aria-label="Hearing aid styles in six colors">${data.heroGallery.map((image, index) => `<figure><img src="${image}" alt="Behind-the-ear hearing aid, color option ${index + 1}" loading="lazy"></figure>`).join('')}</div>` : '';
  const storyCardsMarkup = data.storyCards?.length ? `<section class="featured-stories container" aria-labelledby="featured-stories-title"><div class="featured-stories-heading"><p class="eyebrow">Featured stories</p><h2 id="featured-stories-title">Stories featuring our team</h2><p>Discover coverage of the Doctors of Hearing Deaf Cyclists and their work for visibility and inclusion.</p></div><div class="featured-story-grid">${data.storyCards.map((story) => `<article class="featured-story-card"><a class="featured-story-image" href="${story.href}" target="_blank" rel="noopener noreferrer" aria-label="${story.action}: ${story.title}"><img src="${story.image}" alt="${story.alt}" loading="lazy"></a><div class="featured-story-copy"><p class="eyebrow">${story.source}</p><h3><a href="${story.href}" target="_blank" rel="noopener noreferrer">${story.title}</a></h3><p>${story.description}</p><a class="featured-story-link" href="${story.href}" target="_blank" rel="noopener noreferrer">${story.action} <span aria-hidden="true">↗</span></a></div></article>`).join('')}</div></section>` : '';
  const contactFormMarkup = data.contact ? `<div class="contact-hero-form"><p class="eyebrow">Schedule an assessment</p><h2>Send us a message</h2><p class="contact-form-intro">Contact Doctors of Hearing to arrange an assessment and discuss your hearing or balance care.</p><form id="contact-message-form" class="contact-form" action="https://formsubmit.co/incusear@gmail.com" method="POST"><input type="hidden" name="_subject" value="New contact enquiry from Doctors of Hearing website"><input type="hidden" name="_url" value="https://doctorsofhearing.org/contact-us.html"><input type="text" name="_honey" tabindex="-1" autocomplete="off" class="contact-honey"><label>Full name<input name="name" autocomplete="name" required></label><label>Phone number<input name="phone" type="tel" autocomplete="tel" required></label><label>Email address<input name="email" type="email" autocomplete="email" required></label><label>Subject<input name="subject" required></label><label class="contact-message">How can we help?<textarea name="message" rows="4" required></textarea></label><button class="button" type="submit">Send message <span aria-hidden="true">↗</span></button></form></div>` : '';
  const contactDetailsMarkup = data.contact ? `<div class="contact-info-links contact-details-inline" aria-label="Contact details"><a href="tel:+254733112555"><i class="fa-solid fa-phone" aria-hidden="true"></i><span>+254 733 112 555</span></a><a href="tel:+254705112555"><i class="fa-solid fa-phone" aria-hidden="true"></i><span>+254 705 112 555</span></a><a href="mailto:info@doctorsofhearing.org"><i class="fa-regular fa-envelope" aria-hidden="true"></i><span>info@doctorsofhearing.org</span></a></div>` : '';
  const pageLayoutMarkup = data.contact || data.profilesAtTop || !data.sections?.length ? '' : `<div class="container page-layout"><article class="page-article">${data.sections.map(([heading, body]) => `<section><h2>${heading}</h2><p>${body}</p></section>`).join('')}${profilesMarkup}</article><aside class="page-aside"><span class="aside-symbol" aria-hidden="true">✳</span><p class="eyebrow">Here to help</p><h2>Let’s find the right next step.</h2><p>Our team can answer questions and help you enquire about an appointment.</p><a class="text-link" href="contact-us.html">Contact the clinic <span aria-hidden="true">→</span></a></aside></div>`;
  mount.innerHTML = `
    <section class="page-hero"><div class="container page-hero-grid${data.contact ? ' page-hero-grid-contact' : data.heroImage || data.heroGallery?.length ? '' : ' page-hero-grid-no-image'}"><div><p class="eyebrow"><span class="eyebrow-line"></span>${data.eyebrow}</p><h1 class="${data.heroTitleClass || ''}">${data.title}</h1><p class="page-intro">${data.intro}</p>${data.contact ? contactDetailsMarkup : quickLinksMarkup}${data.contact ? '' : '<a class="button" href="contact-us.html">Talk to our team <span aria-hidden="true">↗</span></a>'}</div>${data.contact ? contactFormMarkup : (heroGalleryMarkup || heroFigureMarkup)}</div></section>
    ${storyCardsMarkup}${topProfilesMarkup}${pageLayoutMarkup}
    ${productGalleryMarkup}${faqMarkup}${galleryMarkup}${data.teamIndex ? '' : '<section class="page-contact-band"><div class="container"><div><p class="eyebrow eyebrow-light">Doctors of Hearing · Kenya</p><h2>Ready to talk with our team?</h2></div><a class="button button-light" href="contact-us.html">Book an appointment <span aria-hidden="true">↗</span></a></div></section>'}`;
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
const supportsHover = window.matchMedia('(hover: hover)');
if (navigation) {
  navigation.querySelectorAll('.nav-dropdown').forEach((dropdown) => {
    const summary = dropdown.querySelector('summary');
    const closeWhenUnfocused = () => {
      if (!dropdown.matches(':hover') && !dropdown.matches(':focus-within')) dropdown.removeAttribute('open');
    };
    dropdown.addEventListener('pointerenter', () => {
      if (supportsHover.matches) dropdown.setAttribute('open', '');
    });
    dropdown.addEventListener('pointerleave', () => {
      if (supportsHover.matches) closeWhenUnfocused();
    });
    dropdown.addEventListener('focusin', () => {
      if (supportsHover.matches) dropdown.setAttribute('open', '');
    });
    dropdown.addEventListener('focusout', () => {
      if (supportsHover.matches) requestAnimationFrame(closeWhenUnfocused);
    });
    summary?.addEventListener('click', (event) => {
      if (supportsHover.matches) {
        event.preventDefault();
        dropdown.setAttribute('open', '');
      }
    });
  });
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

document.querySelectorAll('.review-card').forEach((card) => {
  const quote = card.querySelector('.review-quote');
  const toggle = card.querySelector('.review-toggle');
  if (!quote || !toggle) return;

  const fullQuote = quote.innerHTML;
  const previewText = quote.textContent.replace(/\s+/g, ' ').trim();
  const previewLength = 150;
  toggle.hidden = previewText.length <= previewLength;
  if (!toggle.hidden) quote.textContent = `${previewText.slice(0, previewLength).trimEnd()}…`;

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    quote.innerHTML = expanded ? '' : fullQuote;
    if (expanded) quote.textContent = `${previewText.slice(0, previewLength).trimEnd()}…`;
    toggle.textContent = expanded ? 'See more' : 'See less';
  });
});
