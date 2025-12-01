// layout.js

document.addEventListener("DOMContentLoaded", () => {
    // Header
    const headerContainer = document.getElementById("site-header");
    if (headerContainer) {
        fetch("header.html")
            .then(res => res.text())
            .then(html => {
                headerContainer.innerHTML = html;
                markActiveNavLink();
            })
            .catch(err => console.error("Kunne ikke indlæse header:", err));
    }

    // Footer
    const footerContainer = document.getElementById("site-footer");
    if (footerContainer) {
        fetch("footer.html")
            .then(res => res.text())
            .then(html => {
                footerContainer.innerHTML = html;
            })
            .catch(err => console.error("Kunne ikke indlæse footer:", err));
    }
});

function markActiveNavLink() {
    const path = window.location.pathname;
    const file = path.substring(path.lastIndexOf("/") + 1) || "index.html";

    let pageKey = "index";
    if (file.includes("open")) pageKey = "open";
    if (file.includes("kontakt")) pageKey = "kontakt";
    if (file.includes("portfolio")) pageKey = "portfolio";

    const links = document.querySelectorAll(".nav-ul a[data-page]");
    links.forEach(link => {
        if (link.dataset.page === pageKey) {
            link.classList.add("nav-active");
        }
    });
}
