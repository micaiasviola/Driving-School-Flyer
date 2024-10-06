window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY; // Posição de rolagem vertical
    document.body.style.backgroundPositionY = `${scrollPosition * 0.5}px`; // Ajusta a posição do fundo com base na rolagem
});

window.addEventListener('scroll', function() {
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
            if (link.getAttribute('href').includes(current)) { // Adiciona 'active' no link correspondente
                link.classList.add('active');
            }
        });
    }
});


const links = document.querySelectorAll('nav ul li a');

links.forEach(link => {
  link.addEventListener('click', function() {
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