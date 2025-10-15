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
    const homeSection = document.getElementById("home");
    if (homeSection) {
        homeSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
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

    const backToTop = document.getElementById('backToTop');
    backToTop.style.display = pageYOffset > 300 ? 'block' : 'none';
});

const backToTopBtn = document.getElementById('backToTop');
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* =========================
   Floating Shapes
========================= */
function createFloatingShape() {
    const shape = document.createElement('div');
    shape.style.position = 'fixed';
    shape.style.width = `${Math.random() * 15 + 10}px`;
    shape.style.height = shape.style.width;
    shape.style.backgroundColor = 'rgba(183, 75, 255, 0.2)';
    shape.style.borderRadius = '50%';
    shape.style.left = `${Math.random() * window.innerWidth}px`;
    shape.style.top = `${Math.random() * window.innerHeight}px`;
    shape.style.pointerEvents = 'none';
    shape.style.zIndex = '0';
    shape.style.transition = 'transform 10s linear';
    document.body.appendChild(shape);

    setTimeout(() => {
        shape.style.transform = `translateY(${window.innerHeight + 100}px)`;
    }, 50);

    setTimeout(() => { shape.remove(); }, 10500);
}

setInterval(createFloatingShape, 1000);

/* =========================
   Contact Form using EmailJS
========================= */
const form = document.getElementById("contactForm");
const status = document.getElementById("form-status");

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = form.user_name.value.trim();
        const email = form.user_email.value.trim();
        const message = form.message.value.trim();

        if (!name || !email || !message) {
            status.style.color = "#ff4d4d";
            status.textContent = "Please fill all fields.";
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            status.style.color = "#ff4d4d";
            status.textContent = "Please enter a valid email.";
            return;
        }

        // EmailJS send
        emailjs.send("service_kufkgqa", "template_huea5yh", {
            from_name: name,
            from_email: email,
            message: message
        })
            .then(function (response) {
                status.style.color = "#00ff99";
                status.textContent = "Message sent successfully!";
                form.reset();
            }, function (error) {
                status.style.color = "#ff4d4d";
                status.textContent = "Failed to send message. Please try again later.";
                console.error("EmailJS error:", error);
            });
    });
}
