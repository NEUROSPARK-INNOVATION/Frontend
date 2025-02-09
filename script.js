document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.querySelector('#preloader');
  
    if (preloader) {
      setTimeout(() => {
        preloader.remove();
        window.location.href = './frontpage/index.html';
      }, 1500); 
    }
  });
  