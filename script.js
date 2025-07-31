
// DOM Elements
const searchTrigger = document.getElementById('searchTrigger');
const searchOverlay = document.getElementById('searchOverlay');
const closeSearch = document.getElementById('closeSearch');  
const mainSearchInput = document.getElementById('mainSearchInput');
const searchSpinner = document.getElementById('searchSpinner');
const searchResults = document.getElementById('searchResults');
const categoryCards = document.querySelectorAll('.category-card');
const addListBtns = document.querySelectorAll('.add-list-btn');
const navItems = document.querySelectorAll('.nav-item');
const filterChips = document.querySelectorAll('.filter-chip');
const trendingTags = document.querySelectorAll('.trending-tag');

// Search Overlay Management
searchTrigger.addEventListener('click', () => {
    searchOverlay.classList.add('active');
    mainSearchInput.focus();
});

closeSearch.addEventListener('click', () => {
    searchOverlay.classList.remove('active');
    clearSearchResults();
});

// Close overlay with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
        searchOverlay.classList.remove('active');
        clearSearchResults();
    }
});

// Search functionality with spinner
let searchTimeout;
mainSearchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim();
    
    clearTimeout(searchTimeout);
    
    if (query.length > 2) {
        showSpinner();
        searchTimeout = setTimeout(() => {
            performSearch(query);
        }, 800);
    } else {
        hideSpinner();
        clearSearchResults();
    }
});

mainSearchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const query = e.target.value.trim();
        if (query) {
            showSpinner();
            setTimeout(() => {
                performSearch(query);
            }, 500);
        }
    }
});

function showSpinner() {
    searchSpinner.classList.add('active');
}

function hideSpinner() {
    searchSpinner.classList.remove('active');
}

function performSearch(query) {
    console.log(`🔍 Buscando: ${query}`);
    
    // Simulated search results
    const mockResults = [
        { title: 'Attack on Titan', type: 'anime', rating: 9.8, year: 2013, image: 'https://cdn.myanimelist.net/images/anime/1517/144159l.jpg' },
        { title: 'Breaking Bad', type: 'series', rating: 9.5, year: 2008, image: 'https://via.placeholder.com/200x300/1a3d1a/00ff41?text=BB' },
        { title: 'Demon Slayer', type: 'anime', rating: 9.2, year: 2019, image: 'https://cdn.myanimelist.net/images/anime/1286/99889l.jpg' },
        { title: 'The Witcher', type: 'series', rating: 8.7, year: 2019, image: 'https://via.placeholder.com/200x300/0f2f0f/39ff14?text=TW' },
        { title: 'Spider-Man: No Way Home', type: 'movies', rating: 8.9, year: 2021, image: 'https://via.placeholder.com/200x300/1a1f0a/00ff88?text=SM' },
        { title: 'Spirited Away', type: 'anime', rating: 9.7, year: 2001, image: 'https://via.placeholder.com/200x300/0a1f0a/39ff14?text=SA' }
    ];
    
    // Filter results based on active filter
    const activeFilter = document.querySelector('.filter-chip.active').dataset.type;
    const filteredResults = activeFilter === 'all' 
        ? mockResults 
        : mockResults.filter(item => item.type === activeFilter);
    
    // Simulate network delay
    setTimeout(() => {
        hideSpinner();
        displaySearchResults(filteredResults, query);
    }, 1000);
}

