// Analytics utility, stubbed for GA4
function trackEvent(name, params) {
  params = params || {};
  if (typeof gtag === 'function') {
    gtag('event', name, params);
  } else {
    console.log('[trackEvent]', name, params);
  }
}

function handleApplySubmit(event) {
  event.preventDefault();
  var form = event.target;
  var name = form.name.value;
  var industry = form.industry.value;
  var source = form.dataset.source || 'Homepage';

  trackEvent('apply_form_submit', { industry: industry, source: source });

  // Interim delivery method until a form backend (Formspree, webhook, etc.) is wired up.
  // Opens the visitor's email client with the application prefilled to Kaden.
  var subject = encodeURIComponent('New Automate Utah Application: ' + name);
  var body = encodeURIComponent(
    'Name: ' + name + '\n' +
    'Industry: ' + industry + '\n' +
    'Submitted from: ' + source + '\n' +
    'Page URL: ' + window.location.href
  );
  var mailtoLink = 'mailto:kaden@automateutah.com?subject=' + subject + '&body=' + body;

  form.innerHTML = '<p style="text-align:center; font-weight:700; padding: 24px 0;">Thanks' + (name ? ', ' + name : '') + '. Your email app should open to send your application to Kaden. If it doesn\'t open, email kaden@automateutah.com directly.</p>';

  window.location.href = mailtoLink;
}

function handleContactSubmit(event) {
  event.preventDefault();
  var form = event.target;
  var name = form.name.value;
  var email = form.email.value;
  var message = form.message.value;

  trackEvent('contact_form_submit', {});

  var subject = encodeURIComponent('New Automate Utah Contact Form Message');
  var body = encodeURIComponent(
    'Name: ' + name + '\n' +
    'Email: ' + email + '\n' +
    'Message: ' + message
  );
  var mailtoLink = 'mailto:kaden@automateutah.com?subject=' + subject + '&body=' + body;

  form.innerHTML = '<p style="text-align:center; font-weight:700; padding: 24px 0;">Thanks' + (name ? ', ' + name : '') + '. Your email app should open to send your message to Kaden. If it doesn\'t open, email kaden@automateutah.com directly.</p>';

  window.location.href = mailtoLink;
}

// Mobile nav toggle
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var panel = document.querySelector('.nav-mobile-panel');
  if (!toggle || !panel) return;

  toggle.addEventListener('click', function () {
    var isOpen = panel.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  panel.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      panel.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();

// Industries dropdown tap-to-toggle (for touch devices without hover)
(function () {
  var dropdown = document.querySelector('.nav-dropdown');
  if (!dropdown) return;

  var toggle = dropdown.querySelector('.nav-dropdown-toggle');
  toggle.addEventListener('click', function (event) {
    event.stopPropagation();
    dropdown.classList.toggle('is-open');
  });

  document.addEventListener('click', function () {
    dropdown.classList.remove('is-open');
  });
})();

// Scroll-in fade/rise animation
(function () {
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  var items = document.querySelectorAll('.fade-rise');
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  items.forEach(function (item) { observer.observe(item); });
})();
