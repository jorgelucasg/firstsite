document.addEventListener('DOMContentLoaded', function() {
    // DOM
    const newsContainer = document.getElementById('news-container');
    const loadMoreBtn = document.getElementById('load-more');
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    // Configurações
    const apiKey = '0bb5e543f80a4a058a035a4267f13af1'; // Sua chave API
    let currentPage = 1;
    let currentSearchTerm = '';

    //Menu para aparecer o icone quando a tela ficar para celular 
    menuToggle.addEventListener('click', () => {
        navList.classList.toggle('active');
        
        //Altera o ícone ☰ para ✕ quando aberto
        menuToggle.textContent = navList.classList.contains('active') ? '✕' : '☰';
    });

    // Função para buscar notícias de tecnologia
    async function fetchTechNews(page = 1, searchTerm = '') {
        
        let url;
        if (searchTerm) {
            url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(searchTerm)}+AND+(technology OR tech)&page=${page}&pageSize=6&apiKey=${apiKey}`; //&language=pt& parametro para buscas em portugues
        } else {
            url = `https://newsapi.org/v2/top-headlines?category=technology&page=${page}&pageSize=6&apiKey=${apiKey}`;
        }

        try {
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            //converte a resposta para json
            const data = await response.json();
            
            if (data.articles && data.articles.length > 0) {
                displayNews(data.articles);
                loadMoreBtn.style.display = 'block';
            } else {
                newsContainer.innerHTML = '<p class="no-news">No tech news found. Try another search.</p>';
                loadMoreBtn.style.display = 'none';
            }
        } catch (error) {
            console.error('Error fetching news:', error);
            newsContainer.innerHTML = '<p class="error-news">Error loading tech news. Please try again later.</p>';
            loadMoreBtn.style.display = 'none';
        }
    }

    // Função para exibir notícias
    function displayNews(articles) {
        if (currentPage === 1) {
            newsContainer.innerHTML = '';
        }
    
        articles.forEach(article => {
            // Cria um ID único baseado no URL da notícia ou gera um aleatório
            const newsId = article.url || `${article.title}-${Date.now()}`;
            
            const newsCard = document.createElement('div');
            newsCard.className = 'news-card';
            newsCard.dataset.id = newsId.replace(/[^a-z0-9]/gi, '_'); // Sanitiza o ID
            
            // Verifica se já está favoritado
            const favorites = JSON.parse(localStorage.getItem('techNewsFavorites') || '{}');
            const isFavorited = favorites[newsCard.dataset.id];
    
            newsCard.innerHTML = `
                <img src="${article.urlToImage || 'https://via.placeholder.com/300x200?text=No+Image'}" 
                     alt="${article.title}" 
                     class="news-image" 
                     loading="lazy">
                <div class="news-content">
                    <h3 class="news-title">${article.title}</h3>
                    <p class="news-description">${article.description || 'No description available'}</p>
                    <div class="news-meta">
                        <span>${article.source.name}</span>
                        <span>${new Date(article.publishedAt).toLocaleDateString('pt-BR')}</span>
                    </div>
                    <a href="${article.url}" target="_blank" class="read-more">Read the news</a>
                    <button class="favorite-btn ${isFavorited ? 'favorited' : ''}">
                        ${isFavorited ? 'Remove from Favorites ★' : 'Add to Favorites ★'}
                    </button>
                </div>
            `;
            
            newsContainer.appendChild(newsCard);
        });
    }

    //carregar notícias iniciais
    fetchTechNews();

    //carregar mais notícias
    loadMoreBtn.addEventListener('click', function() {
        currentPage++;
        fetchTechNews(currentPage, currentSearchTerm);
    });

    //buscar notícias por termo
    searchBtn.addEventListener('click', function() {
        currentSearchTerm = searchInput.value.trim();
        currentPage = 1;
        fetchTechNews(1, currentSearchTerm);
    });

    // Permitir busca com Enter
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });

    //validacao de formulario de contato
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const formSuccess = document.getElementById('form-success');

    //validacao de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    //mensagem de erro
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorMsg = formGroup.querySelector('.error-message') || document.createElement('span');
        errorMsg.className = 'error-message';
        errorMsg.textContent = message;
        formGroup.appendChild(errorMsg);
        input.classList.add('error');
    }

    // Função para remover mensagem de erro
    function removeError(input) {
        const formGroup = input.parentElement;
        const errorMsg = formGroup.querySelector('.error-message');
        if (errorMsg) {
            formGroup.removeChild(errorMsg);
        }
        input.classList.remove('error');
    }

    // Validação em tempo real
    nameInput.addEventListener('input', () => {
        if (nameInput.value.trim() === '') {
            showError(nameInput, 'Name is required');
        } else {
            removeError(nameInput);
        }
    });

    emailInput.addEventListener('input', () => {
        if (emailInput.value.trim() === '') {
            showError(emailInput, 'Email is required');
        } else if (!emailRegex.test(emailInput.value.trim())) {
            showError(emailInput, 'Please enter a valid email');
        } else {
            removeError(emailInput);
        }
    });

    messageInput.addEventListener('input', () => {
        if (messageInput.value.trim() === '') {
            showError(messageInput, 'Message is required');
        } else if (messageInput.value.trim().length < 10) {
            showError(messageInput, 'Message should be at least 10 characters');
        } else {
            removeError(messageInput);
        }
    });

    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorMsg = formGroup.querySelector('.error-message') || document.createElement('span');
        errorMsg.className = 'error-message';
        errorMsg.textContent = message;
        formGroup.appendChild(errorMsg);
        input.classList.add('error');
    }

    function removeError(input) {
        const formGroup = input.parentElement;
        const errorMsg = formGroup.querySelector('.error-message');
        if (errorMsg) formGroup.removeChild(errorMsg);
        input.classList.remove('error');
    }

    document.getElementById('contact-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Captura dos elementos
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        const formSuccess = document.getElementById('form-success');
        
        let isValid = true;
        
        // Validação do Nome
        if (nameInput.value.trim() === '') {
            showError(nameInput, 'Name is required');
            isValid = false;
        } else {
            removeError(nameInput);
        }
        
        // Validação do Email 
        if (emailInput.value.trim() !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
            showError(emailInput, 'Please enter a valid email');
            isValid = false;
        } else {
            removeError(emailInput);
        }
        
        // Validação da Mensagem
        if (messageInput.value.trim() === '') {
            showError(messageInput, 'Message is required');
            isValid = false;
        } else if (messageInput.value.trim().length < 10) {
            showError(messageInput, 'Message should be at least 10 characters');
            isValid = false;
        } else {
            removeError(messageInput);
        }
        
        // Envia para WhatsApp
        if (isValid) {
            formSuccess.classList.add('show');
            
            // Monta a mensagem para WhatsApp
            const rawMessage = 
                `Hello TechNews!\n\n` +
                `*My name is:* ${nameInput.value.trim()}\n` +
                `*My email:* ${emailInput.value.trim() || 'Not provided'}\n` +
                `*Reason for contact:*\n${messageInput.value.trim()}`;
            
            const phoneNumber = '5541987326413';
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(rawMessage)}`;
            
            setTimeout(() => {
                window.open(whatsappUrl, '_blank');
                contactForm.reset();
                formSuccess.classList.remove('show');
            }, 1500);
        }
    });
    

    // Evento de clique para favoritar/desfavoritar
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('favorite-btn')) {
            const newsCard = e.target.closest('.news-card');
            const newsId = newsCard.dataset.id;
            const newsTitle = newsCard.querySelector('.news-title').textContent;
            const newsUrl = newsCard.querySelector('a').href;
            const newsImage = newsCard.querySelector('img').src;

            // Obter favoritos atual ou criar objeto vazio
            const favorites = JSON.parse(localStorage.getItem('techNewsFavorites') || '{}');

            if (e.target.classList.contains('favorited')) {
                // Remover dos favoritos
                delete favorites[newsId];
                e.target.classList.remove('favorited');
                e.target.textContent = 'Add to Favorites ★';
            } else {
                // Adicionar aos favoritos
                favorites[newsId] = {
                    title: newsTitle,
                    url: newsUrl,
                    image: newsImage,
                    date: new Date().toISOString()
                };
                e.target.classList.add('favorited');
                e.target.textContent = 'Remove from Favorites ★';
            }

            // Salvar no localStorage
            localStorage.setItem('techNewsFavorites', JSON.stringify(favorites));
            
            // Feedback visual
            const feedback = document.createElement('span');
            feedback.className = 'favorite-feedback';
            feedback.textContent = 'Favorites updated!';
            e.target.parentNode.appendChild(feedback);
            
            // Remove o feedback após 2 segundos
            setTimeout(() => {
                feedback.remove();
            }, 2000);
        }
    });

});
