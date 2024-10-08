// Função para ajustar a posição do fundo ao rolar
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY; // Posição de rolagem vertical
    document.body.style.backgroundPositionY = `${scrollPosition * 0.5}px`; // Ajusta a posição do fundo com base na rolagem
});

// Função para atualizar a classe 'active' na navegação
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        // Ajusta o buffer para 50% da altura da seção
        const sectionMid = sectionTop + sectionHeight / 2;

        // Verifica se a seção está visível na tela
        if (window.scrollY >= sectionMid - window.innerHeight / 2 && window.scrollY < sectionMid + window.innerHeight / 2) {
            current = section.getAttribute('id'); // Pega o ID da seção visível
        }
    });

    // Atualiza as classes dos links
    navLinks.forEach(link => {
        link.classList.remove('active'); // Remove 'active' de todos os links
        if (link.getAttribute('href') === `#${current}`) { // Adiciona 'active' no link correspondente
            link.classList.add('active');
        }
    });
});


// Função para gerenciar o clique nos links da navegação
const links = document.querySelectorAll('nav ul li a');

links.forEach(link => {
    link.addEventListener('click', function (e) {
        console.log("Link clicado:", this.href); // Log para depuração
        // e.preventDefault(); // Remova este comentário se estiver usando preventDefault em outro lugar
        links.forEach(l => l.classList.remove('nav-no-hover')); // Remove a classe de todos os links
        this.classList.add('nav-no-hover'); // Adiciona a classe ao link clicado
    });
});

// Verifica se a rolagem está no topo da página
document.addEventListener('scroll', () => {
    const navLinks = document.querySelectorAll('nav ul li a');

    if (window.scrollY === 0) {
        // Está no topo da página
        navLinks.forEach(link => {
            link.classList.add('top-active');
        });
    } else {
        // Rolou para fora do topo
        navLinks.forEach(link => {
            link.classList.remove('top-active');
        });
    }
});

const carrossel = document.getElementById('carrossel');
const carrosselContent = carrossel.querySelector('.carrossel-content');
let autoScroll;
let isScrolling = false;
let cloneCards = false; // Verifica se os cartões foram clonados

// Função para clonar os cartões no final, criando o loop
function cloneCardsIfNeeded() {
    if (!cloneCards) {
        const cards = carrossel.querySelectorAll('.cartao');
        cards.forEach(card => {
            const clone = card.cloneNode(true); // Clona o cartão
            carrosselContent.appendChild(clone); // Adiciona o clone ao final
        });
        cloneCards = true; // Marca que os cartões foram clonados
    }
}

// Função para iniciar a rolagem automática
function startAutoScroll() {
    if (!isScrolling) {
        isScrolling = true;
        cloneCardsIfNeeded(); // Clona os cartões, se necessário
        autoScroll = setInterval(() => {
            carrossel.scrollBy({
                left: 180, // Ajuste a quantidade de rolagem por intervalo
                behavior: 'smooth'
            });

            // Verifica se chegou ao final da lista de cartões e reseta
            if (carrossel.scrollLeft >= carrossel.scrollWidth / 2) {
                carrossel.scrollLeft = 0; // Reseta para o início suavemente
            }
        }, 3000); // Tempo entre cada rolagem
    }
}

// Função para parar a rolagem automática
function stopAutoScroll() {
    clearInterval(autoScroll);
    isScrolling = false;
}

// Inicia a rolagem quando a página é carregada
startAutoScroll();

// Adiciona evento de clique para parar a rolagem quando um cartão é clicado
carrossel.addEventListener('click', (event) => {
    if (event.target.closest('.cartao')) {
        stopAutoScroll(); // Para a rolagem se um cartão for clicado
    }
});

// Retorna a rolagem ao carrossel se o mouse sair da área do carrossel
carrossel.addEventListener('mouseleave', startAutoScroll);
