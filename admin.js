document.addEventListener("DOMContentLoaded", () => {
    const serviceForm = document.getElementById("service-form");
    const serviceList = document.getElementById("service-list");

    let services = []; // Stockage local temporaire des services

    // Charger les services existants au démarrage
    loadServices();

    // Gestion de l'envoi du formulaire
    serviceForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const serviceName = document.getElementById("service-name").value;
        const serviceDescription = document.getElementById("service-description").value;
        const serviceImage = document.getElementById("service-image").files[0];

        if (serviceName && serviceDescription && serviceImage) {
            // Lecture du fichier image pour enregistrement
            const reader = new FileReader();
            reader.onload = (e) => {
                const newService = {
                    name: serviceName,
                    description: serviceDescription,
                    image: e.target.result, // Base64 de l'image
                };
                services.push(newService);
                saveServices();
                displayServices();
                serviceForm.reset(); // Réinitialise le formulaire
            };
            reader.readAsDataURL(serviceImage);
        }
    });

    // Fonction pour afficher les services
    function displayServices() {
        serviceList.innerHTML = ""; // Efface la liste actuelle

        services.forEach((service, index) => {
            const li = document.createElement("li");
            li.className = "service-item";

            li.innerHTML = `
                <img src="${service.image}" alt="${service.name}" class="service-image">
                <div>
                    <h3>${service.name}</h3>
                    <p>${service.description}</p>
                </div>
                <button class="delete-service" data-index="${index}">Supprimer</button>
            `;

            serviceList.appendChild(li);
        });

        // Ajouter des gestionnaires d'événements pour la suppression
        document.querySelectorAll(".delete-service").forEach((button) => {
            button.addEventListener("click", (e) => {
                const index = e.target.dataset.index;
                services.splice(index, 1); // Supprime le service
                saveServices();
                displayServices();
            });
        });
    }

    // Charger les services à partir du stockage local (localStorage)
    function loadServices() {
        const savedServices = localStorage.getItem("services");
        if (savedServices) {
            services = JSON.parse(savedServices);
        }
        displayServices();
    }

    // Sauvegarder les services dans le stockage local (localStorage)
    function saveServices() {
        localStorage.setItem("services", JSON.stringify(services));
    }
});

document.querySelector('#add-service-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.querySelector('#service-title').value;
    const description = document.querySelector('#service-description').value;
    const image = document.querySelector('#service-image').value;

    fetch('addService.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, image })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Service ajouté avec succès');
            location.reload(); // Recharger pour afficher les nouveaux services
        }
    });
});
document.querySelectorAll('.delete-service-button').forEach(button => {
    button.addEventListener('click', () => {
        const serviceId = button.dataset.id;

        fetch('deleteService.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: serviceId })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Service supprimé');
                location.reload();
            }
        });
    });
});

