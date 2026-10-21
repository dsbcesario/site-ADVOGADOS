/* ============================================================
   Moretti & Advogados Associados - script.js
   Menu mobile, animações ao rolar, máscaras de nome e telefone,
   contador de caracteres e envio do formulário.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Ano atual no rodapé ---------- */
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ---------- Header com sombra ao rolar ---------- */
  const header = document.getElementById('siteHeader');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 10);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Menu mobile ---------- */
  const menuToggle = document.getElementById('menuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const menuIcon = document.getElementById('menuIcon');

  const ICON_MENU = '<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>';
  const ICON_CLOSE = '<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>';

  const closeMenu = () => {
    if (!mobileDrawer || !menuToggle) return;
    mobileDrawer.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    if (menuIcon) menuIcon.innerHTML = ICON_MENU;
  };

  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      if (menuIcon) menuIcon.innerHTML = isOpen ? ICON_CLOSE : ICON_MENU;
    });

    document.querySelectorAll('.mobile-link').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    // Fecha o menu ao pressionar Esc
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });

    // Fecha o menu ao voltar para o layout desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) closeMenu();
    });
  }

  /* ---------- Animação de entrada (fade-up) ---------- */
  const fadeEls = document.querySelectorAll('.fade-up');
  if (fadeEls.length) {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

      fadeEls.forEach((el) => observer.observe(el));
    } else {
      fadeEls.forEach((el) => el.classList.add('is-visible'));
    }
  }

  /* ---------- Formulário de contato ---------- */
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');
  const submitBtn = document.getElementById('submitBtn');

  if (form && feedback && submitBtn) {
    const originalBtnHTML = submitBtn.innerHTML;
    let enviando = false;

    // Limites do campo de mensagem
    const LIMITE_MENSAGEM = 1500;
    const MIN_MENSAGEM = 20;

    const showFeedback = (type, message) => {
      feedback.className = 'form-feedback ' + type;
      feedback.textContent = message;
    };

    const clearFeedback = () => {
      feedback.className = 'form-feedback';
      feedback.textContent = '';
    };

    /* ---------- Máscara do nome: letras, espaços, hífen e apóstrofo ---------- */
    const nomeInput = form.querySelector('#nome');
    const CARACTERES_INVALIDOS_NOME = /[^\p{L}\p{M}\s'’-]/gu;

    if (nomeInput) {
      nomeInput.addEventListener('input', () => {
        const original = nomeInput.value;
        const limpo = original.replace(CARACTERES_INVALIDOS_NOME, '');
        if (limpo === original) return;

        // Mantém o cursor na posição correta após remover os caracteres inválidos
        const pos = nomeInput.selectionStart;
        const removidosAntes = (original.slice(0, pos).match(CARACTERES_INVALIDOS_NOME) || []).length;
        const novaPos = Math.max(0, pos - removidosAntes);

        nomeInput.value = limpo;
        nomeInput.setSelectionRange(novaPos, novaPos);
      });
    }

    /* ---------- Máscara automática de telefone ---------- */
    const telefoneInput = form.querySelector('#telefone');

    const formatarTelefone = (valor) => {
      const digitos = valor.replace(/\D/g, '').slice(0, 11);

      if (digitos.length === 0) return '';
      if (digitos.length <= 2) return '(' + digitos;
      if (digitos.length <= 6) {
        return '(' + digitos.slice(0, 2) + ') ' + digitos.slice(2);
      }
      // Fixo: (17) 3212-9690
      if (digitos.length <= 10) {
        return '(' + digitos.slice(0, 2) + ') ' + digitos.slice(2, 6) + '-' + digitos.slice(6);
      }
      // Celular: (17) 99999-9999
      return '(' + digitos.slice(0, 2) + ') ' + digitos.slice(2, 7) + '-' + digitos.slice(7);
    };

    if (telefoneInput) {
      telefoneInput.addEventListener('input', () => {
        telefoneInput.value = formatarTelefone(telefoneInput.value);
      });
    }

    /* ---------- Contador de caracteres da mensagem ---------- */
    const mensagemInput = form.querySelector('#mensagem');
    const charCounter = document.getElementById('charCounter');

    const atualizarContador = () => {
      if (!mensagemInput || !charCounter) return;
      const total = mensagemInput.value.length;

      if (total > 0 && total < MIN_MENSAGEM) {
        charCounter.textContent = total + ' / ' + LIMITE_MENSAGEM + ' · mínimo ' + MIN_MENSAGEM;
      } else {
        charCounter.textContent = total + ' / ' + LIMITE_MENSAGEM;
      }

      charCounter.classList.toggle('is-below-min', total > 0 && total < MIN_MENSAGEM);
      charCounter.classList.toggle('is-warning', total >= LIMITE_MENSAGEM * 0.9 && total < LIMITE_MENSAGEM);
      charCounter.classList.toggle('is-limit', total >= LIMITE_MENSAGEM);
    };

    if (mensagemInput) {
      mensagemInput.addEventListener('input', atualizarContador);
      atualizarContador();
    }

    // Limpa a mensagem de erro assim que o usuário corrige um campo
    form.addEventListener('input', () => {
      if (feedback.classList.contains('error')) clearFeedback();
    });

    // Telefone brasileiro: 10 ou 11 dígitos, com ou sem formatação
    const telefoneValido = (valor) => {
      const digitos = valor.replace(/\D/g, '');
      return digitos.length === 10 || digitos.length === 11;
    };

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (enviando) return;
      clearFeedback();

      // Honeypot: se preenchido, é robô. Ignora silenciosamente.
      const honeypot = form.querySelector('[name="_honey"]');
      if (honeypot && honeypot.value) {
        form.reset();
        atualizarContador();
        return;
      }

      const nome = form.querySelector('#nome').value.trim();
      const email = form.querySelector('#email').value.trim();
      const telefone = form.querySelector('#telefone').value.trim();
      const assunto = form.querySelector('#assunto').value;
      const mensagem = form.querySelector('#mensagem').value.trim();

      if (!nome || !email || !telefone || !assunto || !mensagem) {
        showFeedback('error', 'Por favor, preencha todos os campos obrigatórios.');
        return;
      }

      const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
      if (!emailValido) {
        showFeedback('error', 'Informe um endereço de e-mail válido.');
        return;
      }

      if (!telefoneValido(telefone)) {
        showFeedback('error', 'Informe um telefone válido com DDD, por exemplo (17) 99999-9999.');
        return;
      }

      if (mensagem.length < MIN_MENSAGEM) {
        showFeedback('error', 'Descreva sua situação com pelo menos ' + MIN_MENSAGEM + ' caracteres.');
        return;
      }

      if (mensagem.length > LIMITE_MENSAGEM) {
        showFeedback('error', 'A mensagem ultrapassou o limite de ' + LIMITE_MENSAGEM + ' caracteres.');
        return;
      }

      enviando = true;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Enviando...</span>';

      // Cancela a requisição se passar de 15 segundos
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: new FormData(form),
          signal: controller.signal
        });

        if (response.ok) {
          showFeedback('success', 'Mensagem enviada com sucesso! Retornaremos em breve.');
          form.reset();
          atualizarContador();
        } else {
          showFeedback('error', 'Não foi possível enviar agora. Tente novamente ou fale pelo WhatsApp.');
        }
      } catch (error) {
        if (error.name === 'AbortError') {
          showFeedback('error', 'O envio demorou mais que o esperado. Tente novamente ou fale pelo WhatsApp.');
        } else {
          showFeedback('error', 'Falha de conexão. Verifique sua internet ou fale pelo WhatsApp.');
        }
      } finally {
        clearTimeout(timeoutId);
        enviando = false;
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHTML;
      }
    });
  }

});