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

            if (role === "administrateur") {
                localStorage.setItem("userRole", "administrateur");
                window.location.href = "admin.html";
            } else {
                // Ferme le modal pour les autres rôles
                loginModal.classList.remove("active");
                loginForm.reset();
            }
        } else {
            errorMessage.classList.remove('hidden');
        }
    });
}

/** === MODAL DES ANIMAUX === */
document.addEventListener('DOMContentLoaded', () => {
    const animals = document.querySelectorAll('.animal'); // Tous les animaux cliquables
    const modal = document.getElementById('animal-modal'); // Le modal principal
    const closeModal = document.getElementById('close-animal-modal'); // La croix de fermeture

    // Éléments du modal
    const modalImage = document.getElementById('animal-image');
    const modalName = document.getElementById('animal-name');
    const modalFirstName = document.getElementById('animal-firstname');
    const modalSpecies = document.getElementById('animal-species');
    const modalHabitat = document.getElementById('animal-habitat');

    // Vérifiez que les éléments requis sont présents
    if (!modal || !closeModal || !modalImage || !modalName || !modalFirstName || !modalSpecies || !modalHabitat) {
        console.error('Un ou plusieurs éléments requis pour le modal animal sont manquants.');
        return;
    }

    // Ouvrir le modal lorsqu'un animal est cliqué
    animals.forEach(animal => {
        animal.addEventListener('click', () => {
            const name = animal.dataset.name;
            const firstname = animal.dataset.firstname;
            const species = animal.dataset.species;
            const habitat = animal.dataset.habitat;
            const image = animal.dataset.image;

            // Mettre à jour les contenus du modal
            modalName.textContent = name;
            modalFirstName.textContent = firstname;
            modalSpecies.textContent = species;
            modalHabitat.textContent = habitat;
            modalImage.src = image;
            modalImage.alt = name;

            // Afficher le modal
            modal.classList.remove('hidden');
        });
    });

    // Fermer le modal via la croix
    closeModal.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    // Fermer le modal en cliquant à l'extérieur
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });
});

    // Espace administrateur service

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
    
        const validCredentials = {
            veterinaire: { username: "vet", password: "1234" },
            employe: { username: "emp", password: "5678" },
            administrateur: { username: "admin", password: "admin" }
        };
    
        const role = roleInput.value;
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
    
        if (
            validCredentials[role] &&
            validCredentials[role].username === username &&
            validCredentials[role].password === password
        ) {
            alert(`Connexion réussie en tant que ${role}`);
            if (role === "administrateur") {
                window.location.href = "admin.html"; // Rediriger vers l'espace administrateur
            } else {
                loginModal.classList.remove("active");
                loginForm.reset();
            }
        } else {
            errorMessage.classList.remove("hidden");
        }
    });
    



