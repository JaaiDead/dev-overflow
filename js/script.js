// --- Basic Mobile Menu Toggle ---
const menuToggle = document.querySelector('.menu-toggle');
const navUl = document.querySelector('nav ul');

menuToggle.addEventListener('click', () => {
    // Toggle the 'active' class on the navigation list
    navUl.classList.toggle('active');

    // Optional: Change button text/icon for accessibility or visual feedback
    const isOpen = navUl.classList.contains('active');
    menuToggle.setAttribute('aria-expanded', isOpen);
    // Example: Change icon (requires using icon fonts or SVGs)
    // menuToggle.innerHTML = isOpen ? '✕' : '☰';
});

// --- Optional: Close menu when a link is clicked ---
if (navUl) {
    navUl.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navUl.classList.contains('active')) {
                navUl.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                // menuToggle.innerHTML = '☰'; // Reset icon if changed
            }
        });
    });
}


// --- You can add more JavaScript later for: ---
// - Smooth scrolling effects
// - Project filtering
// - Form validation (if you add a contact form)
// - Simple animations or effects