// script.js
document.addEventListener('DOMContentLoaded', () => {
    const btnNo = document.getElementById('btn-no');
    const btnYes = document.getElementById('btn-yes');
    const page1 = document.getElementById('page1');
    const page2 = document.getElementById('page2');

    // Prevent default clicking on NO button
    btnNo.addEventListener('click', (e) => {
        e.preventDefault();
        moveNoBtn();
    });

    btnNo.addEventListener('mouseover', () => {
        moveNoBtn();
    });

    // Mobile touch
    btnNo.addEventListener('touchstart', (e) => {
        e.preventDefault();
        moveNoBtn();
    });

    function moveNoBtn() {
        if (btnNo.style.position !== 'fixed') {
            btnNo.style.position = 'fixed';
            btnNo.style.zIndex = '9999';
            // We append the button to the body so it escapes the 'overflow: hidden' of the glass container.
            document.body.appendChild(btnNo);
        }

        const padding = 20;
        const container = page1; // move relative to the page or window

        const maxX = window.innerWidth - btnNo.offsetWidth - padding;
        const maxY = window.innerHeight - btnNo.offsetHeight - padding;

        let randomX, randomY;
        let isClose = true;
        let attempts = 0;

        const currentX = btnNo.getBoundingClientRect().left;
        const currentY = btnNo.getBoundingClientRect().top;

        while (isClose && attempts < 15) {
            randomX = Math.max(padding, Math.floor(Math.random() * maxX));
            randomY = Math.max(padding, Math.floor(Math.random() * maxY));

            const dist = Math.sqrt(Math.pow(randomX - currentX, 2) + Math.pow(randomY - currentY, 2));
            if (dist > 150) {
                isClose = false;
            }
            attempts++;
        }

        // Ensure values are within viewport limits (handling edge cases)
        randomX = Math.max(0, Math.min(randomX, window.innerWidth - btnNo.offsetWidth));
        randomY = Math.max(0, Math.min(randomY, window.innerHeight - btnNo.offsetHeight));

        btnNo.style.left = `${randomX}px`;
        btnNo.style.top = `${randomY}px`;

        const randomRot = Math.floor(Math.random() * 30) - 15;
        btnNo.style.transform = `rotate(${randomRot}deg) scale(1.1)`;
    }

    // YES Button Actions
    btnYes.addEventListener('click', () => {
        page1.classList.remove('active');
        page1.classList.add('hidden');
        btnNo.style.opacity = '0';
        btnNo.style.pointerEvents = 'none';

        setTimeout(() => {
            page1.style.display = 'none';
            btnNo.style.display = 'none';
            page2.classList.remove('hidden');
            page2.classList.add('active');
            fireConfetti();
        }, 800);
    });

    // Custom confetti
    function fireConfetti() {
        const colors = ['#ffd1dc', '#ff9999', '#c471ed', '#ffffff', '#ce93d8', '#ffb7c5'];
        const duration = 5000;
        const end = Date.now() + duration;

        (function frame() {
            createParticles(colors);
            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    }

    function createParticles(colors) {
        const count = Math.floor(Math.random() * 2) + 1;

        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            document.body.appendChild(particle);

            const size = Math.random() * 12 + 6;
            const bg = colors[Math.floor(Math.random() * colors.length)];

            if (Math.random() > 0.7) {
                particle.innerHTML = Math.random() > 0.5 ? '❤️' : '💜';
                particle.style.background = 'transparent';
                particle.style.fontSize = `${size}px`;
                particle.style.width = 'auto';
                particle.style.height = 'auto';
            } else {
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.background = bg;
                particle.style.boxShadow = `0 0 ${size / 2}px ${bg}`;
            }

            const startX = Math.random() * window.innerWidth;
            particle.style.left = `${startX}px`;
            particle.style.top = `-20px`;

            const speed = Math.random() * 3 + 2;
            const endY = window.innerHeight + 50;

            const anim = particle.animate([
                { transform: `translate3d(0, 0, 0) rotate(0deg)`, opacity: 1 },
                { transform: `translate3d(${Math.random() * 200 - 100}px, ${endY}px, 0) rotate(${Math.random() * 720}deg)`, opacity: 0 }
            ], {
                duration: speed * 1000,
                easing: 'cubic-bezier(.37,0,.63,1)',
                fill: 'forwards'
            });

            anim.onfinish = () => particle.remove();
        }
    }
});
