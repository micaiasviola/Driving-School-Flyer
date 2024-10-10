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

// Lógica do carrossel Home*****************************

// Seleciona o botão
const redirectButton = document.getElementById('carrossel-btn');


// Função para redirecionar
redirectButton.onclick = function () {
    // Redireciona para o URL desejado
    window.location.href = 'https://www.instagram.com/autoescola.monteiro?igsh=MWp1ejlydWV1YWl0Nw==';  // Substitua pelo URL desejado
};

// Seleciona o carrossel e o botão
const carousel = document.querySelector('.home-carrossel');
const button = document.querySelector('.carrossel-btn');

// Função para mostrar o botão ao clicar no carrossel
carousel.addEventListener('click', function () {
    button.style.display = 'block'; // Exibe o botão
});

// Função para ocultar o botão se o usuário clicar fora do carrossel
document.addEventListener('click', function (event) {
    if (!carousel.contains(event.target)) { // Se clicou fora do carrossel
        button.style.display = 'none'; // Esconde o botão
    }
});

// Seleciona todos os slides
const slides = document.querySelectorAll('.slide');
let currentIndex = 0; // Índice do slide atual
let startTouchX = 0; // Posição inicial do toque
let endTouchX = 0;   // Posição final do toque

document.querySelector('.slide').addEventListener('scroll', (event) => {
    event.stopPropagation(); // Impede que o evento de scroll afete o comportamento da rolagem suave
});
// Função para exibir o slide atual
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });

    // Atualiza a posição do carrossel (fazendo-o deslizar)
    const slidesContainer = document.querySelector('.slides');
    slidesContainer.style.transform = `translateX(-${index * 100}%)`; // Desloca a largura dos slides
}

// Função para ir para o próximo slide
function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length; // Vai para o próximo ou volta ao primeiro
    showSlide(currentIndex);
}

// Função para ir para o slide anterior
function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length; // Vai para o anterior ou volta ao último
}

// Inicia o carrossel com o primeiro slide
showSlide(currentIndex);

// Intervalo automático para o carrossel (opcional)
setInterval(nextSlide, 5000); // Muda o slide a cada 5 segundos


// Lógica do carrossel Planos*/******************* */

const carrossel = document.getElementById('carrossel');
let autoScroll; // Variável para armazenar o intervalo de rolagem automática
let isScrolling = false; // Variável para verificar se a rolagem está ativa

// Função para iniciar a rolagem automática infinita
function startAutoScroll() {
    if (!isScrolling) {
        isScrolling = true; // Marca a rolagem como ativa
        autoScroll = setInterval(() => {
            const scrollPosition = carrossel.scrollLeft + carrossel.clientWidth;

            // Verifica se o carrossel atingiu o fim
            if (scrollPosition >= carrossel.scrollWidth) {
                // Se atingir o fim, vai para o início com transição suave
                carrossel.scrollLeft = 0;
            } else {
                // Caso contrário, continua rolando
                carrossel.scrollBy({
                    left: 180, // Ajuste a quantidade de rolagem por intervalo
                    behavior: 'smooth'
                });
            }
        }, 3000); // Ajuste o intervalo de tempo (3000ms = 3 segundos)
    }
}

// Inicia a rolagem quando a página é carregada
window.addEventListener('load', startAutoScroll);

// Função para parar a rolagem automática se um cartão for clicado
carrossel.addEventListener('click', (event) => {
    if (event.target.closest('.cartao')) {
        clearInterval(autoScroll); // Para a rolagem se um cartão for clicado
    }
});

// Retorna a rolagem ao carrossel se o mouse sair da área do carrossel
carrossel.addEventListener('mouseleave', startAutoScroll);

// Função para centralizar o cartão clicado
function centralizarCartao(cartao) {
    const carrosselWidth = carrossel.clientWidth; // Largura visível do carrossel
    const cartaoWidth = cartao.offsetWidth; // Largura do cartão
    const cartaoLeft = cartao.offsetLeft; // Posição do cartão no carrossel

    // Calcula a posição para centralizar o cartão
    const scrollPosition = cartaoLeft - (carrosselWidth - cartaoWidth) / 2;

    // Move o carrossel para a posição calculada
    carrossel.scrollTo({
        left: scrollPosition,
        behavior: 'smooth' // Rolagem suave
    });
}

document.querySelector('.carrossel').addEventListener('scroll', (event) => {
    event.stopPropagation(); // Impede que o evento de scroll afete o comportamento da rolagem suave
});

// Adiciona o evento de clique aos cartões
const cartoes = document.querySelectorAll('.cartao');
cartoes.forEach(cartao => {
    cartao.addEventListener('click', () => {
        centralizarCartao(cartao); // Centraliza o cartão clicado
    });
});
