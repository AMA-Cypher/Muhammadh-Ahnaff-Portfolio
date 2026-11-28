
// =================================
// Active Navigation on Scroll
// =================================

document.addEventListener("DOMContentLoaded", function () {

    const navLinks = document.querySelectorAll(".nav-links a");

    const sections = document.querySelectorAll(
        "#home, #about, #skills, #projects, #experience, #contact"
    );

    const header = document.querySelector(".header");

    let clickedSection = null;

    function setActiveLink(sectionId) {

        navLinks.forEach(link => {

            const isActive =
                link.getAttribute("href") === "#" + sectionId;

            link.classList.toggle("active", isActive);

        });
    }

    function updateActiveLink() {

        // Keep the clicked link active during smooth scrolling
        if (clickedSection) {

            const targetSection = document.getElementById(clickedSection);

            if (targetSection) {

                const headerHeight = header
                    ? header.getBoundingClientRect().height
                    : 0;

                const targetTop = targetSection.getBoundingClientRect().top;

                if (targetTop > headerHeight + 10) {
                    setActiveLink(clickedSection);
                    return;
                }
            }

            clickedSection = null;
        }

        const headerHeight = header
            ? header.getBoundingClientRect().height
            : 0;

        const marker = headerHeight + 80;

        let currentSection = sections[0]?.id || "";

        sections.forEach(section => {

            if (section.getBoundingClientRect().top <= marker) {
                currentSection = section.id;
            }

        });

        // Select final section at page bottom
        if (
            window.innerHeight + window.scrollY >=
            document.documentElement.scrollHeight - 5
        ) {
            currentSection = sections[sections.length - 1]?.id || currentSection;
        }

        setActiveLink(currentSection);
    }

    // Navigation click
    navLinks.forEach(link => {

        link.addEventListener("click", function () {

            clickedSection = this.getAttribute("href").substring(1);

            setActiveLink(clickedSection);

        });

    });

    // Scroll detection
    window.addEventListener("scroll", updateActiveLink, {
        passive: true
    });

    // Initial detection
    updateActiveLink();

});


// =================================
// Contact Form Submission
// =================================

document.addEventListener("DOMContentLoaded", function () {

    const contactForm = document.getElementById("contactForm");
    const formStatus = document.getElementById("formStatus");

    if (contactForm && formStatus) {

        contactForm.addEventListener("submit", async function (event) {

            event.preventDefault();

            const submitButton = contactForm.querySelector(
                'button[type="submit"]'
            );

            const originalButtonText = submitButton.textContent;

            // Show loading message
            submitButton.disabled = true;
            submitButton.textContent = "Sending...";
            formStatus.textContent = "Please wait, sending your message...";
            formStatus.style.color = "#94a3b8";

            try {

                const response = await fetch(contactForm.action, {
                    method: "POST",
                    body: new FormData(contactForm),
                    headers: {
                        "Accept": "application/json"
                    }
                });

                const result = await response.json();

                if (response.ok) {

                    // Success message
                    formStatus.textContent =
                        "Your message has been sent successfully!";

                    formStatus.style.color = "#22c55e";

                    // Clear form fields
                    contactForm.reset();

                } else {

                    // Form submission error
                    formStatus.textContent =
                        result.errors
                            ? result.errors.map(error => error.message).join(", ")
                            : "Something went wrong. Please try again.";

                    formStatus.style.color = "#ef4444";
                }

            } catch (error) {

                // Network error
                formStatus.textContent =
                    "Unable to send your message. Please check your internet connection.";

                formStatus.style.color = "#ef4444";

            } finally {

                // Restore button
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;

            }

        });

    }

});



// =================================
// Dark Mode / Light Mode Toggle
// =================================

document.addEventListener("DOMContentLoaded", function () {

    const themeToggle = document.getElementById("themeToggle");

    if (!themeToggle) return;

    const themeIcon = themeToggle.querySelector("i");

    if (!themeIcon) return;

    // Update icon based on selected theme
    function updateThemeIcon(isLightMode) {

        if (isLightMode) {
            // Light mode: Show moon icon
            themeIcon.className = "fa-solid fa-moon";
            themeToggle.setAttribute("aria-label", "Switch to dark mode");

        } else {
            // Dark mode: Show sun icon
            themeIcon.className = "fa-solid fa-sun";
            themeToggle.setAttribute("aria-label", "Switch to light mode");
        }
    }

    // Load saved theme
    const savedTheme = localStorage.getItem("portfolio-theme");

    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
    }

    updateThemeIcon(document.body.classList.contains("light-mode"));

    // Theme toggle button
    themeToggle.addEventListener("click", function () {

        document.body.classList.toggle("light-mode");

        const isLightMode =
            document.body.classList.contains("light-mode");

        updateThemeIcon(isLightMode);

        // Save selected theme
        localStorage.setItem(
            "portfolio-theme",
            isLightMode ? "light" : "dark"
        );

    });

});


// =================================
// Mobile Hamburger Menu
// =================================

document.addEventListener("DOMContentLoaded", function () {

    const mobileMenuToggle = document.getElementById("mobileMenuToggle");
    const navLinks = document.querySelector(".nav-links");

    if (mobileMenuToggle && navLinks) {

        mobileMenuToggle.addEventListener("click", function () {

            navLinks.classList.toggle("mobile-menu-open");

            const isOpen = navLinks.classList.contains("mobile-menu-open");

            mobileMenuToggle.innerHTML = isOpen
                ? '<i class="fa-solid fa-xmark"></i>'
                : '<i class="fa-solid fa-bars"></i>';

            mobileMenuToggle.setAttribute("aria-expanded", isOpen);
            mobileMenuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );

        });

        // Close menu after selecting a navigation link
        navLinks.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", function () {

                navLinks.classList.remove("mobile-menu-open");

                mobileMenuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';

                mobileMenuToggle.setAttribute("aria-expanded", "false");
                mobileMenuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

            });

        });

    }

});



// =================================
// Section Reveal Animation
// =================================

document.addEventListener("DOMContentLoaded", function () {

    const sections = document.querySelectorAll(
        "#home, #about, #skills, #projects, #experience, #contact"
    );

    const observer = new IntersectionObserver(function (entries) {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                // Show animation when section enters screen
                entry.target.classList.add("is-visible");

            } else {

                // Reset animation when section leaves screen
                entry.target.classList.remove("is-visible");

            }

        });

    }, {
        threshold: 0.15
    });

    sections.forEach(section => {

        section.classList.add("reveal-section");

        observer.observe(section);

    });

});
