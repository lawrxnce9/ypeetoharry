// Passcode Check
function checkPasscode() {
    const input = document.getElementById('passcode-input');
    const error = document.getElementById('error-message');
    const correctCode = '5555';
    
    if (input.value === correctCode) {
        error.textContent = '';
        showPage('message-page');
    } else {
        error.textContent = '❌ Wrong code! Try again...';
        input.value = '';
        input.classList.add('shake');
        setTimeout(() => input.classList.remove('shake'), 500);
    }
}

// Allow Enter key for passcode
document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('passcode-input');
    if (input) {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                checkPasscode();
            }
        });
    }
    
    // Setup No button escape behavior
    const noBtn = document.getElementById('no-btn');
    if (noBtn) {
        noBtn.addEventListener('mouseover', moveNoButton);
        noBtn.addEventListener('click', moveNoButton);
    }
});

// Page Navigation
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

function showGallery() {
    showPage('gallery-page');
}

function showQuestion() {
    showPage('question-page');
}

function sayYes() {
    showPage('celebration-page');
    createConfetti();
}

// Make No Button Move Away
function moveNoButton(e) {
    e.preventDefault();
    const btn = document.getElementById('no-btn');
    const container = document.querySelector('.button-container');
    
    const containerRect = container.getBoundingClientRect();
    const maxX = containerRect.width - btn.offsetWidth;
    const maxY = containerRect.height - btn.offsetHeight;
    
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    
    btn.style.position = 'absolute';
    btn.style.left = randomX + 'px';
    btn.style.top = randomY + 'px';
    btn.style.transform = 'scale(0.9)';
    
    setTimeout(() => {
        btn.style.transform = 'scale(1)';
    }, 100);
}

// Confetti Effect
function createConfetti() {
    const colors = ['#ff6b9d', '#e63946', '#f67280', '#c06c84', '#ff8fab'];
    const emojis = ['💕', '💖', '❤️', '💗', '💝', '💘', '💓', '💞'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-50px';
            confetti.style.fontSize = '30px';
            confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            confetti.style.zIndex = '1000';
            confetti.style.pointerEvents = 'none';
            
            document.body.appendChild(confetti);
            
            const fallDuration = 3 + Math.random() * 2;
            const drift = (Math.random() - 0.5) * 200;
            
            confetti.animate([
                { transform: 'translateY(0) translateX(0) rotate(0deg)', opacity: 1 },
                { transform: `translateY(100vh) translateX(${drift}px) rotate(${360 * Math.random()}deg)`, opacity: 0 }
            ], {
                duration: fallDuration * 1000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            });
            
            setTimeout(() => confetti.remove(), fallDuration * 1000);
        }, i * 100);
    }
}

// Add shake animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
    .shake {
        animation: shake 0.5s;
    }
`;
document.head.appendChild(style);