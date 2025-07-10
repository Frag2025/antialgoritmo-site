// Smooth scrolling para links internos
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling para links de navegação
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animação de entrada para elementos quando entram na viewport
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Aplicar animação aos cards de programa
    const programCards = document.querySelectorAll('.program-card');
    programCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Aplicar animação aos cards de audiência
    const audienceCards = document.querySelectorAll('.audience-card');
    audienceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Aplicar animação aos benefícios
    const benefits = document.querySelectorAll('.benefit');
    benefits.forEach((benefit, index) => {
        benefit.style.opacity = '0';
        benefit.style.transform = 'translateY(30px)';
        benefit.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(benefit);
    });
    
    // Destacar link ativo na navegação
    const sections = document.querySelectorAll('section[id]');
    const navMenuLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    function highlightActiveSection() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navMenuLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightActiveSection);
    
    // Adicionar classe para link ativo
    const style = document.createElement('style');
    style.textContent = `
        .nav-menu a.active {
            color: #e53e3e !important;
            font-weight: 600;
        }
    `;
    document.head.appendChild(style);
    
    // Menu mobile responsivo
    function createMobileMenu() {
        const nav = document.querySelector('.nav');
        const navMenu = document.querySelector('.nav-menu');
        
        if (window.innerWidth <= 768) {
            if (!document.querySelector('.mobile-menu-toggle')) {
                const mobileToggle = document.createElement('button');
                mobileToggle.className = 'mobile-menu-toggle';
                mobileToggle.innerHTML = '☰';
                mobileToggle.style.cssText = `
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                    color: #333;
                `;
                
                nav.appendChild(mobileToggle);
                
                mobileToggle.addEventListener('click', function() {
                    navMenu.classList.toggle('mobile-active');
                });
                
                // Adicionar estilos para menu mobile
                const mobileStyle = document.createElement('style');
                mobileStyle.textContent = `
                    @media (max-width: 768px) {
                        .nav-menu {
                            display: none;
                            position: absolute;
                            top: 100%;
                            left: 0;
                            right: 0;
                            background: white;
                            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                            flex-direction: column;
                            padding: 1rem;
                        }
                        
                        .nav-menu.mobile-active {
                            display: flex;
                        }
                        
                        .nav {
                            position: relative;
                        }
                    }
                `;
                document.head.appendChild(mobileStyle);
            }
        }
    }
    
    createMobileMenu();
    window.addEventListener('resize', createMobileMenu);
    
    // Adicionar efeito de parallax sutil ao hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
});

