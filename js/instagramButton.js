document.querySelector('.link-card i.fab.fa-instagram').parentElement.addEventListener('click', (e) => {
  e.preventDefault();

  const instagramAppUrl = "instagram://user?username=gabriele.bisceglie_";
  const instagramWebUrl = "https://www.instagram.com/gabriele.bisceglie_";
  // Controlla se l'utente è su un dispositivo mobile
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile) {
      // Prova ad aprire l'app di Instagram
      const startTime = Date.now();
      window.location.href = instagramAppUrl;

      // Controlla se l'utente è tornato sulla pagina dopo un breve intervallo
      setTimeout(() => {
          const elapsedTime = Date.now() - startTime;
          if (elapsedTime < 1500) { // Se l'utente è tornato rapidamente, apri il sito web
              window.location.href = instagramWebUrl;
          }
      }, 1000);
  } else {
      // Se non è un dispositivo mobile, apri il sito web
      window.open(instagramWebUrl, "_blank");
  }
});