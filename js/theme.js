function initializeTheme() {
    const themeButton = document.getElementById("themeToggle");
    const savedTheme = localStorage.getItem("nebo-theme");
    if (savedTheme) {
        document.documentElement.setAttribute("data-theme", savedTheme);
    }
    themeButton.addEventListener("click", () => {
        console.log("button clicked");
        const currentTheme =
            document.documentElement.getAttribute("data-theme");
        const newTheme =
            currentTheme === "light"
                ? "dark"
                : "light";
        document.documentElement.setAttribute(
            "data-theme",
            newTheme
        );
        localStorage.setItem(
            "nebo-theme",
            newTheme
        );
    });
}
