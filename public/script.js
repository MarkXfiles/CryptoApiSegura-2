document.addEventListener('DOMContentLoaded', () => {
    const userList = document.getElementById('user-list');
    const addUserForm = document.getElementById('add-user-form');

    // Función para cargar la lista de usuarios
    const loadUsers = async () => {
        const response = await fetch('/api/users');
        const users = await response.json();
        userList.innerHTML = users.map(user => `
            <div>${user.name}</div>
        `).join('');
    };

    // Función para agregar un nuevo usuario
    addUserForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;

        const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: username }),
        });

        if (response.ok) {
            loadUsers();
            addUserForm.reset();
        }
    });

    // Cargar la lista de usuarios al iniciar
    loadUsers();
});