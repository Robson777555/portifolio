// UPGRADE: Otimização de função modal para imagem de automação n8nmob.png com altura calculada dinamicamente

/*==================== MENU MOBILE - LÓGICA HAMBURGUERIA =====================*/
// Simular slideToggle do jQuery
function slideToggle(element) {
    if (!element) return;
    
    if (element.classList.contains('show-menu')) {
        // Fechar - slideUp
        element.style.maxHeight = element.scrollHeight + 'px';
        // Forçar reflow
        element.offsetHeight;
        element.style.maxHeight = '0';
        element.style.opacity = '0';
        setTimeout(function() {
            element.classList.remove('show-menu');
        }, 300);
    } else {
        // Abrir - slideDown
        element.classList.add('show-menu');
        element.style.maxHeight = '0';
        element.style.opacity = '0';
        // Forçar reflow
        element.offsetHeight;
        element.style.maxHeight = element.scrollHeight + 'px';
        element.style.opacity = '1';
    }
}

// Menu mobile - toggle (mesma lógica do hamburgueria)
document.addEventListener('DOMContentLoaded', function() {
    const navMobile = document.querySelector('.nav__mobile h3');
    const navMobileMenu = document.getElementById('nav-mobile-menu');
    
    if (navMobile && navMobileMenu) {
        navMobile.addEventListener('click', function() {
            slideToggle(navMobileMenu);
        });
    }
    
    // Fecha o menu ao clicar em um link (para dispositivos móveis)
    const mobileLinks = document.querySelectorAll('.nav__mobile-menu .nav__link');
    mobileLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 900) {
                if (navMobileMenu && navMobileMenu.classList.contains('show-menu')) {
                    navMobileMenu.style.maxHeight = navMobileMenu.scrollHeight + 'px';
                    navMobileMenu.offsetHeight; // Forçar reflow
                    navMobileMenu.classList.remove('show-menu');
                    navMobileMenu.style.maxHeight = '0';
                }
            }
        });
    });
});

/*==================== ACCORDION SKILLS ====================*/
const skillsContent = document.getElementsByClassName('skills__content'),
      skillsHeader = document.querySelectorAll('.skills__header')

function toggleSkills(){
    let itemClass = this.parentNode.className

    for(i = 0; i < skillsContent.length; i++){
        skillsContent[i].className = 'skills__content skills__close'
    }
    if(itemClass === 'skills__content skills__close'){
        this.parentNode.className = 'skills__content skills__open'
    }
}

skillsHeader.forEach((el) =>{
    el.addEventListener('click', toggleSkills)
})

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*==================== CHANGE BACKGROUND HEADER ====================*/ 
function scrollHeader(){
    const nav = document.getElementById('header')
    // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*==================== SHOW SCROLL UP ====================*/ 
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*==================== SMOOTH SCROLLING ====================*/
const links = document.querySelectorAll('a[href^="#"]');

links.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        // Handle scroll-to-top links
        if (targetId === '#' || targetId === '#top') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/*==================== ENHANCED PROJECTS INTERACTION ====================*/
const projectCards = document.querySelectorAll('.projects__content');

projectCards.forEach(card => {
    // Add click event to open project in new tab
    const projectLink = card.querySelector('.projects__buttons .button');
    if (projectLink) {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on the button itself
            if (!e.target.closest('.button')) {
                const link = this.querySelector('.projects__buttons .button');
                if (link && link.href) {
                    window.open(link.href, '_blank');
                }
            }
        });
    }
    
    // Enhanced hover effects
    card.addEventListener('mouseenter', function() {
        this.style.cursor = 'pointer';
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});



/*==================== TYPING ANIMATION ====================*/
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', function() {
    const titleElement = document.querySelector('.home__title-color');
    if (titleElement) {
        const originalText = titleElement.textContent;
        typeWriter(titleElement, originalText, 150);
    }
});

