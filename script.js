// Certificate upload functionality
document.addEventListener('DOMContentLoaded', function() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('certificateUpload');
    const defaultCertificate = document.getElementById('defaultCertificate');
    const customCertificate = document.getElementById('customCertificate');
    const customCertImage = document.getElementById('customCertImage');

    // Drag and drop functionality
    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', function(e) {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileUpload(files[0]);
        }
    });

    // File input change
    fileInput.addEventListener('change', function(e) {
        if (e.target.files.length > 0) {
            handleFileUpload(e.target.files[0]);
        }
    });

    // Handle file upload
    function handleFileUpload(file) {
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file.');
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            customCertImage.src = e.target.result;
            defaultCertificate.style.display = 'none';
            customCertificate.style.display = 'block';
            
            // Smooth scroll to certificate
            customCertificate.scrollIntoView({ behavior: 'smooth' });
        };
        reader.readAsDataURL(file);
    }

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    mobileMenuBtn.addEventListener('click', function() {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    });

    // Action button functionality
    const downloadImgBtn = document.querySelector('.btn-download-img');
    const downloadPdfBtn = document.querySelector('.btn-download-pdf');
    const shareButtons = document.querySelectorAll('[class*="btn-share"]');

    downloadImgBtn.addEventListener('click', function() {
        downloadCertificateAsImage();
    });

    downloadPdfBtn.addEventListener('click', function() {
        downloadCertificateAsPDF();
    });

    shareButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const platform = this.className.includes('twitter') ? 'twitter' : 
                           this.className.includes('linkedin') ? 'linkedin' : 'facebook';
            shareCertificate(platform);
        });
    });

    // Download certificate as image
    function downloadCertificateAsImage() {
        const certificate = document.querySelector('.certificate');
        
        // Use html2canvas library (you would need to include it)
        // For now, we'll show an alert
        alert('Download image functionality would be implemented with html2canvas library');
    }

    // Download certificate as PDF
    function downloadCertificateAsPDF() {
        // Use jsPDF library (you would need to include it)
        // For now, we'll show an alert
        alert('Download PDF functionality would be implemented with jsPDF library');
    }

    // Share certificate
    function shareCertificate(platform) {
        const url = window.location.href;
        const text = 'Check out my certificate from MindLuster!';
        
        let shareUrl;
        switch(platform) {
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
                break;
            case 'linkedin':
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
                break;
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                break;
        }
        
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }

    // Responsive navigation
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navMenu.style.display = 'flex';
        } else {
            navMenu.style.display = 'none';
        }
    });
});

// Remove custom certificate
function removeCustomCertificate() {
    const defaultCertificate = document.getElementById('defaultCertificate');
    const customCertificate = document.getElementById('customCertificate');
    const fileInput = document.getElementById('certificateUpload');
    
    defaultCertificate.style.display = 'block';
    customCertificate.style.display = 'none';
    fileInput.value = '';
    
    // Smooth scroll to default certificate
    defaultCertificate.scrollIntoView({ behavior: 'smooth' });
}

// Certificate data management
const certificateData = {
    recipientName: 'CHANNAKESHAVA L',
    courseName: 'Compiler Design Principles',
    startDate: '2025-06-17',
    certificateNumber: '2740523',
    duration: '6 hours'
};

// Function to update certificate data (for future enhancements)
function updateCertificateData(newData) {
    Object.assign(certificateData, newData);
    renderCertificate();
}

function renderCertificate() {
    document.querySelector('.recipient-name').textContent = certificateData.recipientName;
    document.querySelector('.course-name').textContent = certificateData.courseName;
    document.querySelector('.course-date').textContent = `Course Start Date: ${certificateData.startDate}`;
    document.querySelector('.certified-number').textContent = certificateData.certificateNumber;
    document.querySelector('.course-duration').textContent = `Course Duration ${certificateData.duration}`;
}

// Initialize certificate with default data
document.addEventListener('DOMContentLoaded', renderCertificate);