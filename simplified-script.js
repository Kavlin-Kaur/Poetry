// Simplified JavaScript - No Backend Required
document.addEventListener('DOMContentLoaded', function() {
    const poemsContainer = document.getElementById('poemsContainer');
    const searchInput = document.getElementById('searchInput');
    const modal = document.getElementById('poemModal');
    const modalContent = document.getElementById('modalContent');
    const closeBtn = document.querySelector('.close');
    const contactBtn = document.querySelector('.contact-btn');
    const contactTextarea = document.querySelector('.contact-textarea');

    // Display all poems initially
    displayPoems(poems);

    // Search functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const filteredPoems = poems.filter(poem => 
            poem.title.toLowerCase().includes(searchTerm) ||
            poem.content.toLowerCase().includes(searchTerm)
        );
        displayPoems(filteredPoems);
    });

    // Display poems function
    function displayPoems(poemsToShow) {
        poemsContainer.innerHTML = '';
        
        if (poemsToShow.length === 0) {
            poemsContainer.innerHTML = '<div class="no-results">No poems found matching your search.</div>';
            return;
        }

        poemsToShow.forEach((poem, index) => {
            const firstLine = poem.content.split('\n')[0];
            const previewText = firstLine.length > 60 ? firstLine.substring(0, 60) + '...' : firstLine + '...';
            
            const poemCard = document.createElement('div');
            poemCard.className = 'poem-card';
            poemCard.style.animationDelay = `${index * 0.1}s`;
            
            poemCard.innerHTML = `
                <h3>${poem.title}</h3>
                <p class="poem-preview">${previewText}</p>
                <a href="#" class="read-more" data-slug="${poem.slug}">
                    Read poem →
                </a>
            `;
            
            // Add click event to show poem in modal
            poemCard.addEventListener('click', function(e) {
                e.preventDefault();
                showPoemModal(poem);
            });
            
            poemsContainer.appendChild(poemCard);
        });
    }

    // Show poem in modal
    function showPoemModal(poem) {
        modalContent.innerHTML = `
            <h2>${poem.title}</h2>
            <div class="poem-text">${poem.content}</div>
        `;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    // Close modal
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Contact form functionality
    if (contactBtn && contactTextarea) {
        contactBtn.addEventListener('click', function() {
            const message = contactTextarea.value.trim();
            
            if (message === '') {
                alert('Please enter a message before sending.');
                return;
            }
            
            // Simulate sending message
            contactBtn.textContent = 'Sending...';
            contactBtn.disabled = true;
            
            setTimeout(() => {
                alert('Thank you for your message! I\'ll get back to you soon.');
                contactTextarea.value = '';
                contactBtn.textContent = 'Send Message';
                contactBtn.disabled = false;
            }, 1500);
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Active navigation highlighting
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Add animation to stats
    const stats = document.querySelectorAll('.stat');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };

    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            }
        });
    }, observerOptions);

    stats.forEach(stat => {
        statsObserver.observe(stat);
    });

    // Add hover effects to social links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px) scale(1.02)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
        });
    });

    // Add typing effect to hero subtitle
    const subtitle = document.querySelector('.subtitle');
    if (subtitle) {
        const text = subtitle.textContent;
        subtitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                subtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 1000);
    }
}); 