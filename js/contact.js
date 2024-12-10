document.addEventListener("DOMContentLoaded", function() {
    const navItems = document.querySelectorAll("ul li");
    navItems.forEach(item => {
        item.addEventListener("click", function(event) {
            event.preventDefault(); 
            if (item.id === "home") {
                window.location.href = "index.html";
            } else {
                window.location.href = "not found.html";
            }
        });
    });

    const breadcrumbHome = document.querySelector(".breadcrumb .home");
    if (breadcrumbHome) {
        breadcrumbHome.addEventListener("click", function(event) {
            event.preventDefault();  
            window.location.href = "index.html";  
        });
    }
});
