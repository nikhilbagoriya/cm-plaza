// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Property Listings
const properties = [
    {
        id: 1,
        title: 'Luxury Office Space',
        type: 'commercial',
        size: '2,500 sq ft',
        price: '$5,000/month',
        features: ['24/7 Access', 'Meeting Rooms', 'High-speed Internet'],
        image: imageUrls.office1
    },
    {
        id: 2,
        title: 'Modern Apartment',
        type: 'residential',
        size: '1,200 sq ft',
        price: '$2,500/month',
        features: ['2 Bedrooms', '2 Bathrooms', 'Parking'],
        image: imageUrls.apartment1
    },
    {
        id: 3,
        title: 'Retail Space',
        type: 'commercial',
        size: '1,800 sq ft',
        price: '$3,500/month',
        features: ['High Foot Traffic', 'Storage Room', 'Display Windows'],
        image: imageUrls.retail1
    }
];

// Gallery Images
const galleryImages = imageUrls.gallery.map((url, index) => {
    const categories = ['exterior', 'interior', 'interior', 'amenities', 'exterior', 'amenities'];
    const alts = ['Building Exterior', 'Office Interior', 'Apartment Living Room', 'Building Amenities', 'Retail Space', 'Building Lobby'];
    return { 
        src: url, 
        alt: alts[index],
        category: categories[index]
    };
});

// Initialize page-specific functionality
document.addEventListener('DOMContentLoaded', () => {
    // Set hero background on home page
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${imageUrls.hero}')`;
        hero.style.backgroundSize = 'cover';
        hero.style.backgroundPosition = 'center';
        hero.style.backgroundRepeat = 'no-repeat';
    }

    // Initialize properties page
    const propertiesGrid = document.querySelector('.properties-grid');
    if (propertiesGrid) {
        initializeProperties();
    }

    // Initialize gallery page
    const galleryGrid = document.querySelector('.gallery-grid');
    if (galleryGrid) {
        initializeGallery();
    }

    // Initialize contact form
    const inquiryForm = document.getElementById('inquiryForm');
    if (inquiryForm) {
        initializeContactForm();
    }
});

// Properties Page Functions
function initializeProperties() {
    const propertiesGrid = document.querySelector('.properties-grid');
    const filterButtons = document.querySelectorAll('.property-filters .filter-btn');
    
    // Get type from URL if any
    const urlParams = new URLSearchParams(window.location.search);
    const typeFilter = urlParams.get('type');
    
    // Filter properties based on URL parameter
    if (typeFilter) {
        filterProperties(typeFilter);
        // Update active filter button
        filterButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === typeFilter);
        });
    } else {
        populateProperties(properties);
    }

    // Add filter button listeners
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterProperties(button.dataset.filter);
        });
    });
}

function filterProperties(type) {
    const filtered = type === 'all' ? 
        properties : 
        properties.filter(property => property.type === type);
    populateProperties(filtered);
}

function populateProperties(propertiesToShow) {
    const propertiesGrid = document.querySelector('.properties-grid');
    propertiesGrid.innerHTML = propertiesToShow.map(property => createPropertyCard(property)).join('');
}

function createPropertyCard(property) {
    return `
        <div class="property-card">
            <div class="property-image">
                <img src="${property.image}" alt="${property.title}">
            </div>
            <div class="property-info">
                <h3>${property.title}</h3>
                <p><strong>Type:</strong> ${property.type.charAt(0).toUpperCase() + property.type.slice(1)}</p>
                <p><strong>Size:</strong> ${property.size}</p>
                <p><strong>Price:</strong> ${property.price}</p>
                <div class="property-features">
                    ${property.features.map(feature => `
                        <span class="feature">
                            <i class="fas fa-check"></i>
                            ${feature}
                        </span>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

// Gallery Page Functions
function initializeGallery() {
    const galleryGrid = document.querySelector('.gallery-grid');
    const filterButtons = document.querySelectorAll('.gallery-filters .filter-btn');
    
    populateGallery(galleryImages);
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterGallery(button.dataset.filter);
        });
    });

    // Initialize lightbox
    initializeLightbox();
}

