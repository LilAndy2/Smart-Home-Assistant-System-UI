document.addEventListener('DOMContentLoaded', () => {
    const socialButtons = document.querySelectorAll('.connected-accounts button');

    socialButtons.forEach(button => {
        button.addEventListener('click', () => {
            const url = button.getAttribute('data-url');
            
            // Simulate login process (replace with actual login logic)
            window.open(url, '_blank');

            // After login (simulate with a timeout)
            setTimeout(() => {
                const icon = getSocialMediaIcon(button.id);
                const username = getSocialMediaName(button.id);
                const profileUrl = getProfileUrl(button.id);

                button.innerHTML = `<img src="${icon}" alt="${button.id} icon"> ${username}`;
                button.setAttribute('data-url', profileUrl);
                button.onclick = () => window.open(profileUrl, '_blank');
            }, 2000); // Simulate a delay for login
        });
    });

    const profilePicInput = document.getElementById('profile-pic');
    const changeProfilePicButton = document.getElementById('change-profile-pic');
    changeProfilePicButton.addEventListener('click', () => {
        profilePicInput.click();
    });
    profilePicInput.addEventListener('change', updateProfilePicture);

    const changeUsernameButton = document.getElementById('change-username');
    changeUsernameButton.addEventListener('click', updateUsername);
});

function getSocialMediaIcon(id) {
    switch (id) {
        case 'connect-facebook':
            return 'images/facebook.png';
        case 'connect-twitter':
            return 'images/twitter.png';
        case 'connect-instagram':
            return 'images/instagram.png';
        default:
            return '';
    }
}

function getSocialMediaName(id) {
    switch (id) {
        case 'connect-facebook':
            return 'Andrei Manea';
        case 'connect-twitter':
            return 'Twitter';
        case 'connect-instagram':
            return 'andrei.manea18';
        default:
            return '';
    }
}

function getProfileUrl(id) {
    switch (id) {
        case 'connect-facebook':
            return 'https://www.facebook.com/profile.php?id=100008229455794';
        case 'connect-twitter':
            return 'https://twitter.com/Twitter';
        case 'connect-instagram':
            return 'https://www.instagram.com/andrei.manea18';
        default:
            return '';
    }
}

function updateProfilePicture(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const newProfilePicUrl = e.target.result;
            document.getElementById('right-profile-photo').src = newProfilePicUrl;
        };
        reader.readAsDataURL(file);
    }
}

function updateUsername() {
    const newUsername = document.getElementById('username').value;
    document.getElementById('right-username').innerText = newUsername;
}

