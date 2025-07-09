
// Screen Management
function showScreen(screenId) {
    // Hide all screens
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show target screen with animation
    setTimeout(() => {
        document.getElementById(screenId).classList.add('active');
    }, 100);
}

// Content Management for Home Screen
function showContent(contentId) {
    // Hide all content sections
    const contents = document.querySelectorAll('.content-section');
    contents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Remove active class from all nav buttons
    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show target content
    document.getElementById(contentId).classList.add('active');
    
    // Activate corresponding nav button
    event.target.closest('.nav-btn').classList.add('active');
}

// Username Validation
function validateUsername() {
    const input = document.getElementById('username-input');
    const validationIcon = document.getElementById('validation-icon');
    const username = input.value.trim();
    
    if (username.length === 0) {
        validationIcon.innerHTML = '';
        validationIcon.className = 'validation-icon';
        return;
    }
    
    // Simple validation rules
    const isValid = username.length >= 3 && 
                   username.match(/^[a-zA-Z0-9_]+$/) &&
                   !username.match(/^[0-9]+$/);
    
    if (isValid) {
        validationIcon.innerHTML = '<i class="fas fa-check"></i>';
        validationIcon.className = 'validation-icon valid';
    } else {
        validationIcon.innerHTML = '<i class="fas fa-times"></i>';
        validationIcon.className = 'validation-icon invalid';
    }
}

// Add click animations to buttons
document.addEventListener('DOMContentLoaded', function() {
    // Add click animation to all buttons
    const buttons = document.querySelectorAll('.btn, .action-btn, .nav-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.height, rect.width);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add bounce animation to buttons on click
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Simulate form submissions
    const forms = document.querySelectorAll('.auth-form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add loading state to submit button
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Cargando...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                // Handle form-specific actions here
            }, 2000);
        });
    });
    
    // Enhanced swipe functionality for shorts (mobile simulation)
    let startY = 0;
    let currentY = 0;
    
    const shortsViewer = document.querySelector('.shorts-viewer');
    if (shortsViewer) {
        shortsViewer.addEventListener('touchstart', function(e) {
            startY = e.touches[0].clientY;
        });
        
        shortsViewer.addEventListener('touchmove', function(e) {
            currentY = e.touches[0].clientY;
            const diff = startY - currentY;
            
            // Add visual feedback for swipe
            if (Math.abs(diff) > 50) {
                this.style.transform = `translateY(${-diff * 0.1}px)`;
            }
        });
        
        shortsViewer.addEventListener('touchend', function(e) {
            const diff = startY - currentY;
            this.style.transform = '';
            
            if (Math.abs(diff) > 100) {
                // Simulate loading new short with more realistic content
                const videoContainer = this.querySelector('.short-video-container');
                videoContainer.style.transform = 'translateY(-100%)';
                
                setTimeout(() => {
                    // Reset position and load new content
                    videoContainer.style.transform = 'translateY(0)';
                    
                    // Update creator info
                    const creatorName = videoContainer.querySelector('.creator-info span');
                    const creators = ['@sofia_dance', '@miguel_comedy', '@lucia_art', '@chef_pablo'];
                    creatorName.textContent = creators[Math.floor(Math.random() * creators.length)];
                    
                    // Update description
                    const description = videoContainer.querySelector('.video-description p');
                    const descriptions = [
                        '¡Aprende este paso conmigo! 💃 #baile #tutorial #diversion',
                        'Mi día en la universidad 😂 #estudiante #vida #comedia',
                        'Pintando mi habitación ✨ #arte #decoracion #creative',
                        'Cocinando con la abuela 👵 #cocina #familia #tradicion'
                    ];
                    description.textContent = descriptions[Math.floor(Math.random() * descriptions.length)];
                    
                    // Reset like count
                    const likeBtn = videoContainer.querySelector('.like-btn');
                    likeBtn.classList.remove('liked');
                    const likeCounts = ['1.2k', '856', '2.1k', '745', '3.4k'];
                    likeBtn.querySelector('span').textContent = likeCounts[Math.floor(Math.random() * likeCounts.length)];
                }, 300);
            }
        });
    }
    
    // Add camera mode switching
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('mode-btn')) {
            const mode = e.target.dataset.mode;
            currentCameraMode = mode;
            updateCameraModes();
            
            const title = document.getElementById('camera-title');
            title.textContent = mode === 'video' ? 'Grabar Video' : 'Tomar Foto';
        }
    });
    
    // Add filter button functionality
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('filter-btn')) {
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            
            const filter = e.target.dataset.filter;
            document.querySelectorAll('.gallery-item').forEach(item => {
                if (filter === 'all' || item.classList.contains(filter.replace('s', ''))) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        }
    });
    
    // Add entrance animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.video-card, .friend-card, .setting-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// TikTok-like functionality

