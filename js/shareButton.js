document.querySelector('.share-btn[data-tooltip="Share on Whatsapp"]').addEventListener('click', function () {
    const link = "https://gabbisceglie.github.io/gabriele_page/";
    const message = "Ciao! Dai un'occhiata a questa pagina: " + link;
  
    if (navigator.share) {
      // Usa l'API di condivisione nativa se disponibile
      navigator.share({
        title: 'Condividi questa pagina',
        text: message,
        url: link,
      })
      .then(() => console.log('Condivisione completata con successo'))
      .catch((error) => console.error('Errore durante la condivisione:', error));
    } else {
      // Fallback per dispositivi che non supportano l'API di condivisione
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
  });