// Toggle del menú de perfil
function toggleMenu() {
    document.getElementById("subMenu").classList.toggle("open-menu");
  }
  
  // Inicialización del slider Swiper
  new Swiper('.card-wrapper', {
    loop: true,
    spaceBetween: 30,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    breakpoints: {
      0: {
        slidesPerView: 1
      },
      768: {
        slidesPerView: 2
      },
      1024: {
        slidesPerView: 3
      }
    }
  });
  