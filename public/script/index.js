

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

// WIP
const switchbtn = document.getElementById("switch");
document.getElementById("switch").onclick = function()
{
    let switchCircle = document.getElementById("switch-circle");
    if (switchbtn.style.backgroundColor == "white") {
        switchCircle.style.marginLeft = "25px";
        switchbtn.style.backgroundColor = "black";
        document.body.style.backgroundColor = "#3b3b3b";
        document.body.style.color = "white";
    }
    else {
        switchbtn.style.backgroundColor = "white";
        switchCircle.style.marginLeft = "0px";
        document.body.style.backgroundColor = "white";
        document.body.style.color = "black";
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