function filterGallery(category) {
    const filtered = category === 'all' ? 
        galleryImages : 
        galleryImages.filter(image => image.category === category);
    populateGallery(filtered);
}

function populateGallery(imagesToShow) {
    const galleryGrid = document.querySelector('.gallery-grid');
    galleryGrid.innerHTML = imagesToShow.map(image => `
        <div class="gallery-item" data-category="${image.category}">
            <img src="${image.src}" alt="${image.alt}">
        </div>
    `).join('');

    // Reattach lightbox listeners
    attachLightboxListeners();
}

// Lightbox Functions
function initializeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    const closeLightbox = lightbox.querySelector('.close-lightbox');
    const prevBtn = lightbox.querySelector('.prev-btn');
    const nextBtn = lightbox.querySelector('.next-btn');

    closeLightbox.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);

    attachLightboxListeners();
}

function attachLightboxListeners() {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    galleryItems.forEach(img => {
        img.addEventListener('click', () => {
            showLightbox(img.src, img.alt);
        });
    });
}

let currentImageIndex = 0;
function showLightbox(src, alt) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    
    currentImageIndex = galleryImages.findIndex(img => img.src === src);
    
    lightboxImage.src = src;
    lightboxImage.alt = alt;
    lightbox.classList.add('active');
}

function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    const image = galleryImages[currentImageIndex];
    showLightbox(image.src, image.alt);
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    const image = galleryImages[currentImageIndex];
    showLightbox(image.src, image.alt);
}

// Contact Form Functions
function initializeContactForm() {
    const form = document.getElementById('inquiryForm');
    const whatsappBtn = document.querySelector('.whatsapp-btn');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // Here you would typically handle the form submission
        alert('Thank you for your inquiry! We will contact you soon.');
        form.reset();
    });

    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', () => {
            // Replace with your WhatsApp number
            window.open('https://wa.me/1234567890', '_blank');
        });
    }
}

// Google Maps Integration
function initMap() {
    if (!document.getElementById('map')) return;
    
    // Replace with your desired coordinates
    const location = { lat: 40.7128, lng: -74.0060 };
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: location,
        styles: [
            {
                "featureType": "all",
                "elementType": "geometry",
                "stylers": [{ "color": "#f5f5f5" }]
            }
        ]
    });
    
    const marker = new google.maps.Marker({
        position: location,
        map: map,
        title: 'Our Location'
    });
}

// Scroll Animation
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.about-card, .property-card, .gallery-item').forEach(el => {
    observer.observe(el);
}); 

// Property Categories
const categoryCards = document.querySelectorAll('.category-card');

categoryCards.forEach(card => {
    card.addEventListener('click', () => {
        // Remove active class from all cards
        categoryCards.forEach(c => c.classList.remove('active'));
        // Add active class to clicked card
        card.classList.add('active');
    });
});

// Enquiry Button Click Handler
const enquiryButtons = document.querySelectorAll('.enquiry-btn');

enquiryButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const propertyCard = button.closest('.property-card');
        const propertyTitle = propertyCard.querySelector('h3').textContent;
        const propertyLocation = propertyCard.querySelector('.location').textContent;
        const ownerName = propertyCard.querySelector('.owner').textContent;
        
        // You can customize this to show a modal or redirect to contact form
        alert(`Enquiry for: ${propertyTitle}\nLocation: ${propertyLocation}\nOwner: ${ownerName}\n\nPlease contact us for more information.`);
    });
});

// Property Image Loading
const propertyImages = document.querySelectorAll('.property-img img');

propertyImages.forEach(img => {
    img.addEventListener('error', () => {
        // If image fails to load, replace with placeholder
        img.src = 'images/placeholder-property.jpg';
    });
}); 