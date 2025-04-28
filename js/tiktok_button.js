document.querySelector('.link-card i.fab.fa-tiktok').parentElement.addEventListener('click', (e) => {
    e.preventDefault();

    const tiktokAppUrl = "tiktok://user/profile/gabriele.bisceglie_"; // Sostituisci "your_tiktok_id" con il tuo ID TikTok
    const tiktokWebUrl = "https://www.tiktok.com/@gabriele.bisceglie_"; // Sostituisci "your_tiktok_id" con il tuo ID TikTok

    // Controlla se l'utente è su un dispositivo mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
        // Prova ad aprire l'app di TikTok
        const startTime = Date.now();
        window.location.href = tiktokAppUrl;

        // Controlla se l'utente è tornato sulla pagina dopo un breve intervallo
        setTimeout(() => {
            const elapsedTime = Date.now() - startTime;
            if (elapsedTime < 1500) { // Se l'utente è tornato rapidamente, apri il sito web
                window.location.href = tiktokWebUrl;
            }
        }, 1000);
    } else {
        // Se non è un dispositivo mobile, apri il sito web
        window.open(tiktokWebUrl, "_blank");
    }
});