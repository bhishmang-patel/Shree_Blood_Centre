
// Mobile Navigation
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const navbar = document.getElementById('navbar');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll animations
function checkScroll() {
    const elements = document.querySelectorAll('.fade-in');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', checkScroll);
window.addEventListener('load', checkScroll);

// Scroll animations
function checkScroll() {
    const elements = document.querySelectorAll('.fade-in');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.classList.add('visible');
        }
    });
}

// Add floating animation to blood drop on scroll
window.addEventListener('scroll', function() {
    const bloodDrop = document.querySelector('.blood-drop');
    if (bloodDrop) {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        bloodDrop.style.transform = `translateY(${parallax}px) rotate(${parallax * 0.1}deg)`;
    }
});

// Add typing effect to hero title
function typeWriter() {
const heroTitle = document.querySelector('.hero-title');
const text = 'Donate Blood, Save Lives';
let index = 0;

heroTitle.innerHTML = '';

function type() {
    if (index < text.length) {
        if (text.charAt(index) === '\n') {
            heroTitle.innerHTML += '<br>';
        } else {
            heroTitle.innerHTML += text.charAt(index);
        }
        index++;
        setTimeout(type, 100);
    }
}

// Start typing after initial animation
setTimeout(type, 1500);
}
// Reusable typing effect function
function typeWriter(selector, text, delay) {
const element = document.querySelector(selector);
let index = 0;
element.innerHTML = '';

function type() {
    if (index < text.length) {
        if (text.charAt(index) === '\n') {
            element.innerHTML += '<br>';
        } else {
            element.innerHTML += text.charAt(index);
        }
        index++;
        setTimeout(type, 100); // typing speed
    }
}

setTimeout(type, delay);
}

// Run both animations at the same time
typeWriter('.welcome-title', 'Welcome to Shree', 500);
typeWriter('.hero-title', 'Donate Blood, Save Lives', 500);



window.addEventListener('scroll', checkScroll);
window.addEventListener('load', checkScroll);

// Counter animation for statistics
function animateCounters() {
const counters = document.querySelectorAll('.stat-number');

counters.forEach(counter => {
    const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
    let current = 0;
    const increment = target / 100;
    const suffix = counter.textContent.replace(/[\d,]/g, '');
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            counter.textContent = target.toLocaleString() + suffix;
            clearInterval(timer);
        } else {
            counter.textContent = Math.floor(current).toLocaleString() + suffix;
        }
    }, 20);
});
}

// Trigger counter animation when statistics section is visible
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statsObserver.observe(statsSection);
}

// Set current date for donation date field
    function setCurrentDate() {
      const dateField = document.getElementById('date');
      if (dateField) {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        dateField.value = formattedDate;
      }
    }

    // Call function when page finishes loading
    window.onload = setCurrentDate;

    // Format date before sending
    function formatDate(inputDate) {
        if (!inputDate) return "";
        const [year, month, day] = inputDate.split("-");
        return `${day}-${month}-${year}`;
    }


// Form submission
const donationForm = document.getElementById('donationForm');
if (donationForm) {
    donationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const donorData = {
            fullName: formData.get('fullName'),
            date: formatDate(formData.get('date')),
            age: formData.get('age'),   
            bloodType: formData.get('bloodType'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            address: formData.get('address'),
            lastDonation: formatDate(formData.get('lastDonation')),
            scheduleDonation: formatDate(formData.get('scheduleDonation')),
            donationTime: formData.get('donationTime')
        };
        
        // Show loading state
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        submitBtn.disabled = true;
        
        emailjs.send("service_irc9zh8", "template_oyfp7eb", donorData)
        .then(function(response) {
            console.log("SUCCESS!", response.status, response.text);

            submitBtn.innerHTML = '<i class="fas fa-check"></i> Registration Successful!';
            submitBtn.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';

            const successMessage = document.createElement('div');
            successMessage.innerHTML = '✅ Thank you for registering! See you at our centre.';
            successMessage.style.background = '#d4edda';
            successMessage.style.color = '#155724';
            successMessage.style.padding = '1rem';
            successMessage.style.borderRadius = '10px';
            successMessage.style.marginTop = '1rem';
            successMessage.style.border = '1px solid #c3e6cb';
            successMessage.style.textAlign = 'center';

            donationForm.appendChild(successMessage);

            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = 'linear-gradient(135deg, #dc267f, #ff4757)';
                submitBtn.disabled = false;
                donationForm.reset();
                successMessage.remove();
            }, 4000);
        }, function(error) {
            console.error("FAILED...", error);
            alert("❌ Failed to send email. Please try again later.");
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
    });
}

// Emergency button functionality
const emergencyBtn = document.querySelector('.emergency-btn');
if (emergencyBtn) {
    emergencyBtn.addEventListener('click', function() {
        window.location.href = 'tel:+918780323877';
    });
}

// Make statistics section responsive
function adjustStatisticsLayout() {
    const statisticsContainer = document.querySelector('.statistics-section > div > div');
    if (window.innerWidth <= 768 && statisticsContainer) {
        statisticsContainer.style.flexDirection = 'column';
        statisticsContainer.style.gap = '2rem';
        
        const statItems = statisticsContainer.querySelectorAll('.stat-number');
        statItems.forEach(item => {
            item.style.marginBottom = '1.5rem';
        });
    }
}

// Initialize on load and resize
window.addEventListener('load', function() {
    adjustStatisticsLayout();
    setCurrentDate();
});
window.addEventListener('resize', adjustStatisticsLayout);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});


var nextBtn = document.querySelector('.next'),
    prevBtn = document.querySelector('.prev'),
    carousel = document.querySelector('.carousel'),
    list = document.querySelector('.list'), 
    item = document.querySelectorAll('.item'),
    runningTime = document.querySelector('.carousel .timeRunning') 

let timeRunning = 3000 
let timeAutoNext = 7000

nextBtn.onclick = function(){
    showSlider('next')
}

prevBtn.onclick = function(){
    showSlider('prev')
}

let runTimeOut 

let runNextAuto = setTimeout(() => {
    nextBtn.click()
}, timeAutoNext)


function resetTimeAnimation() {
    runningTime.style.animation = 'none'
    runningTime.offsetHeight /* trigger reflow */
    runningTime.style.animation = null 
    runningTime.style.animation = 'runningTime 7s linear 1 forwards'
}


function showSlider(type) {
    let sliderItemsDom = list.querySelectorAll('.carousel .list .item')
    if(type === 'next'){
        list.appendChild(sliderItemsDom[0])
        carousel.classList.add('next')
    } else{
        list.prepend(sliderItemsDom[sliderItemsDom.length - 1])
        carousel.classList.add('prev')
    }

    clearTimeout(runTimeOut)

    runTimeOut = setTimeout( () => {
        carousel.classList.remove('next')
        carousel.classList.remove('prev')
    }, timeRunning)


    clearTimeout(runNextAuto)
    runNextAuto = setTimeout(() => {
        nextBtn.click()
    }, timeAutoNext)

    resetTimeAnimation() // Reset the running time animation
}


  