function displaySearchResults(results, query) {
    searchResults.innerHTML = '';
    
    if (results.length === 0) {
        searchResults.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>Sin resultados para "${query}"</h3>
                <p>Intenta con términos diferentes o revisa las tendencias</p>
            </div>
        `;
        return;
    }
    
    const resultsHTML = results.map(item => `
        <div class="search-result-card" data-type="${item.type}">
            <div class="result-image">
                <img src="${item.image}" alt="${item.title}" onerror="this.src='https://via.placeholder.com/200x300/0f2f0f/39ff14?text=${item.title.charAt(0)}'">
                <div class="result-overlay">
                    <button class="result-play-btn">
                        <i class="fas fa-play"></i>
                    </button>
                </div>
            </div>
            <div class="result-content">
                <h4>${item.title}</h4>
                <div class="result-meta">
                    <span class="result-rating">
                        <i class="fas fa-star"></i>
                        ${item.rating}
                    </span>
                    <span class="result-year">${item.year}</span>
                    <span class="result-type ${item.type}">${item.type.toUpperCase()}</span>
                </div>
            </div>
        </div>
    `).join('');
    
    searchResults.innerHTML = `
        <div class="results-header">
            <h3><i class="fas fa-list"></i> ${results.length} Resultados para "${query}"</h3>
        </div>
        <div class="results-grid">
            ${resultsHTML}
        </div>
    `;
    
    // Add click events to result cards
    document.querySelectorAll('.search-result-card').forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('h4').textContent;
            console.log(`📱 Seleccionado: ${title}`);
            alert(`Abriendo detalles de: ${title}`);
        });
    });
}

function clearSearchResults() {
    searchResults.innerHTML = '';
    mainSearchInput.value = '';
    hideSpinner();
}

// Filter chips functionality
filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
        filterChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        
        const query = mainSearchInput.value.trim();
        if (query.length > 2) {
            showSpinner();
            setTimeout(() => {
                performSearch(query);
            }, 300);
        }
    });
});

// Trending tags functionality
trendingTags.forEach(tag => {
    tag.addEventListener('click', () => {
        const searchTerm = tag.textContent;
        mainSearchInput.value = searchTerm;
        showSpinner();
        setTimeout(() => {
            performSearch(searchTerm);
        }, 500);
    });
});

// Category selection
categoryCards.forEach(card => {
    card.addEventListener('click', () => {
        const genre = card.dataset.genre;
        console.log(`🎯 Categoría seleccionada: ${genre}`);
        
        // Visual feedback
        card.style.transform = 'translateY(-5px) scale(1.05)';
        setTimeout(() => {
            card.style.transform = '';
        }, 200);
        
        alert(`🔥 Explorando arsenal: ${genre}`);
    });
});

// Add to list functionality
addListBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const anime = btn.closest('.top-item').querySelector('h4').textContent;
        
        if (btn.innerHTML.includes('fa-plus')) {
            btn.innerHTML = '<i class="fas fa-check"></i>';
            btn.style.background = var(--success-color);
            btn.style.borderColor = var(--success-color);
            console.log(`➕ Añadido al arsenal: ${anime}`);
        } else {
            btn.innerHTML = '<i class="fas fa-plus"></i>';
            btn.style.background = var(--background-dark);
            btn.style.borderColor = var(--accent-color);
            console.log(`➖ Removido del arsenal: ${anime}`);
        }
    });
});

// Bottom navigation functionality
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
        
        const tab = item.dataset.tab;
        console.log(`🧭 Navegando a sector: ${tab}`);
        
        document.querySelectorAll('.app-section').forEach(section => {
            section.classList.remove('active');
        });
        
        const targetSection = document.querySelector(`#${tab}-section`);
        if (targetSection) {
            targetSection.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        // Close search overlay if open
        if (searchOverlay.classList.contains('active')) {
            searchOverlay.classList.remove('active');
        }
    });
});

// Filters and tabs functionality
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('filter-btn')) {
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        console.log(`🎮 Filtro seleccionado: ${e.target.textContent}`);
    }
    
    if (e.target.classList.contains('tab-btn')) {
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        console.log(`📂 Arsenal seleccionado: ${e.target.textContent}`);
    }
    
    if (e.target.classList.contains('option-btn')) {
        const option = e.target.textContent.trim();
        console.log(`⚙️ Operación: ${option}`);
        alert(`🔧 Sistema: ${option}`);
    }
});

// Random content button
document.querySelector('.btn-secondary').addEventListener('click', () => {
    const content = [
        'Attack on Titan - Misión de Reconocimiento',
        'Breaking Bad - Operación Heisenberg', 
        'The Witcher - Caza de Monstruos',
        'Avengers: Endgame - Protocolo Final',
        'Stranger Things - Experimento Secreto',
        'Demon Slayer - Cacería Nocturna',
        'Game of Thrones - Guerra de Tronos',
        'Spider-Man: No Way Home - Multiverso',
        'The Office - Misión Encubierta',
        'Spirited Away - Mundo Espiritual',
        'Friends - Operación Amistad',
        'Interstellar - Exploración Espacial'
    ];
    
    const randomContent = content[Math.floor(Math.random() * content.length)];
    alert(`🎲 Contenido aleatorio desplegado: ${randomContent}`);
});

