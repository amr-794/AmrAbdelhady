document.addEventListener('scroll', function () {
    let scrollPosition = window.scrollY;
    document.body.style.backgroundPositionY = `${scrollPosition * 0.3}px`;
});

// مؤثرات ديناميكية عند التحميل
window.onload = () => {
    const header = document.querySelector('header');
    header.classList.add('fade-in');
};

// تحسين تحميل العناصر باستخدام Intersection Observer
const updateSections = document.querySelectorAll('photos-section'); // افترض أن لديك أقسام التحديثات بهذا الاسم

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

