//************** PAUSAR CARROSEL AO CLIQUE*/
// Função para pausar o carrossel ao clicar em um link
function pauseCarousels() {
    const carousels = document.querySelectorAll('.swiper-container');
    
    carousels.forEach(carousel => {
        if (carousel.swiper) {
            carousel.swiper.autoplay.stop(); // Para a reprodução automática
        }
    });
}

// Função para retomar o carrossel
function resumeCarousels() {
    const carousels = document.querySelectorAll('.swiper-container');
    
    carousels.forEach(carousel => {
        if (carousel.swiper) {
            carousel.swiper.autoplay.start(); // Retoma a reprodução automática
        }
    });
}

// Função para gerenciar a rolagem suave até a seção
function scrollToSection(targetId) {
    const targetElement = document.querySelector(targetId);
    const headerOffset = 70; // Ajuste para a altura do cabeçalho fixo, se houver
    const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerOffset; // Ajuste para o cabeçalho

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth' // Rolagem suave
    });
}

// Função para adicionar o evento de pausa e retomada aos links
function setupLinkHandlers() {
    const links = document.querySelectorAll('nav ul li a');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Evita o comportamento padrão do clique

            pauseCarousels(); // Pausa o carrossel ao clicar no link
            
            const targetId = link.getAttribute('href'); // Pega o ID da seção
            scrollToSection(targetId); // Chama a função para rolar até a seção

            // Retoma o carrossel após 1 segundo (ajuste conforme necessário)
            setTimeout(() => {
                resumeCarousels();
            }, 1000); // Ajuste o tempo conforme necessário
        });
    });
}

// Executa a função para configurar os eventos assim que o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    setupLinkHandlers();
});



// Função para ajustar a posição do fundo ao rolar
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY; // Posição de rolagem vertical
    document.body.style.backgroundPositionY = `${scrollPosition * 0.5}px`; // Ajusta a posição do fundo com base na rolagem
});

// Função para atualizar a classe 'active' na navegação
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section, footer'); // Inclui 'footer' na seleção
    const navLinks = document.querySelectorAll('nav ul li a');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        // Verifica se a seção está visível
        if (window.scrollY >= sectionTop - window.innerHeight / 2 && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id'); // Pega o ID da seção visível
        }
    });

    // Lógica para marcar o footer como ativo se a rolagem estiver no final da página
    const footer = document.querySelector('footer');
    if (window.scrollY + window.innerHeight >= document.body.scrollHeight - footer.offsetHeight) {
        current = footer.getAttribute('id'); // Marca o footer como ativo
    }

    // Atualiza as classes dos links
    navLinks.forEach(link => {
        link.classList.remove('active'); // Remove 'active' de todos os links
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active'); // Adiciona 'active' no link correspondente
        }
    });
});


// Função para gerenciar o clique nos links da navegação
const links = document.querySelectorAll('nav ul li a');

links.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault(); // Evita o comportamento padrão do clique

        const targetId = this.getAttribute('href'); // Captura o ID de destino

        if (targetId === '#sobre') {
            // Para o caso do link "Sobre", rola até o final da página
            window.scrollTo({
                top: document.body.scrollHeight, // Rola até o fundo da página
                behavior: 'smooth' // Rolagem suave
            });
        } else {
            // Para outros links, rola até o elemento específico
            const targetElement = document.querySelector(targetId);
            window.scrollTo({
                top: targetElement.offsetTop, // Posição do elemento
                behavior: 'smooth' // Rolagem suave
            });
        }

        // Pausa o carrossel ao clicar em um link
        pauseCarousels();

        // Retoma o carrossel após 5 segundos (ajuste conforme necessário)
        setTimeout(() => {
            resumeCarousels();
        }, 5000);

        // Gerencia as classes do menu
        links.forEach(l => l.classList.remove('nav-no-hover')); // Remove a classe de todos os links
        this.classList.add('nav-no-hover'); // Adiciona a classe ao link clicado
    });
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
        isScrolling = false; // Atualiza o estado da rolagem
    }
});

// Retorna a rolagem ao carrossel se o mouse sair da área do carrossel
carrossel.addEventListener('mouseleave', () => {
    startAutoScroll(); // Inicia a rolagem novamente
});

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

// Adiciona o evento de clique aos cartões
const cartoes = document.querySelectorAll('.cartao');
cartoes.forEach(cartao => {
    cartao.addEventListener('click', () => {
        centralizarCartao(cartao); // Centraliza o cartão clicado
    });
});

// Impede que o evento de scroll afete o comportamento da rolagem suave
document.querySelector('.carrossel').addEventListener('scroll', (event) => {
    event.stopPropagation();
});
