// Gestione del numero di telefono con protezione password
class PhoneProtection {
    constructor() {
        this.correctPassword = "6586";
        this.phoneNumber = "Phone: +39 347 930 0813"; // Sostituisci con il tuo numero reale
        
        this.initializePhoneButton();
        this.createPasswordModal();
    }

    // Crea il modal personalizzato per l'inserimento password
    createPasswordModal() {
        const modal = document.createElement('div');
        modal.id = 'password-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-lock"></i> Inserisci Password</h3>
                    <button class="modal-close" onclick="phoneProtection.closeModal()">&times;</button>
                </div>
                <div class="modal-body">
                    <p>Inserisci la password per visualizzare il numero di telefono</p>
                    <div class="password-input-container">
                        <input type="password" id="password-input" placeholder="Password" maxlength="4">
                        <button id="show-password" type="button">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                    <div id="error-message" class="error-text" style="display: none;"></div>
                </div>
                <div class="modal-footer">
                    <button class="btn-cancel" onclick="phoneProtection.closeModal()">Annulla</button>
                    <button class="btn-confirm" onclick="phoneProtection.checkPassword()">Conferma</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Event listeners per il modal
        const passwordInput = modal.querySelector('#password-input');
        const showPasswordBtn = modal.querySelector('#show-password');
        
        // Enter per confermare
        passwordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.checkPassword();
            }
        });
        
        // Toggle visibilità password
        showPasswordBtn.addEventListener('click', () => {
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                showPasswordBtn.innerHTML = '<i class="fas fa-eye-slash"></i>';
            } else {
                passwordInput.type = 'password';
                showPasswordBtn.innerHTML = '<i class="fas fa-eye"></i>';
            }
        });
    }

    // Inizializza il bottone del telefono
    initializePhoneButton() {
        // Trova il link del numero di telefono
        const phoneLink = document.querySelector('a.link-card:has(.fa-whatsapp)');
        
        if (phoneLink) {
            // Aggiungi sempre event listener per il click (nessuna persistenza)
            phoneLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.showPasswordModal();
            });
        }
    }

    // Mostra il modal personalizzato
    showPasswordModal() {
        const modal = document.getElementById('password-modal');
        const passwordInput = document.getElementById('password-input');
        const errorMessage = document.getElementById('error-message');
        
        modal.style.display = 'flex';
        errorMessage.style.display = 'none';
        passwordInput.value = '';
        passwordInput.focus();
    }

    // Chiude il modal
    closeModal() {
        const modal = document.getElementById('password-modal');
        modal.style.display = 'none';
    }

    // Verifica la password inserita
    checkPassword() {
        const passwordInput = document.getElementById('password-input');
        const errorMessage = document.getElementById('error-message');
        const password = passwordInput.value;

        if (password === this.correctPassword) {
            this.handleCorrectPassword();
        } else {
            this.showError('Password errata, riprova!');
            passwordInput.value = '';
            passwordInput.focus();
        }
    }

    // Gestisce la password corretta
    handleCorrectPassword() {
        // Chiude il modal
        this.closeModal();
        
        // Mostra il numero di telefono
        const phoneLink = document.querySelector('a.link-card:has(.fa-whatsapp)');
        this.showPhoneNumber(phoneLink);
        
        // Mostra messaggio di successo
        this.showSuccessMessage();
    }

    // Mostra messaggio di errore nel modal
    showError(message) {
        const errorMessage = document.getElementById('error-message');
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        
        // Rimuovi il messaggio dopo 3 secondi
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 3000);
    }

    // Mostra il numero di telefono al posto del bottone
    showPhoneNumber(phoneLink) {
        if (phoneLink) {
            phoneLink.innerHTML = `
                <i class="fas fa-phone"></i> ${this.phoneNumber}
            `;
            phoneLink.href = "#"; // Non apre il telefono
            phoneLink.classList.add('phone-revealed');
            
            // Rimuovi tutti gli event listener esistenti clonando l'elemento
            const newPhoneLink = phoneLink.cloneNode(true);
            phoneLink.parentNode.replaceChild(newPhoneLink, phoneLink);
            
            // Aggiungi solo l'event listener per nascondere il numero
            newPhoneLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.hidePhoneNumber(newPhoneLink);
            });
        }
    }

    // Nasconde il numero di telefono e ripristina il bottone originale
    hidePhoneNumber(phoneLink) {
        if (phoneLink) {
            phoneLink.innerHTML = `
                <i class="fab fa-whatsapp"></i> Phone Number
            `;
            phoneLink.href = "#";
            phoneLink.classList.remove('phone-revealed');
            
            // Rimuovi tutti gli event listener esistenti clonando l'elemento
            const newPhoneLink = phoneLink.cloneNode(true);
            phoneLink.parentNode.replaceChild(newPhoneLink, phoneLink);
            
            // Aggiungi solo l'event listener per mostrare il modal password
            newPhoneLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.showPasswordModal();
            });
        }
    }

    // Mostra messaggio di successo
    showSuccessMessage() {
        const message = document.createElement('div');
        message.className = 'success-message';
        message.textContent = 'Numero di telefono sbloccato con successo!';
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 3000);
    }

    // Reset completo (per testing)
    reset() {
        // Non più necessario rimuovere dal localStorage
        // in quanto non viene più utilizzato
    }
}

// Variabile globale per accesso dal modal
let phoneProtection;

// Inizializza la protezione quando la pagina è caricata
document.addEventListener('DOMContentLoaded', () => {
    phoneProtection = new PhoneProtection();
});

// Gli stili CSS sono ora nel file styles.css principale