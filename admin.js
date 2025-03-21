// User management
const registerUserForm = document.getElementById('register-user-form');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const userList = document.getElementById('users');

// List to store registered users temporarily
let users = [];

registerUserForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = usernameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;

    if (username && email && password) {
        const user = {
            username: username,
            email: email,
            password: password, // Note: In real scenarios, use password hashing
        };

        users.push(user);
        renderUsers();
        registerUserForm.reset();
    }
});

function renderUsers() {
    userList.innerHTML = '';
    users.forEach((user) => {
        const li = document.createElement('li');
        li.textContent = `${user.username} - ${user.email}`;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => deleteUser(user);
        
        li.appendChild(deleteBtn);
        userList.appendChild(li);
    });
}

function deleteUser(user) {
    users = users.filter(u => u !== user);
    renderUsers();
}
//script for admin page 

// Sound management
const addSoundForm = document.getElementById('add-sound-form');
const soundTitleInput = document.getElementById('sound-title');
const soundFileInput = document.getElementById('sound-file');
const soundList = document.getElementById('sound-list');

// List to store sounds temporarily
let sounds = [];

addSoundForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const soundTitle = soundTitleInput.value;
    const soundFile = soundFileInput.value;

    if (soundTitle && soundFile) {
        const sound = {
            title: soundTitle,
            file: soundFile,
        };

        sounds.push(sound);
        renderSounds();
        addSoundForm.reset();
    }
});

function renderSounds() {
    soundList.innerHTML = '';
    sounds.forEach((sound, index) => {
        const li = document.createElement('li');
        li.textContent = `${sound.title} - `;
        
        const playLink = document.createElement('a');
        playLink.href = sound.file;
        playLink.textContent = 'Play Sound';
        playLink.target = '_blank';

        li.appendChild(playLink);
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => deleteSound(index);
        
        li.appendChild(deleteBtn);
        soundList.appendChild(li);
    });
}

function deleteSound(index) {
    sounds.splice(index, 1);
    renderSounds();
}

