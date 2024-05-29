document.addEventListener('DOMContentLoaded', function() {
    const sidebarLinks = document.querySelectorAll('.sidebar a');
    const sections = document.querySelectorAll('.content-section');

    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // Remove 'active' class from all links
            sidebarLinks.forEach(link => link.classList.remove('active'));
            // Add 'active' class to the clicked link
            this.classList.add('active');

            // Get the target section ID from the clicked link's href attribute
            const targetSectionID = this.getAttribute('href').substring(1);

            // Hide all sections
            sections.forEach(section => section.classList.add('hidden'));

            // Show the target section
            const targetSection = document.getElementById(targetSectionID);
            if (targetSection) {
                targetSection.classList.remove('hidden');
            }
        });
    });
});