document.querySelector('.link-card i.fab.fa-instagram').parentElement.addEventListener('click', (e) => {
    e.preventDefault();
  
    const instagramAppUrl = "instagram://user?username=gabriele.bisceglie_"; // Sostituisci "tuo_username" con il tuo username Instagram
    const instagramWebUrl = "https://www.instagram.com/gabriele.bisceglie_"; // Sostituisci "tuo_username" con il tuo username Instagram
  
    // Controlla se l'utente è su un dispositivo mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
    if (isMobile) {
      // Prova ad aprire l'app di Instagram
      window.location.href = instagramAppUrl;
  
      // Se l'app non è installata, apri il sito web dopo un breve ritardo
      setTimeout(() => {
        window.location.href = instagramWebUrl;
      }, 500);
    } else {
      // Se non è un dispositivo mobile, apri il sito web
      window.open(instagramWebUrl, "_blank");
    }
  });