/*==================== SCROLL REVEAL ANIMATION ====================*/
function revealOnScroll() {
    const reveals = document.querySelectorAll('.about__container, .skills__container, .projects__content');
    
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('reveal');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Add CSS for reveal animation
const style = document.createElement('style');
style.textContent = `
    .about__container, .skills__container, .projects__content {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.6s ease;
    }
    
    .reveal {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);



/*==================== LOADING ANIMATION ====================*/
window.addEventListener('load', function() {
    // Add a simple loading effect
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

/*==================== PERFORMANCE OPTIMIZATION ====================*/
// Debounce function for scroll events
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply debounce to scroll functions
window.addEventListener('scroll', debounce(scrollActive));
window.addEventListener('scroll', debounce(scrollHeader));
window.addEventListener('scroll', debounce(scrollUp));
window.addEventListener('scroll', debounce(revealOnScroll));

/*==================== CONTACT FORM ====================*/
// Aguardar o DOM estar pronto
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    // Event listener para submit do formulário
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const form = e.target;
        const statusMessage = document.getElementById('statusMessage');
        
        // Validar formulário antes de enviar
        if (!validateForm(form)) {
            return; // Impede o envio se houver erros
        }
        
        const nome = form.nome.value;
        const email = form.email.value;
        const telefone = form.telefone.value;
        const mensagem = form.mensagem.value;
        
        statusMessage.textContent = "Enviando...";
        statusMessage.className = "contact__status-message info";
        
        // Simular delay de envio para melhor UX
        setTimeout(() => {
            // Abrir WhatsApp
            const whatsappNumber = "5551996940564"; // Formato: 55 + DDD + número
            const assunto = "Contato Site - Portfólio";
            const whatsappText = encodeURIComponent(
                `💼 *Nova Mensagem de Contato - Site de Portfólio*\n\n` +
                `👤 *Nome:* ${nome}\n` +
                `📧 *Email:* ${email}\n` +
                `📞 *Telefone:* ${telefone}\n` +
                `📝 *Assunto:* ${assunto}\n\n` +
                `💬 *Mensagem:*\n${mensagem || 'Nenhuma mensagem adicional.'}`
            );
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappText}`;
            
            // Tentar abrir o WhatsApp
            try {
                const newWindow = window.open(whatsappUrl, "_blank", "noopener,noreferrer");
                if (!newWindow || newWindow.closed || typeof newWindow.closed == 'undefined') {
                    // Se popup foi bloqueado, redirecionar na mesma aba
                    window.location.href = whatsappUrl;
                }
            } catch (error) {
                // Fallback: redirecionar na mesma aba
                window.location.href = whatsappUrl;
            }
            
            statusMessage.textContent = "✅ Redirecionando para WhatsApp! Complete o envio da mensagem lá.";
            statusMessage.className = "contact__status-message success";
            form.reset();
        }, 1000);
    });
    
    // Validação em tempo real
    const form = contactForm;
    
    // Validar email em tempo real
    const emailField = form.querySelector('input[type="email"]');
    if (emailField) {
        emailField.addEventListener('blur', function() {
            validateEmailField(this);
        });
        emailField.addEventListener('input', function() {
            clearFieldError(this);
        });
    }
    
    // Validar telefone em tempo real
    const phoneField = form.querySelector('input[type="tel"]');
    if (phoneField) {
        phoneField.addEventListener('blur', function() {
            validatePhoneField(this);
        });
        phoneField.addEventListener('input', function() {
            clearFieldError(this);
            // Aplicar máscara de formatação
            formatPhoneField(this);
        });
        phoneField.addEventListener('keypress', function(e) {
            // Permitir apenas números e alguns caracteres especiais
            if (!/[0-9()\-\s]/.test(e.key) && !['Backspace', 'Delete', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                e.preventDefault();
            }
        });
    }
    
    // Validar campos obrigatórios em tempo real
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(function(field) {
        field.addEventListener('blur', function() {
            validateRequiredField(this);
        });
        field.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
});

// Função para validar o formulário completo
function validateForm(form) {
    var isValid = true;
    var errorFields = [];
    
    // Limpar erros anteriores
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
    
    // Validar campos obrigatórios
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(function(field) {
        if (!validateRequiredField(field)) {
            errorFields.push(field.getAttribute('placeholder') || field.previousElementSibling?.textContent || 'Campo obrigatório');
            isValid = false;
        }
    });
    
    // Validar email
    var emailField = form.querySelector('input[type="email"]');
    if (emailField && !validateEmailField(emailField)) {
        errorFields.push('E-mail');
        isValid = false;
    }
    
    // Validar telefone
    var phoneField = form.querySelector('input[type="tel"]');
    if (phoneField && !validatePhoneField(phoneField)) {
        errorFields.push('Telefone');
        isValid = false;
    }
    
    // Mostrar resumo de erros se houver
    if (!isValid) {
        var errorMessage = 'Por favor, corrija os seguintes campos:\n\n';
        errorFields.forEach(function(field, index) {
            errorMessage += (index + 1) + '. ' + field + '\n';
        });
        alert(errorMessage);
        
        // Focar no primeiro campo com erro
        var firstError = document.querySelector('.contact__form-input.error');
        if (firstError) {
            firstError.focus();
        }
    }
    
    return isValid;
}

// Função para validar campo obrigatório
function validateRequiredField(field) {
    var value = field.value.trim();
    
    if (!value) {
        showFieldError(field, 'Este campo é obrigatório');
        return false;
    }
    return true;
}

// Função para validar email
function validateEmailField(field) {
    var emailValue = field.value.trim();
    
    if (!emailValue) {
        return true; // Campo vazio é válido se não for obrigatório
    }
    
    var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(emailValue)) {
        showFieldError(field, 'Por favor, insira um email válido');
        return false;
    }
    return true;
}

