document.querySelector('.link-card i.fab.fa-spotify').parentElement.addEventListener('click', (e) => {
    e.preventDefault();

    const spotifyAppUrl = "spotify://user/roy5kpgtvd0jw7w2s5aixhgbu"; // URL schema per l'app Spotify
    const spotifyWebUrl = "https://open.spotify.com/user/roy5kpgtvd0jw7w2s5aixhgbu"; // URL del sito web Spotify

    // Controlla se l'utente è su un dispositivo mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
        // Prova ad aprire l'app di Spotify
        const startTime = Date.now();
        window.location.href = spotifyAppUrl;

        // Controlla se l'utente è tornato sulla pagina dopo un breve intervallo
        setTimeout(() => {
            const elapsedTime = Date.now() - startTime;
            if (elapsedTime < 1500) { // Se l'utente è tornato rapidamente, apri il sito web
                window.location.href = spotifyWebUrl;
            }
        }, 1000);
    } else {
        // Se non è un dispositivo mobile, apri il sito web
        window.open(spotifyWebUrl, "_blank");
    }
});