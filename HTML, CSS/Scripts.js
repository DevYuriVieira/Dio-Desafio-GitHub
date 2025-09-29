document.addEventListener('DOMContentLoaded', function() {

    // --- FUNCIONALIDADE 1: FADE-IN DE ELEMENTOS ---
    const faders = document.querySelectorAll('.fade-in');
    if (faders.length > 0) {
        const appearOptions = { threshold: 0.2 };
        const appearOnScroll = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            });
        }, appearOptions);
        faders.forEach(fader => appearOnScroll.observe(fader));
    }

    // --- FUNCIONALIDADE 2: TOOLTIPS (DICAS) ---
    const tooltips = document.querySelectorAll('.tooltip');
    if (tooltips.length > 0) {
        let tooltipElement = null;
        tooltips.forEach(tooltip => {
            tooltip.addEventListener('mouseenter', function() {
                const text = this.getAttribute('data-text');
                tooltipElement = document.createElement('div');
                tooltipElement.className = 'tooltip-box';
                tooltipElement.textContent = text;
                document.body.appendChild(tooltipElement);
                const rect = this.getBoundingClientRect();
                tooltipElement.style.left = `${rect.left + window.scrollX + (rect.width / 2) - (tooltipElement.offsetWidth / 2)}px`;
                tooltipElement.style.top = `${rect.top + window.scrollY - tooltipElement.offsetHeight - 10}px`;
                tooltipElement.style.opacity = '1';
            });
            tooltip.addEventListener('mouseleave', function() {
                if (tooltipElement) {
                    tooltipElement.remove();
                    tooltipElement = null;
                }
            });
        });
    }

    // --- FUNCIONALIDADE 3: CONTROLE DE MÚSICA ---
    const music = document.getElementById('bg-music');
    const musicButton = document.getElementById('music-toggle');
    if (music && musicButton) {
        music.volume = 0.1;
        musicButton.addEventListener('click', function() {
            if (music.paused) {
                music.play().catch(e => console.log("A reprodução foi bloqueada. O usuário precisa interagir."));
                this.textContent = '⏸️';
            } else {
                music.pause();
                this.textContent = '▶️';
            }
        });
    }

    // --- FUNCIONALIDADE 4: VALIDAÇÃO DE SENHA (PÁGINA DE CADASTRO) ---
    const form = document.querySelector('form');
    const senha = document.getElementById('senha');
    const confirmaSenha = document.getElementById('confirma-senha');
    if (form && senha && confirmaSenha) {
        form.addEventListener('submit', function(event) {
            if (senha.value !== confirmaSenha.value) {
                alert('As senhas não coincidem. Por favor, tente novamente.');
                event.preventDefault();
                
            }
        });
    }
});