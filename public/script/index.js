

document.getElementById("burger").onclick = function() 
{
    let sidebarMenu = document.getElementById("sidebar-menu");
    
    if (sidebarMenu.style.display == "none") {
        sidebarMenu.style.display = "block";
    }
    else {
        sidebarMenu.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const tripledots = document.querySelectorAll(".tripledot");

    tripledots.forEach(dot => {
        dot.addEventListener("click", (e) => {
            e.preventDefault();
            const dropdown = dot.nextElementSibling;
            dropdown.style.display = dropdown.style.display === "flex" ? "none" : "flex";
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".tripledot-container")) {
            document.querySelectorAll(".video-dropdown").forEach(dropdown => {
                dropdown.style.display = "none";
            });
        }
    });
});



fetch('../../server.js')
    .then(response => response.clone())
    .then(data => {
        console.log('Exported data from server.js:', data);
    })
    .catch(error => {
        console.error('Error fetching server.js:', error);
    });