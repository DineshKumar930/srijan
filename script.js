//Home Page JS

document.addEventListener('DOMContentLoaded', function() {
    // Sample data - in a real app, you would fetch this from an API
    const enrollmentData = {
        "Freshmen": 120,
        "Sophomores": 95,
        "Juniors": 80,
        "Seniors": 110,
        "Graduate Students": 65
    };

    // Calculate total students
    const totalStudents = Object.values(enrollmentData).reduce((sum, count) => sum + count, 0);
    document.getElementById('totalStudents').textContent = totalStudents;

    // Prepare data for Chart.js
    const labels = Object.keys(enrollmentData);
    const data = Object.values(enrollmentData);
    const backgroundColors = [
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 99, 132, 0.7)',
        'rgba(75, 192, 192, 0.7)',
        'rgba(255, 159, 64, 0.7)',
        'rgba(153, 102, 255, 0.7)'
    ];
    const borderColors = [
        'rgba(54, 162, 235, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(153, 102, 255, 1)'
    ];

    // Create the chart
    const ctx = document.getElementById('enrollmentChart').getContext('2d');
    const enrollmentChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false // We'll use custom legend
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.raw || 0;
                            const percentage = Math.round((value / totalStudents) * 100);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });

    // Create custom legend
    const legendContainer = document.getElementById('legend');
    labels.forEach((label, index) => {
        const legendItem = document.createElement('div');
        legendItem.className = 'legend-item';
        
        const colorBox = document.createElement('span');
        colorBox.className = 'legend-color';
        colorBox.style.backgroundColor = backgroundColors[index];
        
        const text = document.createTextNode(`${label}: ${data[index]} students`);
        
        legendItem.appendChild(colorBox);
        legendItem.appendChild(text);
        legendContainer.appendChild(legendItem);
    });
});
	
	
	
	
	
	  // Disable right-click
    document.addEventListener("contextmenu", function(e) {
      e.preventDefault();
    });

    // Disable F12, Ctrl+Shift+I, Ctrl+U, Ctrl+S
    document.addEventListener("keydown", function(e) {
      // F12
      if (e.key === "F12") {
        e.preventDefault();
      }
      // Ctrl+Shift+I
      if (e.ctrlKey && e.shiftKey && e.key === "I") {
        e.preventDefault();
      }
      // Ctrl+U
      if (e.ctrlKey && e.key === "u") {
        e.preventDefault();
      }
      // Ctrl+S
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
      }
    });
	
	
	// Gallery Animation on Scroll
        document.addEventListener('DOMContentLoaded', function() {
            const galleryItems = document.querySelectorAll('.gallery-item');
            
            // Function to check if element is in viewport
            function isInViewport(element) {
                const rect = element.getBoundingClientRect();
                return (
                    rect.top >= 0 &&
                    rect.left >= 0 &&
                    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
                );
            }
            
            // Function to handle scroll event
            function handleScroll() {
                galleryItems.forEach(item => {
                    if (isInViewport(item)) {
                        item.classList.add('visible');
                    }
                });
            }
            
            // Initial check
            handleScroll();
            
            // Listen for scroll events
            window.addEventListener('scroll', handleScroll);
            
            // Lightbox functionality
            const lightbox = document.getElementById('lightbox');
            const lightboxImg = document.getElementById('lightbox-img');
            const lightboxCaption = document.getElementById('lightbox-caption');
            const closeBtn = document.querySelector('.close-btn');
            const prevBtn = document.querySelector('.prev-btn');
            const nextBtn = document.querySelector('.next-btn');
            
            // Gallery items data
            const galleryData = [
                {
                    img: "images/1.jpeg",
                    caption: "Classroom Sessions - Students engaged in interactive learning activities"
                },
                {
                    img: "images/chess.jpg",
                    caption: "Annual Sports Day - Celebrating teamwork and physical fitness"
                },
                {
                    img: "images/emp.jpg",
                    caption: "Volunteer Teachers - Our dedicated volunteers making a difference"
                },
                {
                    img: "images/group.jpg",
                    caption: "Group Learning - Students collaborating on projects"
                },
                {
                    img: "images/free.jpg",
                    caption: "Free Education to poorer stduent to achive their goel"
                },
                {
                    img: "images/comp.jpg",
                    caption: "To support and encourage the talents of underprivileged students"
                },
                {
                    img: "images/aman.jpg",
                    caption: "International Chess Player"
                },
                {
                    img: "images/cult.jpg",
                    caption: "Cultural Events - Celebrating India's rich heritage"
                }
            ];
            
            let currentIndex = 0;
            
            // Open lightbox
            document.querySelectorAll('.gallery-item').forEach((item, index) => {
                item.addEventListener('click', () => {
                    currentIndex = index;
                    updateLightbox();
                    lightbox.classList.add('active');
                    document.body.style.overflow = 'hidden';
                });
            });
            
            // Close lightbox
            closeBtn.addEventListener('click', () => {
                lightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
            
            // Navigation
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
                updateLightbox();
            });
            
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % galleryData.length;
                updateLightbox();
            });
            
            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (!lightbox.classList.contains('active')) return;
                
                if (e.key === 'Escape') {
                    lightbox.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
                if (e.key === 'ArrowLeft') {
                    currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
                    updateLightbox();
                }
                if (e.key === 'ArrowRight') {
                    currentIndex = (currentIndex + 1) % galleryData.length;
                    updateLightbox();
                }
            });
            
            // Update lightbox content
            function updateLightbox() {
                lightboxImg.src = galleryData[currentIndex].img;
                lightboxCaption.textContent = galleryData[currentIndex].caption;
            }
        });


        // Mobile menu toggle
        const menuToggle = document.getElementById('menuToggle');
        const mainNav = document.getElementById('mainNav');
        
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });
        
        // Close menu when clicking on a link (for mobile)
        document.querySelectorAll('#mainNav a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    mainNav.classList.remove('active');
                }
            });
        });
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
        
        // Make header responsive on window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                mainNav.classList.remove('active');
            }
        });
                // NEW: Scroll animation functionality
        document.addEventListener('DOMContentLoaded', function() {
            // Add animation classes to all sections and important elements
            const sections = document.querySelectorAll('section, .hero, .section-title, .mission-content, .expect-card, .volunteer-card, .donation-card, .testimonial, .event-card, footer');
            
            sections.forEach((section, index) => {
                // Add animation class with staggered delay
                section.classList.add('animate-on-scroll', `delay-${index % 6}`);
            });
            
            // Function to check if element is in viewport
            function isInViewport(element) {
                const rect = element.getBoundingClientRect();
                return (
                    rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.75 &&
                    rect.bottom >= 0
                );
            }
            
            // Function to run on scroll
            function runOnScroll() {
                document.querySelectorAll('.animate-on-scroll').forEach(element => {
                    if (isInViewport(element)) {
                        element.classList.add('visible');
                    } else {
                        // Optional: Remove 'visible' class when scrolled past (for re-animating)
                        // element.classList.remove('visible');
                    }
                });
            }
            
            // Initial check in case elements are already visible
            runOnScroll();
            
            // Add scroll event listener
            window.addEventListener('scroll', runOnScroll);
        });

        
        // Animate bars on scroll
        window.addEventListener('scroll', () => {
            const bars = document.querySelectorAll('.bar');
            const impactSection = document.querySelector('.impact');
            const sectionPosition = impactSection.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (sectionPosition < screenPosition) {
                bars.forEach(bar => {
                    bar.style.width = bar.style.width; // This triggers the CSS transition
                });
            }
        });


