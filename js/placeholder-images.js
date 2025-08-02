// Placeholder image URLs for commercial rental spaces
const placeholderImages = {
    // Hero and background images
    'hero-bg': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=1080&fit=crop',  // Modern building
    'about-bg': 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1920&h=1080&fit=crop',  // Office interior
    'facilities-bg': 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop',  // Commercial space
    'gallery-bg': 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1920&h=1080&fit=crop',  // Office building
    'contact-bg': 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1920&h=1080&fit=crop',  // Contact desk

    // Property images
    'property1': 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=600&h=400&fit=crop',  // Office building
    'property2': 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&h=400&fit=crop',  // Office interior
    'property3': 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=600&h=400&fit=crop',  // Office building
    'property4': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',  // Commercial building

    // Service page images
    'marriage-hall': 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop',  // Large commercial space
    'banquet-hall': 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',  // Conference space
    'commercial-space': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',  // Commercial building
    'office-space': 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop',  // Office interior

    // Gallery images
    'exterior-1': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop',  // Modern building
    'exterior-2': 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop',  // Office exterior
    'interior-1': 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&h=400&fit=crop',  // Office interior
    'interior-2': 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop',  // Commercial space
    'event-1': 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop',  // Conference room
    'event-2': 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',  // Meeting space

    // About page images
    'about-team': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop',  // Team photo
    'team1': 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop',  // Professional male
    'team2': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',  // Professional female
    'team3': 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop'   // Professional male 2
};

// Function to replace image src with placeholder URLs
function replacePlaceholderImages() {
    const images = document.getElementsByTagName('img');
    for (let img of images) {
        const src = img.getAttribute('src');
        if (src && src.includes('images/')) {
            const imageName = src.split('/').pop().split('.')[0];
            if (placeholderImages[imageName]) {
                img.src = placeholderImages[imageName];
            }
        }
    }

    // Replace background images in style attributes
    const elements = document.querySelectorAll('[style*="background-image"]');
    for (let el of elements) {
        const style = el.getAttribute('style');
        if (style) {
            const match = style.match(/url\(['"]?images\/([^'")]+)['"]?\)/);
            if (match && match[1]) {
                const imageName = match[1].split('.')[0];
                if (placeholderImages[imageName]) {
                    el.style.backgroundImage = `url('${placeholderImages[imageName]}')`;
                }
            }
        }
    }
}

// Run when DOM is loaded
document.addEventListener('DOMContentLoaded', replacePlaceholderImages); 