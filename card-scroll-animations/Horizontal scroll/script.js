// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Section 1: Horizontal Scroll Animation
const initHorizontalScroll = () => {
    const horizontalSection = document.querySelector('.horizontal-section');
    const cardTrack = document.querySelector('.card-track');

    if (horizontalSection && cardTrack) {
        const cards = cardTrack.querySelectorAll('.card');
        
        // Calculate total width of all cards plus gaps
        const cardWidth = 400; // min-width from CSS
        const gap = 32; // 2rem = 32px
        const totalWidth = (cardWidth * cards.length) + (gap * (cards.length - 1));
        const viewportWidth = window.innerWidth;
        
        // Distance to scroll
        const scrollDistance = totalWidth - viewportWidth + 100; // +100 for padding
        
        gsap.to(cardTrack, {
            x: -scrollDistance,
            ease: "none",
            scrollTrigger: {
                trigger: horizontalSection,
                start: "top top",
                end: () => `+=${scrollDistance * 1.5}`,
                scrub: 1,
                pin: true,
                anticipatePin: 1,
                invalidateOnRefresh: true
            }
        });
    }
};

// Smooth scroll to sections
const initNavigation = () => {
    const links = document.querySelectorAll('.nav-links a');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                gsap.to(window, {
                    duration: 1.5,
                    scrollTo: {
                        y: target,
                        offsetY: 80
                    },
                    ease: "power3.inOut"
                });
            }
        });
    });
};

// Initialize everything when DOM is loaded
const init = () => {
    initHorizontalScroll();
    initFocusScroll();
    initNavigation();
    
    // Refresh ScrollTrigger on resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 250);
    });
};

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}