// Add content button
document.querySelector('.btn-primary').addEventListener('click', () => {
    alert('📝 Sistema de carga de contenido - Preparando formulario de ingreso de datos');
});

// App header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.app-header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(5, 15, 5, 0.95)';
        header.style.backdropFilter = 'blur(20px)';
        header.style.borderBottom = '2px solid var(--accent-color)';
    } else {
        header.style.background = 'var(--background-dark)';
        header.style.backdropFilter = 'none';
        header.style.borderBottom = '2px solid var(--border-color)';
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
    alert('🏆 Desplegando ranking completo - Top 100 Elite');
});

// Voice search placeholder
document.querySelector('.search-voice').addEventListener('click', () => {
    alert('🎤 Búsqueda por voz - Función en desarrollo');
});

// Add CSS for search results
const searchResultsCSS = `
.no-results {
    text-align: center;
    padding: 60px 20px;
    color: var(--text-secondary);
}

.no-results i {
    font-size: 64px;
    color: var(--border-color);
    margin-bottom: 20px;
}

.no-results h3 {
    color: var(--text-primary);
    margin-bottom: 12px;
    font-family: 'Orbitron', monospace;
}

.results-header {
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 2px solid var(--border-color);
}

.results-header h3 {
    color: var(--accent-color);
    font-family: 'Orbitron', monospace;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 18px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.results-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 20px;
}

.search-result-card {
    background: var(--card-bg);
    border: 2px solid var(--border-color);
    border-radius: 12px;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
}

.search-result-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(0, 255, 65, 0.1), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.search-result-card:hover::before {
    opacity: 1;
}

.search-result-card:hover {
    transform: translateY(-4px);
    border-color: var(--accent-color);
    box-shadow: 0 12px 24px rgba(0, 255, 65, 0.2);
}

.result-image {
    position: relative;
    height: 240px;
    overflow: hidden;
}

.result-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.search-result-card:hover .result-image img {
    transform: scale(1.05);
}

.result-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(0, 255, 65, 0.8), rgba(0, 0, 0, 0.6));
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.result-image:hover .result-overlay {
    opacity: 1;
}

.result-play-btn {
    background: rgba(0, 255, 65, 0.2);
    backdrop-filter: blur(10px);
    border: 2px solid var(--accent-color);
    color: var(--accent-color);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.result-play-btn:hover {
    transform: scale(1.2);
    background: var(--accent-color);
    color: var(--background-dark);
}

.result-content {
    padding: 16px;
    position: relative;
    z-index: 1;
}

.result-content h4 {
    color: var(--text-primary);
    margin-bottom: 8px;
    font-weight: 700;
    font-size: 14px;
    font-family: 'Orbitron', monospace;
    line-height: 1.3;
}

.result-meta {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.result-rating {
    display: flex;
    align-items: center;
    gap: 4px;
    color: var(--rating-color);
    font-weight: 700;
    font-size: 12px;
    font-family: 'Orbitron', monospace;
}

.result-year {
    color: var(--text-secondary);
    font-size: 11px;
    font-weight: 600;
    font-family: 'Orbitron', monospace;
}

.result-type {
    color: var(--accent-color);
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-family: 'Orbitron', monospace;
    background: var(--background-dark);
    padding: 2px 8px;
    border-radius: 4px;
    border: 1px solid var(--border-color);
    align-self: flex-start;
}

.result-type.anime {
    color: var(--accent-color);
}

.result-type.series {
    color: var(--accent-secondary);
}

.result-type.movies {
    color: var(--warning-color);
}
`;

// Inject CSS
const style = document.createElement('style');
style.textContent = searchResultsCSS;
document.head.appendChild(style);

console.log('🚀 CyberVault - Sistema de entretenimiento digital inicializado');
console.log('🔐 Todos los sistemas operacionales');
console.log('⚡ Base de datos lista para consultas');