// Função para validar telefone
function validatePhoneField(field) {
    var phoneValue = field.value.replace(/\D/g, '');
    
    // Se o campo está vazio, não validar (será validado como obrigatório se necessário)
    if (!phoneValue) {
        return true;
    }
    
    var isValidPhone = false;
    
    // DDDs válidos do Brasil
    var validDDDs = ['11','12','13','14','15','16','17','18','19','21','22','24','27','28','31','32','33','34','35','37','38','41','42','43','44','45','46','47','48','49','51','53','54','55','61','62','63','64','65','66','67','68','69','71','73','74','75','77','79','81','82','83','84','85','86','87','88','89','91','92','93','94','95','96','97','98','99'];
    
    if (phoneValue.length === 11) {
        // Celular: 9 dígitos após DDD
        var ddd = phoneValue.substring(0, 2);
        var number = phoneValue.substring(2);
        if (validDDDs.includes(ddd) && number.length === 9 && number.startsWith('9')) {
            isValidPhone = true;
        }
    } else if (phoneValue.length === 10) {
        // Fixo: 8 dígitos após DDD
        var ddd = phoneValue.substring(0, 2);
        var number = phoneValue.substring(2);
        if (validDDDs.includes(ddd) && number.length === 8) {
            isValidPhone = true;
        }
    } else if (phoneValue.length === 13) {
        // Telefone com código do país (55 + DDD + número)
        var countryCode = phoneValue.substring(0, 2);
        var ddd = phoneValue.substring(2, 4);
        var number = phoneValue.substring(4);
        if (countryCode === '55' && validDDDs.includes(ddd)) {
            if (number.length === 9 && number.startsWith('9')) {
                // Celular
                isValidPhone = true;
            } else if (number.length === 8) {
                // Fixo
                isValidPhone = true;
            }
        }
    }
    
    if (!isValidPhone) {
        showFieldError(field, 'Por favor, insira um telefone válido (ex: (11) 99999-9999, (11) 3333-4444 ou +55 11 99999-9999)');
        return false;
    }
    
    // Se chegou até aqui, o telefone é válido
    return true;
}

// Função para formatar campo de telefone
function formatPhoneField(field) {
    var value = field.value.replace(/\D/g, '');
    var formattedValue = '';
    
    if (value.length > 0) {
        if (value.length <= 2) {
            formattedValue = '(' + value;
        } else if (value.length <= 6) {
            formattedValue = '(' + value.substring(0, 2) + ') ' + value.substring(2);
        } else if (value.length <= 10) {
            formattedValue = '(' + value.substring(0, 2) + ') ' + value.substring(2, 6) + '-' + value.substring(6);
        } else if (value.length <= 11) {
            formattedValue = '(' + value.substring(0, 2) + ') ' + value.substring(2, 7) + '-' + value.substring(7);
        } else {
            // Telefone com código do país
            if (value.startsWith('55') && value.length <= 13) {
                var ddd = value.substring(2, 4);
                var number = value.substring(4);
                if (number.length <= 8) {
                    formattedValue = '+55 (' + ddd + ') ' + number;
                } else if (number.length <= 9) {
                    formattedValue = '+55 (' + ddd + ') ' + number.substring(0, 5) + '-' + number.substring(5);
                }
            }
        }
    }
    
    field.value = formattedValue;
}

// Função para limpar erro do campo
function clearFieldError(field) {
    field.classList.remove('error');
    var formDiv = field.closest('.contact__form-div');
    if (formDiv) {
        var errorMessage = formDiv.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }
}

