// ==========================================
// THREE.JS EARTH
// ==========================================
const canvas = document.getElementById("earthCanvas");
 
const scene = new THREE.Scene();
 
const camera = new THREE.PerspectiveCamera(
    42,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    1000
);
 
camera.position.z = 4.6;
 
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
});
 
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
 
const textureLoader = new THREE.TextureLoader();
 
const earthDayTexture = textureLoader.load(
    "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg"
);
 
const normalTexture = textureLoader.load(
    "https://threejs.org/examples/textures/planets/earth_normal_2048.jpg"
);
 
const geometry = new THREE.SphereGeometry(1.8, 128, 128);
 
const material = new THREE.MeshStandardMaterial({
    map: earthDayTexture,
    normalMap: normalTexture
});
 
const earth = new THREE.Mesh(geometry, material);
scene.add(earth);
 
const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
scene.add(ambientLight);
 
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.8);
directionalLight.position.set(5, 3, 5);
scene.add(directionalLight);
 
function animate() {
    requestAnimationFrame(animate);
    earth.rotation.y += 0.0035;
    renderer.render(scene, camera);
}
 
animate();
 
// ✅ Resize handler مع Debounce عشان الموقع ميتقلش
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (canvas) {
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
        }
    }, 150);
});
 
// ==========================================
// MOBILE MENU
// ==========================================
 
// ✅ فتح القائمة + الـ Overlay
function openMenu() {
    document.getElementById("navbar").classList.add("open");
    document.getElementById("navOverlay").classList.add("show");
    document.body.style.overflow = "hidden";
}
 
// ✅ إغلاق القائمة + الـ Overlay
function closeMenu() {
    document.getElementById("navbar").classList.remove("open");
    document.getElementById("navOverlay").classList.remove("show");
    document.body.style.overflow = "";
}
 
// ✅ إغلاق القائمة لما يضغط على أي لينك (للموبايل)
document.querySelectorAll('#navbar a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            closeMenu();
        }
    });
});
 
// ✅ إغلاق القائمة بزر Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeMenu();
    }
});
 
// ✅ التأكد إن menu-toggle شغال صح
const menuToggle = document.querySelector('.menu-toggle');
if (menuToggle) {
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        openMenu();
    });
}
 
// ==========================================
// HEADER SCROLL EFFECT
// ==========================================
const header = document.querySelector('header');
 
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});
 
// ==========================================
// ACTIVE NAV LINK ON SCROLL
// ==========================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('#navbar a');
 
window.addEventListener('scroll', () => {
    let current = '';
 
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
 
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});
 
// ==========================================
// STARS CANVAS (Header Background)
// ==========================================
const starsCanvas = document.getElementById('stars-canvas');
if (starsCanvas) {
    const ctx = starsCanvas.getContext('2d');
    let width, height;
    const stars = [];
 
    function initStars() {
        width = starsCanvas.width = starsCanvas.offsetWidth;
        height = starsCanvas.height = starsCanvas.offsetHeight;
        stars.length = 0;
 
        for (let i = 0; i < 100; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 1.5 + 0.5,
                speed: Math.random() * 0.5 + 0.1,
                opacity: Math.random()
            });
        }
    }
 
    function drawStars() {
        ctx.clearRect(0, 0, width, height);
 
        stars.forEach(star => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
            ctx.fill();
 
            star.y += star.speed;
            if (star.y > height) {
                star.y = 0;
                star.x = Math.random() * width;
            }
        });
 
        requestAnimationFrame(drawStars);
    }
 
    initStars();
    drawStars();
 
    window.addEventListener('resize', initStars);
}
 
// ==========================================
// SKILLS STARS
// ==========================================
const skillsStars = document.getElementById('skillsStars');
if (skillsStars) {
    for (let i = 0; i < 120; i++) {
        const star = document.createElement('div');
        const size = Math.random() * 2.5 + 0.5;
        star.style.cssText = `
            position:absolute; 
            border-radius:50%; 
            background:white;
            width:${size}px; 
            height:${size}px;
            top:${Math.random() * 100}%; 
            left:${Math.random() * 100}%;
            animation: twinkle ${2 + Math.random() * 3}s ${Math.random() * 4}s infinite alternate;
        `;
        skillsStars.appendChild(star);
    }
}

const chatToggle = document.getElementById("chatToggle");
const chatBox = document.getElementById("chatBox");
const closeChat = document.getElementById("closeChat");
const sendMessage = document.getElementById("sendMessage");
const chatInput = document.getElementById("chatInput");
const chatBody = document.getElementById("chatBody");

if (chatToggle && chatBox && closeChat && sendMessage && chatInput && chatBody) {
  chatToggle.addEventListener("click", () => {
    chatBox.classList.toggle("active");
  });

  closeChat.addEventListener("click", () => {
    chatBox.classList.remove("active");
  });

  function addMessage(text, className) {
    const msg = document.createElement("div");
    msg.className = className;
    msg.textContent = text;
    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function getBotReply(message) {
    const text = message.toLowerCase();

    if (text.includes("hello") || text.includes("hi") || text.includes("hey")) {
      return "Hello, I am Omar's AI assistant. I can tell you about his skills, projects, and contact information.";
    }

    if (text.includes("omar") || text.includes("who are you")) {
      return "Omar is a frontend developer from Egypt. He builds responsive and modern websites using HTML, CSS, JavaScript, Bootstrap, and React.";
    }

    if (text.includes("skills") || text.includes("skill")) {
      return "Omar works with HTML, CSS, JavaScript, Bootstrap, React, Git, GitHub, APIs, and responsive web design.";
    }

    if (text.includes("project") || text.includes("projects")) {
      return "Omar has built multiple projects including a portfolio website, CRUD app, World Cup API project, and other modern web interfaces.";
    }

    if (text.includes("react")) {
      return "Yes, Omar uses React to build interactive and reusable frontend interfaces.";
    }

    if (text.includes("html") || text.includes("css") || text.includes("javascript")) {
      return "These are part of Omar's core frontend stack. He uses them to build clean, responsive, and user friendly websites.";
    }

    if (text.includes("hire") || text.includes("work") || text.includes("freelance")) {
      return "Omar is available for freelance work, internships, and junior frontend opportunities.";
    }

    if (text.includes("contact") || text.includes("email")) {
      return "You can contact Omar through the contact section on this website.";
    }

    if (text.includes("cv") || text.includes("resume")) {
      return "You can download Omar's CV using the Download CV button in the hero section.";
    }

    if (text.includes("github")) {
      return "You can check Omar's GitHub projects from the links available in his portfolio.";
    }

    if (text.includes("experience")) {
      return "Omar is building real world frontend projects and continuously improving his skills through practice and self learning.";
    }

    if (text.includes("ui") || text.includes("design")) {
      return "Omar cares about modern UI, responsive layouts, smooth user experience, and clean visual details.";
    }

    if (text.includes("thank")) {
      return "You are welcome. Let me know if you want to know more about Omar.";
    }

    return "I can help you know more about Omar, his skills, projects, and how to contact him.";
  }

  async function handleSend() {
    const text = chatInput.value.trim();
    if (!text) return;

    addMessage(text, "user-message");
    chatInput.value = "";

    setTimeout(() => {
      const reply = getBotReply(text);
      addMessage(reply, "bot-message");
    }, 500);
  }

  sendMessage.addEventListener("click", handleSend);

  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  });
}