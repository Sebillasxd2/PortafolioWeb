/**
* Template Name: Craftivo
* Template URL: https://bootstrapmade.com/craftivo-bootstrap-portfolio-template/
* Updated: Oct 04 2025 with Bootstrap v5.3.8
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

  /**
 * AJAX Loader for Services
 */
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.ajax-link');
  const servicesContainer = document.getElementById('services-container');
  const detailContainer = document.getElementById('service-detail');
  const servicesSection = document.getElementById('services'); // Nueva referencia

  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const url = link.getAttribute('href');

      // Mostrar mensaje de carga
      detailContainer.innerHTML = "<p>Cargando contenido...</p>";
      detailContainer.style.display = "block";
      servicesContainer.style.display = "none";

      // Cargar contenido con AJAX
      fetch(url)
        .then(response => response.text())
        .then(data => {
          detailContainer.innerHTML = data;

          // Botón para volver
          const backButton = document.createElement('button');
          backButton.classList.add('btn', 'btn-secondary', 'mt-4');
          backButton.textContent = '← Volver a Servicios';
          backButton.addEventListener('click', () => {
            detailContainer.style.display = 'none';
            servicesContainer.style.display = 'block';
            detailContainer.innerHTML = '';
            // Scroll suave al volver
            servicesSection.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'start' 
            });
          });
          detailContainer.prepend(backButton);

          // 🔥 NUEVO: Scroll al contenido cargado
          setTimeout(() => {
            detailContainer.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'start' 
            });
          }, 100); // Pequeño delay para asegurar que el contenido se renderizó

          // Reactivar animaciones si se usan AOS o similares
          if (typeof AOS !== 'undefined') {
            AOS.refresh();
          }
        })
        .catch(() => {
          detailContainer.innerHTML = "<p>Error al cargar el contenido.</p>";
        });
    });
  });
});
// Smooth scroll para los enlaces de GitHub en el portfolio
document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar todos los enlaces de GitHub en el portfolio
    const githubLinks = document.querySelectorAll('.portfolio-details.github-link');
    
    githubLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Obtener la sección GitHub
            const githubSection = document.getElementById('github');
            
            if (githubSection) {
                // Calcular la posición con offset para el header fijo
                const headerHeight = document.querySelector('.header')?.offsetHeight || 90;
                const targetPosition = githubSection.offsetTop - headerHeight;
                
                // Scroll suave
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Opcional: agregar clase activa para feedback visual
                this.classList.add('active');
                setTimeout(() => {
                    this.classList.remove('active');
                }, 1000);
            }
        });
    });
    
    // También puedes agregar funcionalidad para actualizar la URL
    githubLinks.forEach(link => {
        link.addEventListener('click', function() {
            history.pushState(null, null, '#github');
        });
    });
});
// Función para manejar la cotización de servicios
function initServiceQuotation() {
  // Manejar clics en botones de cotización
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('cotizar-btn')) {
      e.preventDefault();
      
      const serviceName = e.target.getAttribute('data-service');
      const servicePrice = e.target.getAttribute('data-price');
      
      // Guardar en sessionStorage para usar en la página de contacto
      sessionStorage.setItem('selectedService', serviceName);
      sessionStorage.setItem('servicePrice', servicePrice);
      
      // Redirigir a la sección de contacto
      if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        // Si estamos en la página principal, scroll a contacto
        window.location.hash = 'contact';
        scrollToContact();
      } else {
        // Si estamos en una página de servicio, redirigir al index
        window.location.href = 'index.html#contact';
      }
    }
  });
  
  // Función para hacer scroll suave a la sección de contacto
  function scrollToContact() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      // Esperar un poco para que termine el scroll y luego rellenar el formulario
      setTimeout(autoFillContactForm, 800);
    }
  }
  
  // Función para auto-rellenar el formulario de contacto
  function autoFillContactForm() {
    const selectedService = sessionStorage.getItem('selectedService');
    const servicePrice = sessionStorage.getItem('servicePrice');
    
    if (selectedService) {
      // Mostrar información de cotización en el panel lateral
      const quotationInfo = document.getElementById('quotation-info');
      const quotationDetails = document.getElementById('quotation-details');
      
      if (quotationInfo && quotationDetails) {
        quotationDetails.textContent = `${selectedService} - ${servicePrice}`;
        quotationInfo.style.display = 'flex';
      }
      
      // Rellenar el campo de asunto
      const subjectField = document.getElementById('subject');
      if (subjectField) {
        subjectField.value = `Cotización de ${selectedService}`;
      }
      
      // Agregar información del servicio en el mensaje
      const messageField = document.getElementById('message');
      if (messageField) {
        const baseMessage = `Hola Sebastian,\n\nMe interesa obtener una cotización para el servicio de ${selectedService}.\nPrecio referencial: ${servicePrice}\n\n`;
        messageField.value = baseMessage;
        
        // Hacer focus en el textarea para que el usuario complete el mensaje
        setTimeout(() => {
          messageField.focus();
          messageField.setSelectionRange(baseMessage.length, baseMessage.length);
        }, 100);
      }
      
      // Limpiar sessionStorage después de 30 segundos (por si el usuario no completa el formulario)
      setTimeout(() => {
        sessionStorage.removeItem('selectedService');
        sessionStorage.removeItem('servicePrice');
      }, 30000);
    }
  }
  
  // Ejecutar cuando la página cargue y haya hash #contact
  if (window.location.hash === '#contact') {
    setTimeout(autoFillContactForm, 500);
  }
  
  // También ejecutar cuando cambie el hash
  window.addEventListener('hashchange', function() {
    if (window.location.hash === '#contact') {
      setTimeout(autoFillContactForm, 500);
    }
  });
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initServiceQuotation);