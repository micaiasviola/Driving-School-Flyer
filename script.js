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
  
      if (pageYOffset >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute('id');
      }
    });
  
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });
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
