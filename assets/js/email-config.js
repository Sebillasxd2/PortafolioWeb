// Configuración de EmailJS con TUS credenciales
const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_g90rbwj',
  TEMPLATE_ID: 'template_6d5f9wn', 
  USER_ID: 'Pi44iaFbSamzV_y3H'
};

// Inicializar EmailJS
emailjs.init(EMAILJS_CONFIG.USER_ID);

// Función para mostrar estados del formulario
function showFormStatus(status, message = '') {
  const loading = document.querySelector('.loading');
  const errorMessage = document.querySelector('.error-message');
  const sentMessage = document.querySelector('.sent-message');
  
  // Ocultar todos primero
  loading.style.display = 'none';
  errorMessage.style.display = 'none';
  sentMessage.style.display = 'none';
  
  // Mostrar el correspondiente
  switch(status) {
    case 'loading':
      loading.style.display = 'block';
      break;
    case 'success':
      sentMessage.style.display = 'block';
      break;
    case 'error':
      errorMessage.style.display = 'block';
      errorMessage.textContent = message || 'Error al enviar el mensaje. Por favor, intenta nuevamente.';
      break;
  }
}

// Función para manejar el envío del formulario
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      // Mostrar estado de carga
      showFormStatus('loading');
      
      // Enviar email usando EmailJS
      emailjs.sendForm(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, this)
        .then(function(response) {
          console.log('Email enviado exitosamente!', response.status, response.text);
          showFormStatus('success');
          contactForm.reset();
          
          // Ocultar mensaje de éxito después de 5 segundos
          setTimeout(() => {
            document.querySelector('.sent-message').style.display = 'none';
          }, 5000);
        }, function(error) {
          console.error('Error enviando email:', error);
          showFormStatus('error', 'Error al enviar el mensaje: ' + error.text);
        });
    });
  }
}

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
        window.location.hash = 'contact';
        scrollToContact();
      } else {
        window.location.href = 'index.html#contact';
      }
    }
  });
  
  // Función para hacer scroll suave a la sección de contacto
  function scrollToContact() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
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
        
        // Hacer focus en el textarea
        setTimeout(() => {
          messageField.focus();
          messageField.setSelectionRange(baseMessage.length, baseMessage.length);
        }, 100);
      }
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

// Inicializar todo cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  initServiceQuotation();
  initContactForm();
});