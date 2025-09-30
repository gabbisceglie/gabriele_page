
// Funzione per aggiornare il contatore delle view
function updateViewCounter() {
  const viewCountElement = document.getElementById('viewCount');
  const lastVisitKey = 'lastVisitTimestamp';
  const currentTimestamp = Date.now();
  const thirtyMinutes = 30 * 60 * 1000;

  // Recupera l'ultimo timestamp salvato
  const lastVisit = localStorage.getItem(lastVisitKey);

  // Controlla se sono passati almeno 30 minuti
  if (!lastVisit || currentTimestamp - lastVisit > thirtyMinutes) {
    // Incrementa il contatore delle view
    let currentViewCount = parseInt(viewCountElement.textContent, 10) || 0;
    currentViewCount++;
    viewCountElement.textContent = currentViewCount;

    // Salva il nuovo timestamp
    localStorage.setItem(lastVisitKey, currentTimestamp);
  }
}

// Esegui la funzione al caricamento della pagina
document.addEventListener('DOMContentLoaded', updateViewCounter);
