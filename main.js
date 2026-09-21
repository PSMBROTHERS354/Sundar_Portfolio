/* =========================================================
   SUNDHARAMOORTHI P
   PROFESSIONAL 3D PORTFOLIO
   MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   1. DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initNavbar();

    initMobileMenu();

    initSmoothScrolling();

    initScrollReveal();

    initHero3D();

    initSkillInteractions();

    initProjectInteractions();

    initContactForm();

    initScrollTop();

});


/* =========================================================
   2. NAVBAR SCROLL EFFECT
========================================================= */

function initNavbar() {

    const navbar = document.getElementById("navbar");

    if (!navbar) return;


    function updateNavbar() {

        if (window.scrollY > 40) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    }


    window.addEventListener(
        "scroll",
        updateNavbar,
        { passive: true }
    );


    updateNavbar();

}


/* =========================================================
   3. MOBILE MENU
========================================================= */

function initMobileMenu() {

    const menuBtn =
        document.getElementById("menuBtn");

    const nav =
        document.getElementById("nav");


    if (!menuBtn || !nav) return;


    menuBtn.addEventListener("click", () => {

        nav.classList.toggle("open");


        const icon =
            menuBtn.querySelector("i");


        if (!icon) return;


        if (nav.classList.contains("open")) {

            icon.classList.remove("fa-bars");

            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");

            icon.classList.add("fa-bars");

        }

    });


    /* Close menu when clicking a link */

    const navLinks =
        nav.querySelectorAll("a");


    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("open");


            const icon =
                menuBtn.querySelector("i");


            if (icon) {

                icon.classList.remove("fa-xmark");

                icon.classList.add("fa-bars");

            }

        });

    });

}


/* =========================================================
   4. SMOOTH SCROLLING
========================================================= */

function initSmoothScrolling() {

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    links.forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");


            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }


            const target =
                document.querySelector(targetId);


            if (!target) return;


            event.preventDefault();


            const navbar =
                document.getElementById("navbar");


            const navbarHeight =
                navbar
                    ? navbar.offsetHeight
                    : 0;


            const targetPosition =
                target.getBoundingClientRect().top
                +
                window.pageYOffset
                -
                navbarHeight
                -
                15;


            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });

        });

    });

}


/* =========================================================
   5. ACTIVE NAVIGATION LINK
========================================================= */