// Camera functionality
let isRecording = false;
let recordingTimer;
let flashOn = false;
let gridOn = false;
let currentCameraMode = 'video';

function openCamera() {
    const modal = document.getElementById('camera-modal');
    modal.classList.add('active');
    document.getElementById('camera-title').textContent = 'Grabar Video';
    currentCameraMode = 'video';
    updateCameraModes();
    
    // Ocultar la barra de navegación inferior temporalmente
    document.querySelector('.bottom-nav').style.transform = 'translateY(100%)';
    document.body.style.overflow = 'hidden';
}

function openPhotoCamera() {
    const modal = document.getElementById('camera-modal');
    modal.classList.add('active');
    document.getElementById('camera-title').textContent = 'Tomar Foto';
    currentCameraMode = 'photo';
    updateCameraModes();
    
    // Ocultar la barra de navegación inferior temporalmente
    document.querySelector('.bottom-nav').style.transform = 'translateY(100%)';
    document.body.style.overflow = 'hidden';
}

function closeCamera() {
    const modal = document.getElementById('camera-modal');
    modal.classList.remove('active');
    
    // Restaurar la barra de navegación inferior
    document.querySelector('.bottom-nav').style.transform = '';
    document.body.style.overflow = '';
    
    if (isRecording) {
        stopRecording();
    }
}

function switchCamera() {
    // Simulate camera switch with visual feedback
    const preview = document.querySelector('.camera-placeholder');
    preview.style.transform = 'scaleX(-1)';
    setTimeout(() => {
        preview.style.transform = '';
    }, 300);
}

function toggleFlash() {
    flashOn = !flashOn;
    const flashIcon = document.getElementById('flash-icon');
    flashIcon.className = flashOn ? 'fas fa-bolt' : 'far fa-bolt';
    flashIcon.style.color = flashOn ? '#ffeb3b' : '';
}

function toggleGrid() {
    gridOn = !gridOn;
    const gridLines = document.getElementById('grid-lines');
    const gridIcon = document.getElementById('grid-icon');
    gridLines.style.display = gridOn ? 'block' : 'none';
    gridIcon.style.color = gridOn ? '#ffeb3b' : '';
}

function toggleRecording() {
    if (currentCameraMode === 'photo') {
        takePhoto();
        return;
    }
    
    const recordBtn = document.getElementById('record-btn');
    const recordIcon = document.getElementById('record-icon');
    const timer = document.getElementById('recording-timer');
    
    if (!isRecording) {
        startRecording();
    } else {
        stopRecording();
    }
}

function startRecording() {
    isRecording = true;
    const recordBtn = document.getElementById('record-btn');
    const timer = document.getElementById('recording-timer');
    
    recordBtn.classList.add('recording');
    timer.style.display = 'block';
    
    let seconds = 0;
    recordingTimer = setInterval(() => {
        seconds++;
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        timer.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }, 1000);
}

function stopRecording() {
    isRecording = false;
    const recordBtn = document.getElementById('record-btn');
    const timer = document.getElementById('recording-timer');
    
    recordBtn.classList.remove('recording');
    timer.style.display = 'none';
    timer.textContent = '00:00';
    
    if (recordingTimer) {
        clearInterval(recordingTimer);
    }
    
    // Simulate video processing
    setTimeout(() => {
        closeCamera();
        openUploadModal('video');
    }, 500);
}

function takePhoto() {
    const preview = document.querySelector('.camera-placeholder');
    preview.style.animation = 'flash 0.3s ease';
    
    setTimeout(() => {
        preview.style.animation = '';
        closeCamera();
        openUploadModal('photo');
    }, 300);
}

function updateCameraModes() {
    const modeBtns = document.querySelectorAll('.mode-btn');
    modeBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.mode === currentCameraMode) {
            btn.classList.add('active');
        }
    });
    
    // Update record button icon
    const recordIcon = document.getElementById('record-icon');
    recordIcon.className = currentCameraMode === 'photo' ? 'fas fa-circle' : 'fas fa-circle';
}

// Gallery functionality
let selectedMedia = [];
let multiSelectMode = false;

function openGallery() {
    document.getElementById('gallery-modal').classList.add('active');
    selectedMedia = [];
    updateSelectedCount();
}

function closeGallery() {
    document.getElementById('gallery-modal').classList.remove('active');
    selectedMedia = [];
    multiSelectMode = false;
}

function toggleMultiSelect() {
    multiSelectMode = !multiSelectMode;
    const btn = document.querySelector('.select-multiple-btn');
    btn.style.color = multiSelectMode ? '#ff0050' : '';
    
    if (!multiSelectMode) {
        selectedMedia = [];
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.classList.remove('selected');
        });
        updateSelectedCount();
    }
}