// Função para mostrar erro no campo
function showFieldError(field, message) {
    field.classList.add('error');
    var formDiv = field.closest('.contact__form-div');
    if (formDiv) {
        // Remover mensagem de erro anterior se existir
        var existingError = formDiv.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        var errorSpan = document.createElement('span');
        errorSpan.className = 'error-message';
        errorSpan.textContent = message;
        formDiv.appendChild(errorSpan);
    }
}

/*==================== IMAGE ENLARGE / MODAL ====================*/
document.addEventListener('DOMContentLoaded', function() {
    const enlargeBtn = document.querySelector('.image-enlarge-btn');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('imageModalImg');
    const modalClose = document.getElementById('imageModalClose');

    if (!enlargeBtn || !modal || !modalImg) return;

    function openImageModal() {
        const autoSection = document.getElementById('automacao');
        const img = autoSection ? autoSection.querySelector('img') : null;
        if (!img) return;

        modalImg.src = img.src;
        modal.classList.add('show');
        
        // Em mobile, aplicar dimensões para imagem grande
        if (window.innerWidth <= 600) {
            modalImg.onload = function() {
                const vwWidth = window.innerWidth;
                const aspectRatio = this.naturalHeight / this.naturalWidth;
                const newHeight = (vwWidth * aspectRatio) + 400;
                
                this.style.width = vwWidth + 'px';
                this.style.height = newHeight + 'px';
            };
            
            if (modalImg.complete) {
                modalImg.onload();
            }
        }
        
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
    }

    function closeImageModal() {
        modal.classList.remove('show');
        modalImg.style.height = '';
        modalImg.style.paddingBottom = '';
        modalImg.src = '';
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
    }

    enlargeBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        openImageModal();
    });

    modalClose && modalClose.addEventListener('click', function() {
        closeImageModal();
    });

    // fechar ao clicar fora da imagem
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeImageModal();
    });

    // fechar com Esc
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeImageModal();
        }
    });
});

// Funções globais como fallback (chamadas por onclick inline)
function openImageModalGlobal() {
    var autoSection = document.getElementById('automacao');
    if (!autoSection) return;
    var img = autoSection.querySelector('img');
    var modal = document.getElementById('imageModal');
    var modalImg = document.getElementById('imageModalImg');
    if (!img || !modal || !modalImg) return;
    
    modalImg.src = img.src;
    modal.classList.add('show');
    
    // Em mobile, calcular altura com buffer de 400px
    if (window.innerWidth <= 600) {
        modalImg.onload = function() {
            // Usar dimensões naturais da imagem para cálculo perfeito
            var naturalRatio = this.naturalHeight / this.naturalWidth;
            var viewportWidth = window.innerWidth;
            var calculatedHeight = (viewportWidth * naturalRatio) + 400;
            
            this.style.width = '100vw';
            this.style.height = calculatedHeight + 'px';
        };
        
        if (modalImg.complete) {
            modalImg.onload();
        }
    }
    
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
}

function closeImageModalGlobal() {
    var modal = document.getElementById('imageModal');
    var modalImg = document.getElementById('imageModalImg');
    if (!modal) return;
    modal.classList.remove('show');
    modalImg.style.width = '';
    modalImg.style.height = '';
    modalImg.src = '';
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
}

/*==================== CONTROLE DE BOTÃO DE PLAY CENTRALIZADO =====================*/
document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('nexusVideo');
    const playButton = document.getElementById('videoPlayButton');
    
    if (video && playButton) {
        // Esconde o botão quando o vídeo começa a reproduzir
        video.addEventListener('play', function() {
            playButton.classList.add('hidden');
        });
        
        // Mostra o botão quando o vídeo é pausado
        video.addEventListener('pause', function() {
            playButton.classList.remove('hidden');
        });
        
        // Clica no vídeo (play button) quando o botão centralizado é clicado
        playButton.addEventListener('click', function(e) {
            e.stopPropagation();
            video.play();
        });
        
        // Se o vídeo já está em reprodução, esconde o botão
        if (!video.paused) {
            playButton.classList.add('hidden');
        }
    }
});

/*==================== EXPANDIR VÍDEO EM TELA CHEIA =====================*/
function expandVideo() {
    const video = document.getElementById('nexusVideo');
    if (!video) return;
    
    // Tenta usar a API de fullscreen
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
        // Safari
        video.webkitRequestFullscreen();
    } else if (video.mozRequestFullScreen) {
        // Firefox
        video.mozRequestFullScreen();
    } else if (video.msRequestFullscreen) {
        // IE11
        video.msRequestFullscreen();
    }
}

