window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY; // Posição de rolagem vertical
    document.body.style.backgroundPositionY = `${scrollPosition * 0.5}px`; // Ajusta a posição do fundo com base na rolagem
});

window.addEventListener('scroll', function () {
    var sections = document.querySelectorAll('section');
    var navLinks = document.querySelectorAll('nav ul li a');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        // Verifica se a seção está visível na tela
        if (window.scrollY >= sectionTop - sectionHeight / 3 && window.scrollY < sectionTop + sectionHeight - sectionHeight / 3) {
            current = section.getAttribute('id'); // Pega o ID da seção visível
        }
    });

    // Se não há nenhuma seção visível, não aplicamos a classe 'active'
    if (current === '') {
        navLinks.forEach(link => {
            link.classList.remove('active'); // Remove 'active' de todos os links
        });
    } else {
        // Atualiza as classes dos links
        navLinks.forEach(link => {
            link.classList.remove('active'); // Remove a classe 'active' de todos os links
            if (link.getAttribute('id').includes(current)) { // Adiciona 'active' no link correspondente
                link.classList.add('active');
            }
        });
    }
});


const links = document.querySelectorAll('nav ul li a');

links.forEach(link => {
    link.addEventListener('click', function () {
        // Remove a classe de todos os links
        links.forEach(l => l.classList.remove('nav-no-hover'));

        // Adiciona a classe ao link clicado
        this.classList.add('nav-no-hover');
    });
});

document.addEventListener('scroll', () => {
    const navLinks = document.querySelectorAll('.link a');

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
let autoScroll; // Variável para armazenar o intervalo de rolagem automática
let isScrolling = false; // Variável para verificar se a rolagem está ativa

// Função para iniciar a rolagem automática
function startAutoScroll() {
    if (!isScrolling) {
        isScrolling = true; // Marca a rolagem como ativa
        autoScroll = setInterval(() => {
            carrossel.scrollBy({
                left: 220, // Ajuste a quantidade de rolagem por intervalo
                behavior: 'smooth'
            });
        }, 3000); // Ajuste o intervalo de tempo
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

