
// DOM Elements
const searchInput = document.getElementById('searchInput');
const categoryCards = document.querySelectorAll('.category-card');
const addListBtns = document.querySelectorAll('.add-list-btn');
const navItems = document.querySelectorAll('.nav-item');
const profileBtn = document.querySelector('.profile-btn');

// Search functionality
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

searchInput.addEventListener('input', (e) => {
    if (e.target.value.trim().length > 2) {
        // Búsqueda en tiempo real
        console.log(`Buscando: ${e.target.value.trim()}`);
    }
});

function handleSearch() {
    const query = searchInput.value.trim();
    if (query) {
        console.log(`Buscando: ${query}`);
        alert(`Buscando anime: "${query}"`);
    }
}

// Category selection
categoryCards.forEach(card => {
    card.addEventListener('click', () => {
        const genre = card.dataset.genre;
        console.log(`Categoría seleccionada: ${genre}`);
        card.style.transform = 'translateY(-5px) scale(1.05)';
        setTimeout(() => {
            card.style.transform = '';
        }, 200);
        // Here you would navigate to category page
        alert(`Explorando categoría: ${genre}`);
    });
});

// Add to list functionality
addListBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const anime = btn.closest('.top-item').querySelector('h4').textContent;
        
        // Toggle button state
        if (btn.innerHTML.includes('fa-plus')) {
            btn.innerHTML = '<i class="fas fa-check"></i>';
            btn.style.background = '#00b894';
            btn.style.borderColor = '#00b894';
            console.log(`Añadido a lista: ${anime}`);
        } else {
            btn.innerHTML = '<i class="fas fa-plus"></i>';
            btn.style.background = 'rgba(108, 92, 231, 0.2)';
            btn.style.borderColor = '#6c5ce7';
            console.log(`Removido de lista: ${anime}`);
        }
    });
});

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href && href !== '#') {
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Bottom navigation functionality
navItems.forEach(item => {
    item.addEventListener('click', () => {
        // Remover clase active de todos los elementos de navegación
        navItems.forEach(nav => nav.classList.remove('active'));
        // Añadir clase active al elemento clickeado
        item.classList.add('active');
        
        const tab = item.dataset.tab;
        console.log(`Navegando a: ${tab}`);
        
        // Ocultar todas las secciones
        document.querySelectorAll('.app-section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Mostrar la sección correspondiente
        const targetSection = document.querySelector(`#${tab}-section`);
        if (targetSection) {
            targetSection.classList.add('active');
            // Scroll al top de la página
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
});

// Filtros de ranking
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('filter-btn')) {
        // Remover active de todos los filtros
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        // Añadir active al clickeado
        e.target.classList.add('active');
        console.log(`Filtro seleccionado: ${e.target.textContent}`);
    }
    
    if (e.target.classList.contains('tab-btn')) {
        // Remover active de todos los tabs
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        // Añadir active al clickeado
        e.target.classList.add('active');
        console.log(`Tab seleccionado: ${e.target.textContent}`);
    }
    
    if (e.target.classList.contains('option-btn')) {
        const option = e.target.textContent.trim();
        console.log(`Opción de perfil: ${option}`);
        alert(`Función: ${option}`);
    }
});

// Profile button
profileBtn.addEventListener('click', () => {
    alert('Perfil de Usuario - Configuración de la cuenta');
});

// Random content button
document.querySelector('.btn-secondary').addEventListener('click', () => {
    const content = [
        'Attack on Titan',
        'Breaking Bad',
        'The Witcher',
        'Avengers: Endgame',
        'Stranger Things',
        'Demon Slayer',
        'Game of Thrones',
        'Spider-Man: No Way Home',
        'The Office',
        'Spirited Away',
        'Friends',
        'Interstellar'
    ];
    
    const randomContent = content[Math.floor(Math.random() * content.length)];
    alert(`Contenido aleatorio: ${randomContent}`);
});

// Add content button
document.querySelector('.btn-primary').addEventListener('click', () => {
    alert('Funcionalidad para añadir nuevo contenido - Aquí se abriría un formulario');
});



// App header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.app-header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(15, 15, 35, 0.95)';
        header.style.backdropFilter = 'blur(20px)';
    } else {
        header.style.background = 'var(--background-dark)';
        header.style.backdropFilter = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.anime-card, .category-card, .top-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// View more button
document.querySelector('.view-more-btn').addEventListener('click', () => {
    alert('Funcionalidad para mostrar Top 100 completo');
});

console.log('MediaDB - Plataforma de entretenimiento inicializada correctamente');
