document.addEventListener('DOMContentLoaded', () => {
    // Initialisation globale
    initDropdownMenu();
    initLoginModal();
    initAnimalModal();
});

/** === MENU DÉROULANT "Connexion" === */
function initDropdownMenu() {
    const loginButton = document.getElementById('login-button');
    const dropdown = document.querySelector('.dropdown');

    if (loginButton && dropdown) {
        loginButton.addEventListener('click', (e) => {
            e.preventDefault();
            dropdown.classList.toggle('open');
            loginButton.setAttribute('aria-expanded', dropdown.classList.contains('open'));
        });

        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target) && e.target !== loginButton) {
                dropdown.classList.remove('open');
                loginButton.setAttribute('aria-expanded', false);
            }
        });
    } else {
        console.error('Menu déroulant : #login-button ou .dropdown est introuvable.');
    }
}

/** === MODAL DE CONNEXION === */
function initLoginModal() {
    const loginModal = document.getElementById('login-modal');
    const modalTitle = document.getElementById('modal-title');
    const closeModal = document.getElementById('close-modal');
    const loginOptions = document.querySelectorAll('.login-option');
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');
    const roleInput = document.getElementById('role');
    const firstInput = document.getElementById('username');

    if (!loginModal || !loginForm || !roleInput || !modalTitle || !closeModal) {
        console.error('Modal de connexion : Des éléments requis sont introuvables.');
        return;
    }

    loginOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            const role = option.dataset.role;

            // Mise à jour des informations du modal
            modalTitle.textContent = `Connexion - ${role.charAt(0).toUpperCase() + role.slice(1)}`;
            roleInput.value = role;

            // Affichage du modal
            loginModal.classList.add('active');
            firstInput.focus(); // Focaliser sur le premier champ
        });
    });

    closeModal.addEventListener('click', () => {
        loginModal.classList.remove('active');
        errorMessage.classList.add('hidden');
    });

    window.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.classList.remove('active');
            errorMessage.classList.add('hidden');
        }
    });

    // Validation du formulaire de connexion
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const validCredentials = {
            veterinaire: { username: "vet", password: "1234" },
            employe: { username: "emp", password: "5678" },
            administrateur: { username: "admin", password: "admin" }
        };

        const role = roleInput.value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (
            validCredentials[role] &&
            validCredentials[role].username === username &&
            validCredentials[role].password === password
        ) {
            alert(`Connexion réussie en tant que ${role}`);
            loginModal.classList.remove('active');
            loginForm.reset();
        } else {
            errorMessage.classList.remove('hidden');
        }
    });
}

/** === MODAL DES ANIMAUX === */
function initAnimalModal() {
    const animals = document.querySelectorAll('.animal');
    const modal = document.getElementById('animal-modal');
    const closeModal = document.getElementById('close-modal');
    const modalName = document.getElementById('animal-name');
    const modalImage = document.getElementById('animal-image');
    const modalSpecies = document.getElementById('animal-species');
    const modalHabitat = document.getElementById('animal-habitat');

    if (!modal || !closeModal || !modalName || !modalImage || !modalSpecies || !modalHabitat) {
        console.error('Modal des animaux : Des éléments requis sont introuvables.');
        return;
    }

    animals.forEach(animal => {
        animal.addEventListener('click', () => {
            // Mise à jour des informations du modal
            modalName.textContent = animal.dataset.name || 'Nom inconnu';
            modalImage.src = animal.dataset.image || 'placeholder.jpg';
            modalImage.alt = animal.dataset.name || 'Animal';
            modalSpecies.textContent = animal.dataset.species || 'Espèce inconnue';
            modalHabitat.textContent = animal.dataset.habitat || 'Habitat inconnu';

            // Affichage du modal
            modal.classList.add('active');
        });
    });

    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}
