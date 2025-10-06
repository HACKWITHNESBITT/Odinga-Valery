/* =========================
   Mobile Navbar Toggle
========================= */
function hamburg() {
    const navbar = document.querySelector('.dropdown');
    navbar.style.transform = 'translateY(0px)';
}

function cancel() {
    const navbar = document.querySelector('.dropdown');
    navbar.style.transform = 'translateY(-500px)';
}

// Auto-close mobile menu when a link is clicked
document.querySelectorAll('.dropdown a').forEach(link => {
    link.addEventListener('click', () => {
        cancel();
    });
});

/* =========================
   Typewriter Effect
========================= */
const texts = [
    "BLOCKCHAIN DEVELOPER",
    "SOFTWARE DEVELOPER",
    "WEB DEVELOPER"
];

let speed = 100;
const textElements = document.querySelector('.typewriter-text');
let textIndex = 0;
let characterIndex = 0;

function typeWriter() {
    if (characterIndex < texts[textIndex].length) {
        textElements.innerHTML += texts[textIndex].charAt(characterIndex);
        characterIndex++;
        setTimeout(typeWriter, speed);
    } else {
        setTimeout(eraseText, 1000);
    }
}

function eraseText() {
    if (textElements.innerHTML.length > 0) {
        textElements.innerHTML = textElements.innerHTML.slice(0, -1);
        setTimeout(eraseText, 50);
    } else {
        textIndex = (textIndex + 1) % texts.length;
        characterIndex = 0;
        setTimeout(typeWriter, 500);
    }
}

/* =========================
   Scroll to Home on Page Load
========================= */
window.addEventListener("load", () => {
    // Scroll smoothly to the Home section
    const homeSection = document.getElementById("home");
    if (homeSection) {
        homeSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    // Start typewriter effect after scrolling
    typeWriter();
});

/* =========================
   Smooth Scroll Highlight
========================= */
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-container .links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 80;
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });

    // Show back-to-top button
    const backToTop = document.getElementById('backToTop');
    if (pageYOffset > 300) {
        backToTop.style.display = 'block';
    } else {
        backToTop.style.display = 'none';
    }
});

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.style.display = 'block';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* =========================
   Optional Floating Shapes / Particle Effects
========================= */
function createFloatingShape() {
    const shape = document.createElement('div');
    shape.style.position = 'fixed';
    shape.style.width = `${Math.random() * 15 + 10}px`;
    shape.style.height = shape.style.width;
    shape.style.backgroundColor = 'rgba(183, 75, 255, 0.2)'; // Purple
    shape.style.borderRadius = '50%';
    shape.style.left = `${Math.random() * window.innerWidth}px`;
    shape.style.top = `${Math.random() * window.innerHeight}px`;
    shape.style.pointerEvents = 'none';
    shape.style.zIndex = '0'; // Behind content
    shape.style.transition = 'transform 10s linear';
    document.body.appendChild(shape);

    setTimeout(() => {
        shape.style.transform = `translateY(${window.innerHeight + 100}px)`;
    }, 50);

    setTimeout(() => {
        shape.remove();
    }, 10500);
}

// Create floating shapes every 1 second
setInterval(createFloatingShape, 1000);
