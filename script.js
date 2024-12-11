const users = [
    {
        "username": "KeyWest",
        "password": "Oshmonek-1UJOPI",
        "isStaff": true
    },
    {
        "username": "Keyroz",
        "password": "a7JkL@9p",
        "isStaff": true
    },
    {
        "username": "Kay",
        "password": "Kay123",
        "isStaff": true
    },
    {
        "username": "Robocop",
        "password": "Robocop123",
        "isStaff": true
    },
    {
        "username": "Loligo",
        "password": "Loligo123",
        "isStaff": true
    },
    {
        "username": "Obscurop",
        "password": "Martin5510",
        "isStaff": true
    },
        {
        "username": "Tigrou",
        "password": "Dofmine2@",
        "isStaff": true
    },
    {
        "username": "Keshmane",
        "password": "Keshmane123",
        "isStaff": true
    }
];

let joueurs = JSON.parse(localStorage.getItem('joueurs')) || [
    { username: "Noé Simon", igName: "NoéSimon", notes: "" },
    { username: "Ghost Lawson", igName: "IM SPOIT | Ghost", notes: "" },
    { username: "Biel Benazzouz", igName: "G-E | Keyroz", notes: "Gérant Events" },
    { username: "Redouane Amrani", igName: "Redouane", notes: "" },
    { username: "Diego Hevia", igName: "G-S | Loligo", notes: "Gérant Staffs" },
    { username: "Leo Beruga", igName: "G-L | Obscurop", notes: "Gérant Légal" },
    { username: "Evan Monitor", igName: "EvanMonitor", notes: "" },
    { username: "Abdel Smith", igName: "AbdelSmith", notes: "" },
    { username: "Leo Marquez", igName: "LeoMarquez", notes: "" },
    { username: "Bloxy Smith", igName: "Bloxy5_", notes: "Banni Permanent" },
    { username: "Jules Truvaux", igName: "JulesTruvaux", notes: "" },
    { username: "John Anderson", igName: "H | Tigrou", notes: "Staff Helpeur" },
    { username: "Luis Parker", igName: "LuisParker", notes: "" },
    { username: "Bamakouy Poalu", igName: "Glazz", notes: "" },
    { username: "Geoffrey Pacha", igName: "M | Robocop", notes: "Staff Modérateur" },
    { username: "Loic Briand", igName: "La Casquette", notes: "" },
    { username: "Santiago Fernandez", igName: "SantiagoFernandez", notes: "" },
    { username: "Joshua Cardozo", igName: "JoshuaCardozo", notes: "" },
    { username: "Nouredine Melin", igName: "Nouredine", notes: "" },
    { username: "Cesar Joer", igName: "M | KS", notes: "Staff Modérateur" },
    { username: "Gabriel Pablo", igName: "Viiper", notes: "Ami" },
];

function savePlayers() {
    localStorage.setItem('joueurs', JSON.stringify(joueurs));
}

function populatePlayerSelect() {
    const playerSelect = document.getElementById('playerSelect');
    playerSelect.innerHTML = ''; 

    joueurs.forEach((player, index) => {
        const option = document.createElement('option');
        option.value = index; 
        option.textContent = `${player.username} (${player.igName})`;
        playerSelect.appendChild(option);
    });
}

function populatePlayersList() {
    const playersList = document.getElementById('playersList');
    playersList.innerHTML = '';
    joueurs.forEach(player => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${player.username}</td><td>${player.igName}</td><td>${player.notes}</td>`;
        playersList.appendChild(row);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('usernameDisplay')) {
        const username = localStorage.getItem('username');
        const isStaff = localStorage.getItem('isStaff');
        if (username) {
            document.getElementById('usernameDisplay').textContent = username;

            if (isStaff === 'true') {
                populatePlayersList();
                populatePlayerSelect(); 
                document.getElementById('searchInput').addEventListener('input', filterPlayers);
            }
        } else {
            window.location.href = 'index.html';
        }
    }
});

document.getElementById('signupForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;
    users.push({ username, password, isStaff: false, igName: "" });
    alert("Inscription réussie !");
    window.location.href = 'index.html';
});

document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        localStorage.setItem('username', user.username);
        localStorage.setItem('isStaff', user.isStaff);
        window.location.href = user.isStaff ? 'staff.html' : 'index.html';
    } else {
        alert("Identifiant ou mot de passe incorrect");
    }
});

document.getElementById('logoutBtn')?.addEventListener('click', function() {
    localStorage.clear();
    window.location.href = 'index.html';
});

if (document.getElementById('usernameDisplay')) {
    const username = localStorage.getItem('username');
    const isStaff = localStorage.getItem('isStaff');
    if (username) {
        document.getElementById('usernameDisplay').textContent = username;

        if (isStaff === 'true') {
            populatePlayersList();
            document.getElementById('searchInput').addEventListener('input', filterPlayers);
        }
    } else {
        window.location.href = 'index.html';
    }
}

function populatePlayersList() {
    const playersList = document.getElementById('playersList');
    playersList.innerHTML = '';
    joueurs.forEach(player => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${player.username}</td><td>${player.igName}</td><td>${player.notes}</td>`;
        playersList.appendChild(row);
    });
}

function filterPlayers() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filteredPlayers = joueurs.filter(player =>
        player.username.toLowerCase().includes(searchInput) || player.igName.toLowerCase().includes(searchInput)
    );

    const playersList = document.getElementById('playersList');
    playersList.innerHTML = '';
    filteredPlayers.forEach(player => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${player.username}</td><td>${player.igName}</td><td>${player.notes}</td>`;
        playersList.appendChild(row);
    });
}

document.getElementById('submitNotesBtn').addEventListener('click', function() {
    const playerSelect = document.getElementById('playerSelect');
    const selectedIndex = playerSelect.value;
    const notesInput = document.getElementById('notesInput').value;

    if (selectedIndex !== "" && notesInput !== "") {
        joueurs[selectedIndex].notes = notesInput; 
        savePlayers(); 
        populatePlayersList(); 
        alert(`Notes de ${joueurs[selectedIndex].username} mises à jour !`);
    } else {
        alert("Veuillez sélectionner un joueur et entrer une note.");
    }
});