// Modal elements
const modal = document.getElementById("qrModal");
const closeBtn = document.querySelector(".close-modal");
const donateBtns = document.querySelectorAll(".donate-btn");
let selectedBaseAmount = 0;

// Open modal and set base amount
donateBtns.forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    selectedBaseAmount = parseInt(btn.getAttribute("data-amount"));
    modal.style.display = "block";
    updateQR(); // Initialize QR with default quantity (1)
  });
});

// Close modal
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Update QR when quantity changes
document.getElementById("quantity").addEventListener("input", updateQR);

function updateQR() {
  const quantity = parseInt(document.getElementById("quantity").value) || 1; // Default to 1
  const totalAmount = selectedBaseAmount * quantity;
  document.getElementById("modalAmount").textContent = totalAmount;

  // Generate UPI link
  const upiId = "7317783161@airtel"; // 👈 Replace with your UPI ID
    const recipientName = "The Learning Hub";
  const gpayUrl = `upi://pay?pa=${upiId}&pn=RecipientName&am=${totalAmount}&cu=INR`;

  // Generate QR code locally (no API dependency)
  QRCode.toDataURL(gpayUrl, { width: 200 }, (err, qrUrl) => {
    if (err) {
      console.error("QR generation failed:", err);
      return;
    }
    document.getElementById("dynamicQrCode").src = qrUrl;
  });
}
		


//About Page JS 

