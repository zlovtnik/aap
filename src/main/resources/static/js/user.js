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

    // Basic validation
    if (!username || !password || !email) {
        displayError('All fields are required');
        return;
    }
    
    // Show loading state
    const submitButton = document.querySelector('#user-form button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Saving...';
    submitButton.disabled = true;

    try {
        const response = await fetch('/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, email }),
            credentials: 'same-origin' // Include cookies for CSRF
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to create user');
        }

        const newUser = await response.json();
        fetchUsers();
        document.getElementById('user-form').reset();
        displaySuccess('User created successfully');
    } catch (error) {
        console.error('Error adding user:', error);
        displayError(error.message || 'Error creating user');
    } finally {
        // Reset button state
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
}

// Helper functions for user feedback
function displayError(message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-danger';
    alertDiv.textContent = message;
    insertAlert(alertDiv);
}

function displaySuccess(message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-success';
    alertDiv.textContent = message;
    insertAlert(alertDiv);
}

function insertAlert(alertDiv) {
    const container = document.querySelector('.container');
    const form = document.getElementById('user-form');
    container.insertBefore(alertDiv, form);
    setTimeout(() => alertDiv.remove(), 5000);
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
