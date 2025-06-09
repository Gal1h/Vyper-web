



document.addEventListener("DOMContentLoaded", () => {
    const tripledots = document.querySelectorAll(".tripledot");
    const sidebarMenu = document.getElementById("sidebar-menu");
    const sidebarToggle = document.getElementById("burger");

    // triple dot functionality
    tripledots.forEach(dot => {
        dot.addEventListener("click", (e) => {
            e.preventDefault();
            const dropdown = dot.nextElementSibling;
            dropdown.style.display = dropdown.style.display === "flex" ? "none" : "flex";
        });
    });

    // Sidebar toggle functionality 
    if (sidebarToggle && sidebarMenu) {
        sidebarToggle.addEventListener("click", (e) => {
            e.preventDefault();
            sidebarMenu.style.display = sidebarMenu.style.display === "block" ? "none" : "block";
        });
    }
    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".tripledot-container")) {
            document.querySelectorAll(".video-dropdown").forEach(dropdown => {
                dropdown.style.display = "none";
            });
        }
    });
});




// --------

fetch('../../server.js')
    .then(response => response.clone())
    .then(data => {
        console.log('Exported data from server.js:', data);
    })
    .catch(error => {
        console.error('Error fetching server.js:', error);
    });