// === Gérer le menu déroulant "Connexion" ===
document.addEventListener('DOMContentLoaded', function () {
    const loginButton = document.getElementById('login-button');
    const dropdown = document.querySelector('.dropdown');

    // Vérifie que les éléments nécessaires existent
    if (loginButton && dropdown) {
        // Afficher/masquer le menu au clic sur le bouton
        loginButton.addEventListener('click', function (e) {
            e.preventDefault(); // Empêche le comportement par défaut du bouton
            dropdown.classList.toggle('open'); // Ajoute/retire la classe 'open'
        });

        // Fermer le menu déroulant si on clique ailleurs
        document.addEventListener('click', function (e) {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('open'); // Retire la classe 'open'
            }
        });
    } else {
        console.error('Élément(s) manquant(s) : Vérifiez que #login-button et .dropdown existent.');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const loginModal = document.getElementById('login-modal');
    const modalTitle = document.getElementById('modal-title');
    const closeModal = document.getElementById('close-modal');
    const roleInput = document.getElementById('role');
    const loginOptions = document.querySelectorAll('.login-option');
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');

    // Afficher le modal en cliquant sur une option de connexion
    loginOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            const role = option.dataset.role;

            // Mettre à jour le titre et le rôle caché
            modalTitle.textContent = `Connexion - ${role.charAt(0).toUpperCase() + role.slice(1)}`;
            roleInput.value = role;

            // Afficher le modal
            loginModal.classList.add('active');
        });
    });

    // Fermer le modal en cliquant sur le bouton de fermeture
    closeModal.addEventListener('click', () => {
        loginModal.classList.remove('active');
        errorMessage.classList.add('hidden'); // Masquer le message d'erreur
    });

    // Fermer le modal en cliquant en dehors de la fenêtre
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.classList.remove('active');
            errorMessage.classList.add('hidden'); // Masquer le message d'erreur
        }
    });

    // Validation du formulaire de connexion
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Empêche le rechargement de la page

        // Exemple de validation simple
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
});

document.addEventListener('DOMContentLoaded', () => {
    const animals = document.querySelectorAll('.animal');
    const modal = document.getElementById('animal-modal');
    const closeModal = document.getElementById('close-modal');

    // Éléments du modal
    const modalName = document.getElementById('animal-name');
    const modalFirstName = document.getElementById('animal-firstname');
    const modalImage = document.getElementById('animal-image');
    const modalSpecies = document.getElementById('animal-species');
    const modalHabitat = document.getElementById('animal-habitat');

    // Ouvrir le modal lorsqu'un animal est cliqué
    animals.forEach(animal => {
        animal.addEventListener('click', () => {
            const name = animal.dataset.name;
            const firstname = animal.dataset.firstname;
            const species = animal.dataset.species;
            const image = animal.dataset.image;
            const habitat = animal.dataset.habitat;

            // Mettre à jour le contenu du modal
            modalName.textContent = name;
            modalFirstName.textContent = firstname;
            modalImage.src = image;
            modalImage.alt = name;
            modalSpecies.textContent = species;
            modalHabitat.textContent = habitat;

            // Afficher le modal
            modal.classList.add('active');
        });
    });

    // Fermer le modal
    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // Fermer le modal en cliquant en dehors
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
});


document.getElementById('login-button').addEventListener('click', function () {
    const dropdownMenu = document.getElementById('dropdown-menu');
    const isExpanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', !isExpanded);
    dropdownMenu.classList.toggle('open');
});

document.getElementById('close-modal').addEventListener('click', function () {
    document.getElementById('login-modal').classList.add('hidden');
});
