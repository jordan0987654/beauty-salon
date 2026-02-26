// Accordion functionality for service categories
document.querySelectorAll('.category-header').forEach(header => {
    header.addEventListener('click', function() {
        const category = this.closest('.service-category');
        const isActive = category.classList.contains('active');
        
        // Close all other categories
        document.querySelectorAll('.service-category').forEach(cat => {
            cat.classList.remove('active');
        });
        
        // Toggle current category
        if (!isActive) {
            category.classList.add('active');
        }
    });
});

// Smooth scrolling ТОЛЬКО для якорей (#) на этой же странице
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Проверяем что ссылка на этой же странице
        if (this.pathname === window.location.pathname) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
    }
});

// Animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.service-item, .team-member, .about-images img').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.5s ease';
    observer.observe(el);
});

console.log('Welcome to Beauty Studio');
