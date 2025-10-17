// HEADER AND FOOTER

const sharedHTML = {
  header: `<header>
    <h1 style="text-transform: capitalize">Benjamin Tribe</h1>
    <button style="float:right"
        type="button"
        data-theme-toggle
        aria-label="Toggle theme"
      ><i class="fa-solid fa-circle-half-stroke fa-2x"></i></button>
  </header>`,
  footer: `  <footer>
    <section id="contact">
      <p class="fade-up social-icons" style="text-align: center;">
        <a href="mailto:bmt26@sussex.ac.uk" class="envelope" title="email"><i class="fa-solid fa-envelope fa-2x"></i></a>
        <a href="https://www.linkedin.com/in/benjamin-tribe/" class="linkedin" title="linkedin" target="_blank"><i class="fab fa-linkedin fa-2x"></i></a> 

        <a href="https://scholar.google.com/citations?user=o0U1Be0AAAAJ&hl" class="google-scholar" title="google scholar" target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="30px">
                <path class="gs-dark" d="M256 411.12L0 202.667 256 0z"/>
                <path class="gs-darkest" d="M256 411.12l256-208.453L256 0z"/>
                <circle class="gs-lightest" cx="256" cy="362.667" r="149.333"/>
                <path class="gs-light" d="M121.037 298.667c23.968-50.453 75.392-85.334 134.963-85.334s110.995 34.881 134.963 85.334H121.037z"/>
            </svg></a>
        
        <a href="https://orcid.org/0000-0002-9652-599X" class="orcid" title="orcid" target="_blank"><i class="fa-brands fa-orcid fa-2x"></i></a>
        <a href="https://www.researchgate.net/profile/Benjamin_Tribe" class="researchgate" title="research gate" target="_blank"><i class="fab fa-researchgate fa-2x"></i></a>
        <a href="https://osf.io/gnzek/" class="osf" title="open science framework" target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg" width="30px" version="1.1" viewBox="0 0 123.98 124.46" xml:space="preserve">
                <g transform="translate(-42.784 -65.828)" class="osf-blue"><circle cx="128.21" cy="104.59" r="11.133"/><circle cx="128.23" cy="151.57" r="11.133"/><circle cx="81.323" cy="151.51" r="11.133"/><circle cx="81.373" cy="104.6" r="11.133"/></g>
                <g transform="translate(-42.784 -65.828)" class="osf-dark"><circle cx="151.29" cy="128.06" r="15.48"/><circle cx="58.265" cy="128.06" r="15.48"/><circle cx="104.78" cy="174.8" r="15.48"/><circle cx="104.78" cy="81.308" r="15.48"/></g>
                <g transform="translate(-42.784 -65.828)" class="osf-blue"><circle cx="71.614" cy="128.12" r="11.133"/><circle cx="137.63" cy="128.12" r="11.133"/><circle cx="104.77" cy="161.29" r="11.133"/><circle cx="105.25" cy="94.873" r="11.133"/></g>
                <g transform="translate(-42.784 -65.828)" class="osf-dark"><circle cx="71.911" cy="95.085" r="15.48"/><circle cx="137.65" cy="95.085" r="15.48"/><circle cx="137.87" cy="160.99" r="15.48"/><circle cx="71.921" cy="160.98" r="15.48"/></g>
            </svg></a>          
        <a href="https://github.com/BenjaminTribe" class="github" title="github" target="_blank"><i class="fab fa-github fa-2x"></i></a>
        <a href="https://bsky.app/profile/benjamintribe.bsky.social" class="bluesky" title="bluesky"><i class="fab fa-bluesky fa-2x"></i></a>
      </p>
    </section>
    <p>&copy; 2025 Benjamin Tribe</p>
  </footer>`
};

// Inject into page
document.body.insertAdjacentHTML('afterbegin', sharedHTML.header);
document.body.insertAdjacentHTML('beforeend', sharedHTML.footer);


// NAV BAR TO IN-PAGE ANCHORS
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });  


// CV ENTRIES
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1
  });

  
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

document.querySelectorAll('.cv-header').forEach(header => {
  header.addEventListener('click', () => {
    header.parentElement.classList.toggle('active');
  });
});


// THEME BUTTON - adapted from https://dev.to/whitep4nth3r/the-best-lightdark-mode-theme-toggle-in-javascript-368f
function calculateSettingAsThemeString({ localStorageTheme, systemSettingDark }) {
  if (localStorageTheme !== null) {
    return localStorageTheme;
  }
  if (systemSettingDark.matches) {
    return "dark";
  }
  return "light";
}

function updateButton({ buttonEl, isDark }) {
  // Update aria-label when changed theme
  const newCta = isDark ? "Change to light theme" : "Change to dark theme";
  buttonEl.setAttribute("aria-label", newCta);
}

function updateThemeOnHtmlEl({ theme }) {
  document.querySelector("html").setAttribute("data-theme", theme);
}


const button = document.querySelector("[data-theme-toggle]");
const localStorageTheme = localStorage.getItem("theme");
const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");

let currentThemeSetting = calculateSettingAsThemeString({ localStorageTheme, systemSettingDark });

updateButton({ buttonEl: button, isDark: currentThemeSetting === "dark" });
updateThemeOnHtmlEl({ theme: currentThemeSetting });

button.addEventListener("click", () => {
  const newTheme = currentThemeSetting === "dark" ? "light" : "dark";
  localStorage.setItem("theme", newTheme);

  updateButton({ buttonEl: button, isDark: newTheme === "dark" });
  updateThemeOnHtmlEl({ theme: newTheme });

  currentThemeSetting = newTheme;
});


// CONTACT HIGHLIGHT
const contactLink = document.querySelector('a[href="#contact"]');

if (contactLink) {
  contactLink.addEventListener('click', () => {
    setTimeout(triggerRippleEffect, 400);
  });
}

function triggerRippleEffect() {
  const icons = document.querySelectorAll('.social-icons a');

  icons.forEach((icon, index) => {
    setTimeout(() => {
      icon.classList.add('ripple');
      setTimeout(() => {
        icon.classList.remove('ripple');
      }, 800);
    }, index * 100);
  });
}


