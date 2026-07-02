/* ===== THEME TOGGLE (with localStorage) ===== */
(function initTheme(){
  const saved = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
})();

function setThemeIcon(){
  const btn = document.getElementById('themeBtn');
  if(!btn) return;
  const theme = document.documentElement.getAttribute('data-theme');
  btn.textContent = theme === 'light' ? '🌙' : '☀️';
}

document.addEventListener('DOMContentLoaded', () => {
  setThemeIcon();

  // Theme toggle
  const themeBtn = document.getElementById('themeBtn');
  if(themeBtn){
    themeBtn.addEventListener('click', () => {
      const cur = document.documentElement.getAttribute('data-theme');
      const next = cur === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      setThemeIcon();
    });
  }

  // Sticky navbar
  const header = document.getElementById('header');
  if(header){
    window.addEventListener('scroll', () =>
      header.classList.toggle('scrolled', window.scrollY > 50));
  }

  // Mobile menu
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if(hamburger && navLinks){
    hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
    document.querySelectorAll('.nav-links a').forEach(l =>
      l.addEventListener('click', () => navLinks.classList.remove('open')));
  }

  // Typing effect (Home only)
  const typeEl = document.getElementById('typing');
  if(typeEl){
    const roles = ["Web Designer","Vibe Coder","SEO Specialist","Social Media Manager","Virtual Assistant"];
    let ri=0, ci=0, deleting=false;
    (function type(){
      const cur = roles[ri];
      typeEl.textContent = cur.substring(0, ci);
      if(!deleting && ci < cur.length){ ci++; }
      else if(deleting && ci > 0){ ci--; }
      else { deleting = !deleting; if(!deleting) ri=(ri+1)%roles.length; }
      setTimeout(type, deleting?60:110);
    })();
  }

  // Scroll reveal
  const obs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('show'); });
  },{threshold:.15});
  document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

  // Auto year
  const y = document.getElementById('year');
  if(y) y.textContent = new Date().getFullYear();
  //
  const roles = ["Web Designer","Vibe Coder","SEO Specialist","Social Media Manager","Virtual Assistant","AI Automation Specialist"];
  
  // Image fade-in
  document.querySelectorAll('img').forEach(img=>{
    img.style.transition='opacity .6s';
    if(img.complete){ img.style.opacity=1; }
    else { img.style.opacity=0; img.onload=()=>img.style.opacity=1; }
  });

  // Contact form (demo handler)
  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', e=>{
      e.preventDefault();
      const name = form.name.value.trim();
      const msg = form.message.value.trim();
      const wa = `https://wa.me/6285669570492?text=${encodeURIComponent('Halo M Saman, saya '+name+'. '+msg)}`;
      window.open(wa,'_blank');
    });
  }
});
