document.addEventListener('DOMContentLoaded', () => {
    const themeToggler = document.querySelector('.theme-toggler');
    const lightModeIcon = themeToggler.querySelector('span:nth-child(1)');
    const darkModeIcon = themeToggler.querySelector('span:nth-child(2)');

    themeToggler.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        document.body.classList.toggle('light-theme');
        document.documentElement.classList.toggle('dark-theme');
        document.documentElement.classList.toggle('light-theme');
        lightModeIcon.classList.toggle('active');
        darkModeIcon.classList.toggle('active');
    });

    // Set the initial theme based on user preference or default
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (prefersDarkScheme) {
        document.body.classList.add('dark-theme');
        document.documentElement.classList.toggle('dark-theme');
        darkModeIcon.classList.add('active');
        lightModeIcon.classList.remove('active');
    } else {
        document.body.classList.add('light-theme');
        document.documentElement.classList.toggle('light-theme');
        lightModeIcon.classList.add('active');
        darkModeIcon.classList.remove('active');
    }
});