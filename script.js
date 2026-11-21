
const themeToggle = document.getElementById("theme-toggle");

// Get previously saved theme
const savedTheme = localStorage.getItem("theme");

// Apply saved theme
if (savedTheme === "dark") {
    document.body.classList.add("dark");
} else {
    document.body.classList.remove("dark");
}

// Toggle dark and light mode
if (themeToggle) {
    themeToggle.addEventListener("click", function () {

        document.body.classList.toggle("dark");

        const currentTheme =
            document.body.classList.contains("dark")
                ? "dark"
                : "light";

        // Save selected theme
        localStorage.setItem("theme", currentTheme);
    });
}

