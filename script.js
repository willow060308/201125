
const backgroundMusic = document.getElementById('background-music');

// KHAI BÁO SCREENS ĐÚNG (ID phải có dấu # hoặc dùng getElementById)
const screens = {
    code: document.getElementById('code-screen'),
    pin: document.getElementById('pin-screen'), // ĐÃ SỬA LỖI!
    main: document.getElementById('main-screen')
};

// Hàm chuyển màn hình (CHỈ GIỮ LẠI MỘT ĐỊNH NGHĨA NÀY)
function switchScreen(target) {
    Object.values(screens).forEach(screen => {
        if(screen) screen.classList.remove('active');
        if(screen) screen.classList.add('hidden');
    });
    
    if(screens[target]) {
        screens[target].classList.remove('hidden');
        screens[target].classList.add('active');
    }
}

// KHAI BÁO BIẾN PIN (Đã dọn dẹp biến trùng lặp: password, correctPassword, passwordInput)
const correctPin = "2011";
let currentPin = "";
const pinDisplay = document.getElementById('pin-display');

// LỆNH KÍCH HOẠT PIN (Sau 0.3s)
setTimeout(() => {
    switchScreen('pin');
    startHeartAnimation(screens.pin);
}, 300);

function updatePinDisplay() {
    let display = currentPin.split('').map(char => '❤️').join(' ');
    pinDisplay.textContent = display.padEnd(8, '_ ').trim();
}

function enterPin(number) {
    if (currentPin.length < 4) {
        currentPin += number;
        updatePinDisplay(); 
    }

    if (currentPin.length === 4) {
        setTimeout(() => {
            if (currentPin === correctPin) {
                switchScreen('main');
                startHeartAnimation(screens.main); 
                backgroundMusic.muted = false; // Bỏ tắt tiếng
                backgroundMusic.volume = 0.6; // Đặt âm lượng 60%
                backgroundMusic.play().catch(error => {
                    console.error('Lỗi phát nhạc:', error); 
                });

            } else {
                alert("Sai mật khẩu, thử lại!");
                clearPin();
            }
        }, 500); 
    }
}

function clearPin() {
    currentPin = "";
    updatePinDisplay();
}

function backspacePin() {
    currentPin = currentPin.slice(0, -1);
    updatePinDisplay();
}

function startHeartAnimation(screenElement) { 
    const heartCount = 30;

    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('i');
        heart.className = 'fas fa-heart heart';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 2 + 3 + 's'; // 3-5s
        heart.style.animationDelay = Math.random() * 5 + 's';
        heart.style.opacity = Math.random() * 0.5 + 0.5;
        
        screenElement.appendChild(heart); 
    }
}