document.querySelector('.link-card i.fab.fa-github').parentElement.addEventListener('click', (e) => {
    e.preventDefault();

    const githubAppUrl = "github://profile/gabbiscieglie";
    const githubWebUrl = "https://github.com/gabbisceglie";

    // Controlla se l'utente è su un dispositivo mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
        // Prova ad aprire l'app di GitHub
        const startTime = Date.now();
        window.location.href = githubAppUrl;

        // Controlla se l'utente è tornato sulla pagina dopo un breve intervallo
        setTimeout(() => {
            const elapsedTime = Date.now() - startTime;
            if (elapsedTime < 1500) { // Se l'utente è tornato rapidamente, apri il sito web
                window.location.href = githubWebUrl;
            }
        }, 1000);
    } else {
        // Se non è un dispositivo mobile, apri il sito web
        window.open(githubWebUrl, "_blank");
    }
});