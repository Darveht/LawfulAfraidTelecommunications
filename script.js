
// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.querySelector('.search-btn');
const categoryCards = document.querySelectorAll('.category-card');
const addListBtns = document.querySelectorAll('.add-list-btn');

// Search functionality
searchBtn.addEventListener('click', handleSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

function handleSearch() {
    const query = searchInput.value.trim();
    if (query) {
        console.log(`Buscando: ${query}`);
        // Here you would implement actual search functionality
        alert(`Funcionalidad de búsqueda implementada para: "${query}"`);
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
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Random anime button
document.querySelector('.btn-secondary').addEventListener('click', () => {
    const animes = [
        'Attack on Titan',
        'Demon Slayer',
        'Jujutsu Kaisen',
        'One Piece',
        'Naruto',
        'Death Note',
        'Fullmetal Alchemist',
        'Dragon Ball Z',
        'My Hero Academia',
        'Spirited Away'
    ];
    
    const randomAnime = animes[Math.floor(Math.random() * animes.length)];
    alert(`Anime aleatorio: ${randomAnime}`);
});

// Add anime button
document.querySelector('.btn-primary').addEventListener('click', () => {
    alert('Funcionalidad para añadir nuevo anime - Aquí se abriría un formulario');
});

// Login button
document.querySelector('.login-btn').addEventListener('click', () => {
    alert('Funcionalidad de login - Aquí se abriría el modal de login');
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.9)';
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

console.log('AnimeDB - Plataforma inicializada correctamente');