function initActiveNavigation() {

    const sections =
        document.querySelectorAll(
            "section[id]"
        );


    const navLinks =
        document.querySelectorAll(
            '#nav a[href^="#"]'
        );


    if (
        !sections.length ||
        !navLinks.length
    ) {
        return;
    }


    function updateActiveLink() {

        const scrollPosition =
            window.scrollY + 180;


        let currentSection = "";


        sections.forEach(section => {

            const top =
                section.offsetTop;

            const height =
                section.offsetHeight;


            if (
                scrollPosition >= top &&
                scrollPosition < top + height
            ) {

                currentSection =
                    section.id;

            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");


            const href =
                link.getAttribute("href");


            if (
                href ===
                `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveLink,
        { passive: true }
    );


    updateActiveLink();

}


/* =========================================================
   6. HERO 3D MOUSE EFFECT
========================================================= */

function initHero3D() {

    const profileArea =
        document.querySelector(
            ".profile-area"
        );


    if (!profileArea) return;


    const profileCircle =
        profileArea.querySelector(
            ".profile-circle"
        );


    const floatingCards =
        profileArea.querySelectorAll(
            ".floating-card"
        );


    const orbits =
        profileArea.querySelectorAll(
            ".orbit"
        );


    /* Disable intensive 3D effects
       on touch devices */

    if (
        window.matchMedia(
            "(pointer: coarse)"
        ).matches
    ) {

        return;

    }


    let animationFrame = null;


    profileArea.addEventListener(
        "mousemove",
        event => {


            const rect =
                profileArea.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;


            const y =
                event.clientY -
                rect.top;


            const centerX =
                rect.width / 2;


            const centerY =
                rect.height / 2;


            const rotateX =
                ((y - centerY) /
                    centerY) *
                -5;


            const rotateY =
                ((x - centerX) /
                    centerX) *
                7;


            if (animationFrame) {

                cancelAnimationFrame(
                    animationFrame
                );

            }


            animationFrame =
                requestAnimationFrame(() => {


                    if (profileCircle) {

                        profileCircle.style.transform =
                            `perspective(700px)
                             rotateX(${rotateX}deg)
                             rotateY(${rotateY}deg)
                             translateZ(10px)`;

                    }


                    floatingCards.forEach(
                        (card, index) => {

                            const multiplier =
                                index === 0
                                    ? 1.5
                                    : -1.2;


                            card.style.transform =
                                `translate(
                                    ${rotateY * multiplier}px,
                                    ${rotateX * multiplier}px
                                )`;

                        }
                    );


                    orbits.forEach(
                        (orbit, index) => {

                            const multiplier =
                                (index + 1) *
                                0.5;


                            orbit.style.marginLeft =
                                `${rotateY * multiplier}px`;


                            orbit.style.marginTop =
                                `${rotateX * multiplier}px`;

                        }
                    );

                });

        }
    );


    profileArea.addEventListener(
        "mouseleave",
        () => {


            if (profileCircle) {

                profileCircle.style.transform =
                    "";

            }


            floatingCards.forEach(card => {

                card.style.transform = "";

            });


            orbits.forEach(orbit => {

                orbit.style.marginLeft = "";

                orbit.style.marginTop = "";

            });

        }
    );

}


/* =========================================================
   7. SCROLL REVEAL
========================================================= */

function initScrollReveal() {

    const elements =
        document.querySelectorAll(
            ".section, .project-card, .skill-row, .education-card, .achievement, .about-card, .terminal"
        );


    if (!elements.length) return;


    elements.forEach(element => {

        element.classList.add(
            "reveal-element"
        );

    });


    const style =
        document.createElement("style");


    style.textContent = `

        .reveal-element {

            opacity: 0;

            transform:
                translateY(35px);

            transition:
                opacity 0.8s ease,
                transform 0.8s ease;

        }


        .reveal-element.revealed {

            opacity: 1;

            transform:
                translateY(0);

        }


        .project-card.reveal-element:nth-child(2) {

            transition-delay:
                0.12s;

        }


        .project-card.reveal-element:nth-child(3) {

            transition-delay:
                0.24s;

        }


        .skill-row.reveal-element:nth-child(2) {

            transition-delay:
                0.08s;

        }


        .skill-row.reveal-element:nth-child(3) {

            transition-delay:
                0.16s;

        }


        .skill-row.reveal-element:nth-child(4) {

            transition-delay:
                0.24s;

        }


        .skill-row.reveal-element:nth-child(5) {

            transition-delay:
                0.32s;

        }

    `;


    document.head.appendChild(style);


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "revealed"
                        );


                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    elements.forEach(element => {

        observer.observe(element);

    });

}


/* =========================================================
   8. SKILL INTERACTIONS
========================================================= */

function initSkillInteractions() {

    const skillNodes =
        document.querySelectorAll(
            ".skill"
        );


    if (!skillNodes.length) return;


    skillNodes.forEach(skill => {


        skill.addEventListener(
            "mouseenter",
            () => {

                skill.style.zIndex = "20";

            }
        );


        skill.addEventListener(
            "mouseleave",
            () => {

                skill.style.zIndex = "";

            }
        );


    });

}


/* =========================================================
   9. PROJECT INTERACTIONS
========================================================= */

function initProjectInteractions() {

    const cards =
        document.querySelectorAll(
            ".project-card"
        );


    if (!cards.length) return;


    /* 3D tilt */

    if (
        !window.matchMedia(
            "(pointer: coarse)"
        ).matches
    ) {


        cards.forEach(card => {


            card.addEventListener(
                "mousemove",
                event => {


                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left;


                    const y =
                        event.clientY -
                        rect.top;


                    const centerX =
                        rect.width / 2;


                    const centerY =
                        rect.height / 2;


                    const rotateX =
                        ((y - centerY) /
                            centerY) *
                        -2.5;


                    const rotateY =
                        ((x - centerX) /
                            centerX) *
                        3;


                    card.style.transform =
                        `perspective(900px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)
                         translateY(-8px)`;

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.transform = "";

                }
            );


        });

    }

}


/* =========================================================
   10. CONTACT FORM
========================================================= */

function initContactForm() {

    const form =
        document.getElementById(
            "contactForm"
        );


    if (!form) return;


    form.addEventListener(
        "submit",
        event => {


            event.preventDefault();


            const name =
                document.getElementById(
                    "name"
                );


            const email =
                document.getElementById(
                    "email"
                );


            const message =
                document.getElementById(
                    "message"
                );


            if (
                !name ||
                !email ||
                !message
            ) {

                return;

            }


            const nameValue =
                name.value.trim();


            const emailValue =
                email.value.trim();


            const messageValue =
                message.value.trim();


            if (
                !nameValue ||
                !emailValue ||
                !messageValue
            ) {

                showNotification(
                    "Please fill in all fields.",
                    "error"
                );

                return;

            }


            /*

               This portfolio currently does not have
               a backend/email service.

               Therefore we create a mailto link
               using the entered information.

            */


            const recipient =
                "smoorthi354@gmail.com";


            const subject =
                encodeURIComponent(
                    `Portfolio Contact — ${nameValue}`
                );


            const body =
                encodeURIComponent(
                    `Name: ${nameValue}\n\n` +
                    `Email: ${emailValue}\n\n` +
                    `Message:\n${messageValue}`
                );


            const mailto =
                `mailto:${recipient}` +
                `?subject=${subject}` +
                `&body=${body}`;


            window.location.href =
                mailto;


            form.reset();


            showNotification(
                "Opening your email client...",
                "success"
            );

        }
    );

}


/* =========================================================
   11. NOTIFICATION
========================================================= */

function showNotification(
    message,
    type = "success"
) {


    const existing =
        document.querySelector(
            ".portfolio-notification"
        );


    if (existing) {

        existing.remove();

    }


    const notification =
        document.createElement("div");


    notification.className =
        "portfolio-notification";


    notification.textContent =
        message;


    const borderColor =
        type === "error"
            ? "#ff6688"
            : "#27d8ff";


    notification.style.cssText = `

        position: fixed;

        right: 25px;

        bottom: 25px;

        z-index: 9999;

        max-width: 320px;

        padding: 15px 20px;

        border-radius: 14px;

        color: #eaf6ff;

        background:
            rgba(5, 16, 29, 0.96);

        border:
            1px solid ${borderColor};

        box-shadow:
            0 15px 40px
            rgba(0,0,0,0.35);

        backdrop-filter:
            blur(15px);

        font-family:
            "DM Sans",
            sans-serif;

        font-size: 12px;

        font-weight: 600;

        transform:
            translateY(20px);

        opacity: 0;

        transition:
            0.35s ease;

    `;


    document.body.appendChild(
        notification
    );


    requestAnimationFrame(() => {

        notification.style.transform =
            "translateY(0)";

        notification.style.opacity =
            "1";

    });


    setTimeout(() => {

        notification.style.transform =
            "translateY(20px)";

        notification.style.opacity =
            "0";


        setTimeout(() => {

            notification.remove();

        }, 350);

    }, 3000);

}


/* =========================================================
   12. SCROLL TO TOP
========================================================= */

function initScrollTop() {

    const footerButton =
        document.querySelector(
            'footer a[href="#home"]'
        );


    if (!footerButton) return;


    footerButton.addEventListener(
        "click",
        event => {

            event.preventDefault();


            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}


/* =========================================================
   13. ACTIVE NAVIGATION
========================================================= */

initActiveNavigation();


/* =========================================================
   14. PAGE LOAD ANIMATION
========================================================= */

window.addEventListener(
    "load",
    () => {


        document.body.classList.add(
            "page-loaded"
        );


        const heroText =
            document.querySelector(
                ".hero-text"
            );


        const profile =
            document.querySelector(
                ".profile-area"
            );


        if (heroText) {

            heroText.style.animation =
                "heroTextIn 1s ease forwards";

        }


        if (profile) {

            profile.style.animation =
                "heroProfileIn 1.2s ease forwards";

        }

    }
);


/* =========================================================
   15. HERO LOAD ANIMATIONS
========================================================= */

const heroAnimationStyle =
    document.createElement("style");


heroAnimationStyle.textContent = `

    .hero-text {

        opacity: 0;

        transform:
            translateX(-35px);

    }


    .profile-area {

        opacity: 0;

        transform:
            translateX(25px)
            scale(0.96);

    }


    @keyframes heroTextIn {

        from {

            opacity: 0;

            transform:
                translateX(-35px);

        }

        to {

            opacity: 1;

            transform:
                translateX(0);

        }

    }


    @keyframes heroProfileIn {

        from {

            opacity: 0;

            transform:
                translateX(25px)
                scale(0.96);

        }

        to {

            opacity: 1;

            transform:
                translateX(0)
                scale(1);

        }

    }


    @media (prefers-reduced-motion: reduce) {

        .hero-text,
        .profile-area {

            opacity: 1;

            transform: none;

            animation: none !important;

        }

    }

`;


document.head.appendChild(
    heroAnimationStyle
);


/* =========================================================
   16. REDUCED MOTION
========================================================= */

if (
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches
) {


    document.documentElement.style
        .scrollBehavior = "auto";


    const style =
        document.createElement("style");


    style.textContent = `

        *,
        *::before,
        *::after {

            animation-duration:
                0.01ms !important;

            animation-iteration-count:
                1 !important;

            transition-duration:
                0.01ms !important;

        }

    `;


    document.head.appendChild(style);

}


/* =========================================================
   END
========================================================= */