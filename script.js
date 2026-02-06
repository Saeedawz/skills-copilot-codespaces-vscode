// Get all DOM elements
const brideNameInput = document.getElementById('bride-name');
const groomNameInput = document.getElementById('groom-name');
const weddingDateInput = document.getElementById('wedding-date');
const weddingTimeInput = document.getElementById('wedding-time');
const venueNameInput = document.getElementById('venue-name');
const venueAddressInput = document.getElementById('venue-address');
const invitationStyleSelect = document.getElementById('invitation-style');
const customMessageInput = document.getElementById('custom-message');
const resetBtn = document.getElementById('reset-btn');
const downloadBtn = document.getElementById('download-btn');

// Preview elements
const previewBrideName = document.getElementById('preview-bride-name');
const previewGroomName = document.getElementById('preview-groom-name');
const previewDate = document.getElementById('preview-date');
const previewTime = document.getElementById('preview-time');
const previewVenue = document.getElementById('preview-venue');
const previewAddress = document.getElementById('preview-address');
const previewMessage = document.getElementById('preview-message');
const invitationPreview = document.getElementById('invitation-preview');

// Color buttons
const colorButtons = document.querySelectorAll('.color-btn');

// Current theme color
let currentThemeColor = '#ffd700';

// Update preview function
function updatePreview() {
    // Update names
    previewBrideName.textContent = brideNameInput.value || 'Bride';
    previewGroomName.textContent = groomNameInput.value || 'Groom';
    
    // Update date
    if (weddingDateInput.value) {
        const date = new Date(weddingDateInput.value);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        previewDate.textContent = date.toLocaleDateString('en-US', options);
    } else {
        previewDate.textContent = 'Date TBD';
    }
    
    // Update time
    if (weddingTimeInput.value) {
        const [hours, minutes] = weddingTimeInput.value.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        previewTime.textContent = `${displayHour}:${minutes} ${ampm}`;
    } else {
        previewTime.textContent = 'Time TBD';
    }
    
    // Update venue
    previewVenue.textContent = venueNameInput.value || 'Venue Name';
    previewAddress.textContent = venueAddressInput.value || 'Venue Address';
    
    // Update custom message
    if (customMessageInput.value.trim()) {
        previewMessage.textContent = customMessageInput.value;
        previewMessage.style.display = 'block';
    } else {
        previewMessage.style.display = 'none';
    }
    
    // Update style
    invitationPreview.className = 'invitation-card ' + invitationStyleSelect.value;
    
    // Update theme color
    document.documentElement.style.setProperty('--theme-color', currentThemeColor);
}

// Event listeners for inputs
brideNameInput.addEventListener('input', updatePreview);
groomNameInput.addEventListener('input', updatePreview);
weddingDateInput.addEventListener('change', updatePreview);
weddingTimeInput.addEventListener('change', updatePreview);
venueNameInput.addEventListener('input', updatePreview);
venueAddressInput.addEventListener('input', updatePreview);
customMessageInput.addEventListener('input', updatePreview);
invitationStyleSelect.addEventListener('change', updatePreview);

// Color button handlers
colorButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        colorButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Update current theme color
        currentThemeColor = this.dataset.color;
        
        // Update preview
        updatePreview();
    });
});

// Reset button handler
resetBtn.addEventListener('click', function() {
    // Reset all inputs to default values
    brideNameInput.value = 'Sarah';
    groomNameInput.value = 'Michael';
    weddingDateInput.value = '2026-06-15';
    weddingTimeInput.value = '16:00';
    venueNameInput.value = 'Grand Ballroom';
    venueAddressInput.value = '123 Paradise Avenue, Garden City, CA 12345';
    customMessageInput.value = 'Join us as we celebrate our love and commitment';
    invitationStyleSelect.value = 'classic';
    
    // Reset color to default (gold)
    colorButtons.forEach(btn => btn.classList.remove('active'));
    document.querySelector('[data-color="#ffd700"]').classList.add('active');
    currentThemeColor = '#ffd700';
    
    // Update preview
    updatePreview();
});

// Download/Print button handler
downloadBtn.addEventListener('click', function() {
    // Create a print-friendly version
    window.print();
});

// Initialize preview on page load
updatePreview();

// Add animation on load
window.addEventListener('load', function() {
    invitationPreview.style.opacity = '0';
    invitationPreview.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        invitationPreview.style.transition = 'all 0.5s ease';
        invitationPreview.style.opacity = '1';
        invitationPreview.style.transform = 'translateY(0)';
    }, 100);
});
