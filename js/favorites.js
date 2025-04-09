document.addEventListener('DOMContentLoaded', function() {
    const favoritesContainer = document.getElementById('favorites-container');
    const noFavoritesMessage = document.getElementById('no-favorites');
    
    // Carrega favoritos do localStorage
    const favorites = JSON.parse(localStorage.getItem('techNewsFavorites') || {});

    // Menu mobile - Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');

    menuToggle.addEventListener('click', () => {
        navList.classList.toggle('active');
        
        // Altera o ícone ☰ para ✕ quando aberto
        menuToggle.textContent = navList.classList.contains('active') ? '✕' : '☰';
    });
    
    // Verifica se há favoritos
    if (Object.keys(favorites).length === 0) {
        noFavoritesMessage.style.display = 'block';
        favoritesContainer.style.display = 'none';
        return;
    }
    
    noFavoritesMessage.style.display = 'none';
    favoritesContainer.style.display = 'grid';
    
    // Exibe cada notícia favoritada
    for (const [id, news] of Object.entries(favorites)) {
        const newsCard = document.createElement('div');
        newsCard.className = 'news-card';
        newsCard.dataset.id = id;
        
        newsCard.innerHTML = `
            <img src="${news.image || 'https://via.placeholder.com/300x200?text=No+Image'}" 
                 alt="${news.title}" 
                 class="news-image"
                 loading="lazy">
            <div class="news-content">
                <h3 class="news-title">${news.title}</h3>
                <div class="news-meta">
                    <span>Saved on: ${new Date(news.date).toLocaleDateString('pt-BR')}</span>
                </div>
                <a href="${news.url}" target="_blank" class="read-more">Read news</a>
                <button class="favorite-btn favorited">Remove from Favorites ★</button>
            </div>
        `;
        
        favoritesContainer.appendChild(newsCard);
    }
    
    // Adiciona evento para remover favoritos
    favoritesContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('favorite-btn')) {
            const newsCard = e.target.closest('.news-card');
            const newsId = newsCard.dataset.id;
            
            // Remove do localStorage
            const favorites = JSON.parse(localStorage.getItem('techNewsFavorites') || '{}'); // ✅
            delete favorites[newsId];
            localStorage.setItem('techNewsFavorites', JSON.stringify(favorites));
            
            // Remove do DOM
            newsCard.remove();
            
            // Verifica se ainda há favoritos
            if (Object.keys(favorites).length === 0) {
                noFavoritesMessage.style.display = 'block';
                favoritesContainer.style.display = 'none';
            }
        }
    });
});