// Service data
const services = {
    'Nail Services': [
        'Acrylic Nails',
        'Acrylic Nails with Extension',
        'Acrylic Nails without Extension',
        'Acrylic Maintenance',
        'Acrigel Nails',
        'Acrigel Maintenance',
        'Nail Armor Acrylic',
        'Nail Armor Acrigel',
        'Gel Nail Polish',
        'Hand Spa'
    ],
    'Pedicure Services': [
        'Traditional Pedicure',
        'Pedicure Gel Polish',
        'Brazilian Pedicure',
        'Feet Spa'
    ],
    'Eyelash Services': [
        'Eyelash Extensions',
        'Classic Lashes',
        'Colored Lashes',
        'Express Lashes',
        'Lash Lift',
        'Russian Volume Lashes',
        'Mega Volume Lashes',
        'Lash Tinting'
    ],
    'Eyebrow Services': [
        'Eyebrow Shaping',
        'Eyebrow Threading',
        'Brow Lamination',
        'Eyebrow Design',
        'Microblading',
        'Permanent Eyebrow Makeup'
    ],
    'Hair Removal Services': [
        'Brazilian Waxing',
        'Waxing Services',
        'Full Body Waxing'
    ],
    'Makeup Services': [
        'Permanent Makeup',
        'Permanent Eyebrow Makeup',
        'Lip Permanent Makeup'
    ]
};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    console.log('Booking page initialized');
    initDateInput();
    setupEventListeners();
});

// Initialize date input
function initDateInput() {
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    dateInput.value = today;
}

// Setup event listeners
function setupEventListeners() {
    const serviceCategory = document.getElementById('serviceCategory');
    const service = document.getElementById('service');
    const bookingForm = document.getElementById('bookingForm');

    if (serviceCategory) {
        serviceCategory.addEventListener('change', updateServices);
    }
    
    if (service) {
        service.addEventListener('change', showServiceInfo);
    }
    
    document.querySelectorAll('.duration-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            selectDuration(this);
        });
    });

    if (bookingForm) {
        bookingForm.addEventListener('submit', handleSubmit);
    }
}

// Update services dropdown
function updateServices() {
    const category = document.getElementById('serviceCategory').value;
    const serviceSelect = document.getElementById('service');
    const infoBox = document.getElementById('serviceInfo');
    
    serviceSelect.innerHTML = '<option value="">Select a service...</option>';
    if (infoBox) {
        infoBox.style.display = 'none';
    }
    
    if (category && services[category]) {
        services[category].forEach(service => {
            const option = document.createElement('option');
            option.value = service;
            option.textContent = service;
            serviceSelect.appendChild(option);
        });
    }
}

// Show service info
function showServiceInfo() {
    const service = document.getElementById('service').value;
    const infoBox = document.getElementById('serviceInfo');
    const description = document.getElementById('serviceDescription');
    
    if (service && infoBox && description) {
        const descriptions = {
            'Acrylic Nails': 'Professional acrylic nail extensions with custom design and color.',
            'Gel Nail Polish': 'Long-lasting gel polish manicure (2-3 weeks).',
            'Eyelash Extensions': 'Individual eyelash extensions for fuller, longer lashes.',
            'Brazilian Waxing': 'Professional hair removal service.',
            'Microblading': 'Semi-permanent eyebrow tattooing for natural-looking brows.',
            'Hand Spa': 'Relaxing hand spa treatment with moisturizing products.',
        };
        
        description.textContent = descriptions[service] || 'Professional beauty service included in our menu.';
        infoBox.style.display = 'block';
    }
}

// Select duration
function selectDuration(btn) {
    document.querySelectorAll('.duration-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('duration').value = btn.dataset.duration;
}

// Handle form submission
function handleSubmit(e) {
    e.preventDefault();
    
    if (!validateForm()) {
        return;
    }

    const form = document.getElementById('bookingForm');
    const formData = new FormData(form);
    
    // Добавляем дополнительные поля
    formData.append('_captcha', 'false');
    formData.append('_template', 'table');
    
    // ЗАМЕНИТЕ ВАШУ ПОЧТУ ЗДЕСЬ:
    const recipientEmail = 'micaelpankevich13@gmail.com';
    
    console.log('Sending booking data...');
    
    // Отправляем на FormSubmit
    fetch(`https://formsubmit.co/${recipientEmail}`, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        console.log('Response:', response);
        if (response.ok) {
            showSuccessMessage();
        } else {
            throw new Error('Form submission failed');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error sending booking. Please try again or call us at +7 (999) 123-45-67');
    });
}

// Validate form
function validateForm() {
    let isValid = true;
    const form = document.getElementById('bookingForm');
    const inputs = form.querySelectorAll('input[required], select[required]');
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            input.style.borderColor = 'var(--accent-beige)';
        }
    });

    const agree = document.getElementById('agree');
    if (agree && !agree.checked) {
        agree.style.borderColor = '#e74c3c';
        isValid = false;
    } else if (agree) {
        agree.style.borderColor = 'var(--accent-beige)';
    }

    if (!isValid) {
        alert('Please fill in all required fields');
        return false;
    }

    return true;
}

// Show success message
function showSuccessMessage() {
    const form = document.getElementById('bookingForm');
    const successMsg = document.getElementById('successMessage');
    
    if (form && successMsg) {
        form.style.display = 'none';
        successMsg.style.display = 'block';
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Real-time validation
document.querySelectorAll('input[required], select[required]').forEach(field => {
    field.addEventListener('blur', function() {
        if (!this.value.trim()) {
            this.style.borderColor = '#e74c3c';
        } else {
            this.style.borderColor = 'var(--accent-beige)';
        }
    });
});