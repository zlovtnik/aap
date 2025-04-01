document.addEventListener('DOMContentLoaded', () => {
    fetchUsers();

    document.getElementById('user-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const userId = document.getElementById('user-id').value;
        if (userId) {
            updateUser(userId);
        } else {
            addUser();
        }
    });

    document.getElementById('user-list').addEventListener('click', (e) => {
        if (e.target.classList.contains('edit-btn')) {
            const userId = e.target.dataset.id;
            fetchUser(userId);
        } else if (e.target.classList.contains('delete-btn')) {
            const userId = e.target.dataset.id;
            deleteUser(userId);
        }
    });
});

async function fetchUsers() {
    try {
        const response = await fetch('/users');
        const users = await response.json();
        const userList = document.getElementById('user-list');
        userList.innerHTML = '';
        users.forEach(user => {
            const userRow = document.createElement('tr');
            userRow.innerHTML = `
                <td>${user.id}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>
                    <button class="edit-btn" data-id="${user.id}">Edit</button>
                    <button class="delete-btn" data-id="${user.id}">Delete</button>
                </td>
            `;
            userList.appendChild(userRow);
        });
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

async function addUser() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;

    try {
        const response = await fetch('/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, email })
        });
        const newUser = await response.json();
        fetchUsers();
        document.getElementById('user-form').reset();
    } catch (error) {
        console.error('Error adding user:', error);
    }
}

async function fetchUser(userId) {
    try {
        const response = await fetch(`/users/${userId}`);
        const user = await response.json();
        document.getElementById('user-id').value = user.id;
        document.getElementById('username').value = user.username;
        document.getElementById('email').value = user.email;
    } catch (error) {
        console.error('Error fetching user:', error);
    }
}

async function updateUser(userId) {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;

    try {
        await fetch(`/users/${userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, email })
        });
        fetchUsers();
        document.getElementById('user-form').reset();
    } catch (error) {
        console.error('Error updating user:', error);
    }
}

async function deleteUser(userId) {
    try {
        await fetch(`/users/${userId}`, { method: 'DELETE' });
        fetchUsers();
    } catch (error) {
        console.error('Error deleting user:', error);
    }
}