function selectMedia(item) {
    if (multiSelectMode) {
        const index = selectedMedia.indexOf(item);
        if (index > -1) {
            selectedMedia.splice(index, 1);
            item.classList.remove('selected');
        } else {
            selectedMedia.push(item);
            item.classList.add('selected');
        }
        updateSelectedCount();
    } else {
        closeGallery();
        openUploadModal(item.classList.contains('video') ? 'video' : 'photo');
    }
}

function updateSelectedCount() {
    document.querySelector('.selected-count').textContent = `${selectedMedia.length} seleccionados`;
}

function processSelectedMedia() {
    if (selectedMedia.length > 0) {
        closeGallery();
        openUploadModal('multiple');
    }
}

// Upload functionality
function openUploadModal(type) {
    document.getElementById('upload-modal').classList.add('active');
    processUpload();
}

function closeUpload() {
    document.getElementById('upload-modal').classList.remove('active');
}

function processUpload() {
    const progress = document.querySelector('.upload-progress');
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    
    progress.style.display = 'block';
    
    let percent = 0;
    const uploadInterval = setInterval(() => {
        percent += Math.random() * 15;
        if (percent >= 100) {
            percent = 100;
            clearInterval(uploadInterval);
            progress.style.display = 'none';
        }
        
        progressFill.style.width = percent + '%';
        progressText.textContent = `Procesando... ${Math.round(percent)}%`;
    }, 200);
}

function updateCharCount() {
    const input = document.getElementById('description-input');
    const count = document.getElementById('char-count');
    count.textContent = input.value.length;
    count.style.color = input.value.length > 250 ? '#ff0050' : '';
}

function addHashtag(hashtag) {
    const input = document.getElementById('description-input');
    const currentText = input.value;
    if (!currentText.includes(hashtag)) {
        input.value += (currentText.length > 0 ? ' ' : '') + hashtag;
        updateCharCount();
    }
}

function publishContent() {
    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = 'Publicando...';
    btn.disabled = true;
    
    setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        closeUpload();
        showScreen('home-screen');
        showContent('home-content');
        
        // Show success message
        showNotification('¡Contenido publicado exitosamente!');
    }, 2000);
}

// Shorts interactions
function toggleLike(btn) {
    btn.classList.toggle('liked');
    const count = btn.querySelector('span');
    const currentCount = parseInt(count.textContent.replace('k', '000').replace('.', ''));
    const newCount = btn.classList.contains('liked') ? currentCount + 1 : currentCount - 1;
    count.textContent = newCount > 999 ? (newCount/1000).toFixed(1) + 'k' : newCount;
}

function showComments() {
    document.getElementById('comments-modal').classList.add('active');
}

function closeComments() {
    document.getElementById('comments-modal').classList.remove('active');
}

function addComment() {
    const input = document.getElementById('comment-input');
    const text = input.value.trim();
    if (!text) return;
    
    const commentsList = document.querySelector('.comments-list');
    const newComment = document.createElement('div');
    newComment.className = 'comment';
    newComment.innerHTML = `
        <div class="comment-avatar">
            <i class="fas fa-user"></i>
        </div>
        <div class="comment-content">
            <div class="comment-header">
                <span class="username">@tu_usuario</span>
                <span class="time">ahora</span>
            </div>
            <p>${text}</p>
            <div class="comment-actions">
                <button class="comment-action">
                    <i class="fas fa-heart"></i> 0
                </button>
                <button class="comment-action">Responder</button>
            </div>
        </div>
    `;
    
    commentsList.appendChild(newComment);
    input.value = '';
    commentsList.scrollTop = commentsList.scrollHeight;
}

function shareVideo() {
    document.getElementById('share-modal').classList.add('active');
}

function closeShare() {
    document.getElementById('share-modal').classList.remove('active');
}

function shareToApp(app) {
    showNotification(`Compartiendo en ${app}...`);
    closeShare();
}

function copyLink() {
    showNotification('Enlace copiado al portapapeles');
    closeShare();
}

function saveVideo() {
    showNotification('Video guardado en favoritos');
}

// Other functions
function showMyVideos() {
    const grid = document.getElementById('my-videos-grid');
    grid.style.display = grid.style.display === 'none' ? 'block' : 'none';
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #333;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .btn, .action-btn, .nav-btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes flash {
        0%, 100% { background: #000; }
        50% { background: #fff; }
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .btn:active {
        transform: scale(0.98);
    }
`;
document.head.appendChild(style);

// Simulate real-time features
setInterval(() => {
    // Simulate new notifications
    const notificationIndicators = document.querySelectorAll('.nav-btn');
    // Add notification badges occasionally (simulation)
}, 30000);

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Go back to previous screen
        const activeScreen = document.querySelector('.screen.active');
        if (activeScreen && activeScreen.id !== 'welcome-screen') {
            const backBtn = activeScreen.querySelector('.back-btn');
            if (backBtn) {
                backBtn.click();
            }
        }
    }
});
