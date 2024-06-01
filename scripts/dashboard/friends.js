document.addEventListener('DOMContentLoaded', () => {
    const friendsList = document.getElementById('friends-list');

    // Sample friends data including status (replace with real data or API call)
    const friends = [
        { name: 'Vanessa', image: 'images/vanessa.jpg', status: 'Online' },
        { name: 'Isidora', image: 'images/isidora.jpg', status: 'Away' },
        { name: 'Beta', image: 'images/beta.jpg', status: 'Offline' },
    ];

    // Function to display friends
    function displayFriends() {
        // Clear the existing friends list
        friendsList.innerHTML = '';

        friends.forEach(friend => {
            const friendItem = document.createElement('div');
            friendItem.className = 'friend-item';

            const friendImage = document.createElement('img');
            friendImage.src = friend.image;
            friendImage.alt = `${friend.name} Image`;

            const friendInfo = document.createElement('div');
            friendInfo.className = 'friend-info';

            const friendName = document.createElement('div');
            friendName.className = 'friend-name';
            friendName.innerText = friend.name;

            const friendStatus = document.createElement('div');
            friendStatus.className = 'friend-status';
            friendStatus.innerText = friend.status;

            friendInfo.appendChild(friendName);
            friendInfo.appendChild(friendStatus);

            friendItem.appendChild(friendImage);
            friendItem.appendChild(friendInfo);

            friendsList.appendChild(friendItem);
        });
    }

    displayFriends();
});
