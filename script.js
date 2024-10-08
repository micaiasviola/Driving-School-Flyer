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






// Lógica do carrossel



const carrossel = document.getElementById('carrossel');
let autoScroll; // Variável para armazenar o intervalo de rolagem automática
let isScrolling = false; // Variável para verificar se a rolagem está ativa

// Função para iniciar a rolagem automática
function startAutoScroll() {
    if (!isScrolling) {
        isScrolling = true; // Marca a rolagem como ativa
        autoScroll = setInterval(() => {
            const scrollPosition = carrossel.scrollLeft + carrossel.clientWidth;

            // Verifica se o carrossel atingiu o fim
            if (scrollPosition >= carrossel.scrollWidth) {
                // Se atingir o fim, volta ao início sem uma transição de scroll visível
                carrossel.scrollLeft = 0; // Resetando a posição
            } else {
                // Caso contrário, continua a rolar
                carrossel.scrollBy({
                    left: 180, // Ajuste a quantidade de rolagem por intervalo
                    behavior: 'smooth'
                });
            }
        }, 3000); // Ajuste o intervalo de tempo (3000ms = 3 segundos)
    }
}

// Função para parar a rolagem automática
function stopAutoScroll() {
    clearInterval(autoScroll);
    isScrolling = false; // Marca a rolagem como inativa
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
