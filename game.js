const metlin = document.getElementById('metlin');
const scoreElement = document.getElementById('score');
const healthElement = document.getElementById('health');
const messageElement = document.getElementById('message');

let score = 0;
let health = 100;
let gameActive = true;

// Позиционирование Метлина
function moveMetlin() {
    if (!gameActive) return;
    
    const x = Math.random() * (window.innerWidth - 200);
    const y = Math.random() * (window.innerHeight - 200);
    metlin.style.left = `${x}px`;
    metlin.style.top = `${y}px`;
    
    // Движение по синусоиде
    let angle = 0;
    setInterval(() => {
        if (!gameActive) return;
        const newY = y + Math.sin(angle) * 50;
        metlin.style.top = `${newY}px`;
        angle += 0.1;
    }, 50);
}

// Обработка кликов
document.addEventListener('click', (e) => {
    if (!gameActive) return;
    
    // Создание следа от пули
    const bulletHole = document.createElement('div');
    bulletHole.className = 'bullet-hole';
    bulletHole.style.left = `${e.clientX - 10}px`;
    bulletHole.style.top = `${e.clientY - 10}px`;
    document.getElementById('gameContainer').appendChild(bulletHole);
    
    // Проверка попадания
    const metlinRect = metlin.getBoundingClientRect();
    if (e.clientX > metlinRect.left && e.clientX < metlinRect.right &&
        e.clientY > metlinRect.top && e.clientY < metlinRect.bottom) {
        score += 100;
        scoreElement.textContent = `Score: ${score}`;
        metlin.style.transform = 'scale(1.2)';
        setTimeout(() => metlin.style.transform = 'scale(1)', 200);
        moveMetlin();
    }
    
    // Обновление здоровья
    health -= 2;
    healthElement.textContent = `Health: ${health}`;
    
    // Проверка условий игры
    if (health <= 0) {
        gameActive = false;
        showMessage('YOU DIED!');
    }
    
    if (score >= 1000) {
        gameActive = false;
        showMessage('VICTORY!');
    }
});

function showMessage(text) {
    messageElement.textContent = text;
    messageElement.style.display = 'block';
    setTimeout(() => messageElement.style.display = 'none', 2000);
}

// Запуск игры
moveMetlin();
setInterval(moveMetlin, 3000);
