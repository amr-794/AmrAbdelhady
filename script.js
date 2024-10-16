document.addEventListener('scroll', function () {
    let scrollPosition = window.scrollY;
    document.body.style.backgroundPositionY = `${scrollPosition * 0.3}px`;
});

// مؤثرات ديناميكية عند التحميل
window.onload = () => {
    const header = document.querySelector('header');
    header.classList.add('fade-in');
};
// تحريك خلفية الصفحة ديناميكياً
document.addEventListener('scroll', function () {
    let scrollPosition = window.scrollY;
    document.body.style.backgroundPositionY = `${scrollPosition * 0.3}px`;
});
// إعداد الشهب المتحركة
function createShootingStar() {
    const star = document.createElement('div');
    star.className = 'shooting-star';
    star.style.left = Math.random() * 100 + 'vw';
    star.style.top = Math.random() * 100 + 'vh';
    document.body.appendChild(star);

    setTimeout(() => {
        star.remove();
    }, 2000); // وقت الظهور قبل الإزالة
}

// جعل الشهب تظهر بشكل عشوائي
setInterval(createShootingStar, 15000); // كل 15 ثانية

// إنشاء النجوم في الخلفية
for (let i = 0; i < 100; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + 'vw';
    star.style.top = Math.random() * 100 + 'vh';
    document.body.appendChild(star);
}
// تحسين تحميل العناصر باستخدام Intersection Observer
const updateSections = document.querySelectorAll('.updates-section'); // افترض أن لديك أقسام التحديثات بهذا الاسم

const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1 // عندما تكون 10% من القسم مرئية
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible'); // إضافة فصل لجعل العنصر مرئي
            observer.unobserve(entry.target); // التوقف عن مراقبة العنصر بعد تحميله
        }
    });
}, options);

updateSections.forEach(section => {
    observer.observe(section); // مراقبة كل قسم
});

