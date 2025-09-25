// Theme Management
// Site uses dark theme only
const htmlElement = document.documentElement;
htmlElement.setAttribute("data-theme", "dark");

// Loading Screen
// Shows loading animation for 1 second before revealing content
window.addEventListener("load", () => {
  setTimeout(() => {
    document.querySelector(".loading").classList.add("hidden");
  }, 1000);
});

// Social Share System
// Handles Twitter sharing and link copying functionality
document.querySelectorAll(".share-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.querySelector(".fa-twitter")) {
      window.open(
        `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          window.location.href
        )}`
      );
    } else if (btn.querySelector(".fa-link")) {
      navigator.clipboard.writeText(window.location.href);
      btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-link"></i> Copy';
      }, 2000);
    }
  });
});

// View Counter
// Tracks page views using localStorage
let views = parseInt(localStorage.getItem("pageViews") || "0");
views++;
localStorage.setItem("pageViews", views.toString());
document.getElementById("viewCount").textContent = views;

// Dropdown Menu System
// Handles the expandable "More Links" section
const dropdownToggle = document.getElementById("dropdown-toggle");
const dropdownContent = document.querySelector(".dropdown-content");

dropdownToggle.addEventListener("click", (e) => {
  e.preventDefault();
  dropdownContent.classList.toggle("active");
});

// Close dropdown when clicking outside
document.addEventListener("click", (e) => {
  if (!e.target.closest(".dropdown")) {
    dropdownContent.classList.remove("active");
  }
});

// Particle.js Configuration
// Sets up the background particle system with dark theme colors
particlesJS("particles-js", {
  particles: {
    number: { value: 60 }, // Increased number of particles for more "lightning" connections
    color: { value: "#b96900" }, // Fixed dark theme color
    shape: { type: "circle" },
    opacity: {
      value: 0.6,
      random: true,
    },
    size: {
      value: 3,
      random: true,
    },
    line_linked: {
      enable: true,
      distance: 200,
      color: "#b96900", // Fixed dark theme color
      opacity: 0.7,
      width: 2,
    },
    move: {
      enable: true,
      speed: 0.8, // Reduced speed
      direction: "none",
      random: false,
      straight: false,
      outMode: "out",
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "grab",
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 140,
        line_linked: {
          opacity: 1.0,
        },
      },
    },
  },
});

// Music Player System
// Handles music playback controls and track management
const songs = [
  { title: "Song 1", url: "url-to-song-1" },
  { title: "Song 2", url: "url-to-song-2" },
  { title: "Song 3", url: "url-to-song-3" },
];
let currentSong = 0;
let isPlaying = false;

const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const songTitle = document.getElementById("song-title");

playBtn.addEventListener("click", () => {
  isPlaying = !isPlaying;
  playBtn.innerHTML = isPlaying
    ? '<i class="fas fa-pause"></i>'
    : '<i class="fas fa-play"></i>';
  songTitle.textContent = songs[currentSong].title;
});

prevBtn.addEventListener("click", () => {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  songTitle.textContent = songs[currentSong].title;
});

nextBtn.addEventListener("click", () => {
  currentSong = (currentSong + 1) % songs.length;
  songTitle.textContent = songs[currentSong].title;
});

// Link Click Animation
// Creates ripple effect when clicking links
document.querySelectorAll(".link-card").forEach((link) => {
  link.addEventListener("click", (e) => {
    const circle = document.createElement("div");
    circle.classList.add("link-click");
    circle.style.left = e.offsetX + "px";
    circle.style.top = e.offsetY + "px";
    link.appendChild(circle);
    setTimeout(() => circle.remove(), 500);
  });
});

// Typing Animation
// Creates typewriter effect for bio text
const bio = document.querySelector(".profile p");
const text = bio.textContent;
bio.innerHTML = "";
bio.classList.add("typing-text");

let i = 0;
const typeDelay = 50; // Faster typing speed

function typeWriter() {
  if (i < text.length) {
    requestAnimationFrame(() => {
      bio.innerHTML += text.charAt(i);
      i++;
      setTimeout(typeWriter, typeDelay);
    });
  } else {
    bio.classList.add("typing-done");
  }
}

setTimeout(typeWriter, 1000);

// Disabled Link Handler
// Prevents interaction with disabled links
document.querySelectorAll(".link-card.disabled").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
  });
});

//-------------------------------------------------------------------------

// Image Loading Handler
// Handles profile image loading errors with fallback
function handleImageError(img) {
  console.warn('Primary image failed to load, trying fallback...');
  
  // First fallback - try a more reliable placeholder service
  if (!img.dataset.fallbackAttempted) {
    img.dataset.fallbackAttempted = 'true';
    img.src = 'https://raw.githubusercontent.com/gabbisceglie/gabriele_page/refs/heads/main/images/images.png';
    return;
  }

  
  // Second fallback - create a CSS-based avatar
  if (!img.dataset.cssAvatarCreated) {
    img.dataset.cssAvatarCreated = 'true';
    img.style.display = 'none';
    
    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'css-avatar';
    avatarDiv.textContent = 'GB';
    img.parentNode.insertBefore(avatarDiv, img.nextSibling);
  }
}

// Retry image loading periodically
function retryImageLoading() {
  const img = document.getElementById('profile-img');
  if (img && img.style.display === 'none') {
    // Try to reload original image every 30 seconds
    const originalSrc = img.getAttribute('src');
    if (originalSrc.includes('discordapp')) {
      // Add timestamp to bypass cache
      const separator = originalSrc.includes('?') ? '&' : '?';
      img.src = originalSrc + separator + 't=' + Date.now();
    }
  }
}

// Retry every 30 seconds
setInterval(retryImageLoading, 30000);

