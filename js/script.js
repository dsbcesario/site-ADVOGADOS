/* ============================================================
   Silva & Associados Advocacia - script.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Ano atual no rodapé
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Sombra no cabeçalho ao rolar
  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }, { passive: true });

  // 3. Menu hambúrguer (mobile)
  const menuToggle = document.getElementById('menuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Fecha o menu ao clicar em um link
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 4. Animação de entrada ao rolar
  const animatedElements = document.querySelectorAll('.fade-up');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });
    animatedElements.forEach(el => observer.observe(el));
  } else {
    animatedElements.forEach(el => el.classList.add('is-visible'));
  }

  // 5. Validação e envio simulado do formulário
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');
  const submitBtn = document.getElementById('submitBtn');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nome = form.querySelector('#nome').value.trim();
      const email = form.querySelector('#email').value.trim();
      const telefone = form.querySelector('#telefone').value.trim();
      const assunto = form.querySelector('#assunto').value;
      const mensagem = form.querySelector('#mensagem').value.trim();

      // Validação básica
      if (!nome || !email || !telefone || !assunto || !mensagem) {
        feedback.className = 'form-feedback error';
        feedback.textContent = 'Por favor, preencha todos os campos obrigatórios antes de prosseguir.';
        feedback.style.display = 'block';
        return;
      }

      // Verificação simples de formato de e-mail
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        feedback.className = 'form-feedback error';
        feedback.textContent = 'Por favor, informe um endereço de e-mail válido.';
        feedback.style.display = 'block';
        return;
      }

      // Simula o envio
      submitBtn.disabled = true;
      const originalBtnHtml = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span>Enviando mensagem...</span>';

      setTimeout(() => {
        feedback.className = 'form-feedback success';
        feedback.innerHTML = `<strong>Mensagem enviada com sucesso!</strong><br>Agradecemos o contato, ${nome}. Nossa equipe jurídica retornará em breve no telefone ${telefone} ou e-mail ${email}.`;
        feedback.style.display = 'block';
        form.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;
        feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 900);
    });
  }
});