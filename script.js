/**
 * Portfolio Interactive Scripts
 * Eng. Islam Anwar Al-Fajam Portfolio
 */

// ==========================================
// 1. Theme Toggle (Dark / Light) with Storage
// ==========================================
const themeToggleBtn = document.getElementById('themeToggleBtn');
const themeIcon = themeToggleBtn.querySelector('i');

function initTheme() {
    const savedTheme = localStorage.getItem('islam_portfolio_theme');
    if (savedTheme === 'light') {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    }
}

themeToggleBtn.addEventListener('click', () => {
    const isDark = document.body.classList.contains('dark-theme');
    if (isDark) {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('islam_portfolio_theme', 'light');
    } else {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('islam_portfolio_theme', 'dark');
    }
});

initTheme();

// ==========================================
// 2. Mobile Menu Navigation
// ==========================================
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');
const mobileOverlay = document.getElementById('mobileOverlay');

function toggleMobileMenu() {
    navMenu.classList.toggle('open');
    mobileOverlay.classList.toggle('show');
    const isOpen = navMenu.classList.contains('open');
    mobileMenuBtn.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars-staggered"></i>';
}

mobileMenuBtn.addEventListener('click', toggleMobileMenu);
mobileOverlay.addEventListener('click', toggleMobileMenu);

navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
            toggleMobileMenu();
        }
    });
});

// ==========================================
// 3. Scroll Spy & Active Nav Link + Back to Top
// ==========================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Active nav link highlight
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 120;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });

    // Back to top button visibility
    if (scrollY > 400) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==========================================
// 4. Projects Filter (Web Systems)
// ==========================================
const projectFilterBtns = document.querySelectorAll('[data-filter]');
const projectCards = document.querySelectorAll('.project-card');

projectFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        projectFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
            const categories = card.getAttribute('data-category').split(' ');
            if (filterValue === 'all' || categories.includes(filterValue)) {
                card.style.display = 'flex';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 200);
            }
        });
    });
});

// ==========================================
// 5. Designs Filter (Khamsat & Mockups)
// ==========================================
const designFilterBtns = document.querySelectorAll('[data-design-filter]');
const designCards = document.querySelectorAll('.design-card');

designFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        designFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-design-filter');

        designCards.forEach(card => {
            const cat = card.getAttribute('data-design-cat');
            if (filterValue === 'all' || cat.includes(filterValue)) {
                card.style.display = 'flex';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 200);
            }
        });
    });
});

// ==========================================
// 6. Comprehensive Project Modal Data & Handlers
// ==========================================
const projectData = {
    hospital: {
        badge: "نظام استشفائي متكامل (EHR & HMS)",
        title: "نظام مجمع ناصر الطبي لإدارة العمليات الاستشفائية",
        desc: "نظام إدارة استشفائية متكامل، متوافق مع البيئة الطبية والسريرية، صُمم بلغة Laravel 12، بنية تحتية RTL وتصميم عصري باللغة العربية. تم بناؤه ليكون حلاً رقمياً متكاملاً لإدارة الكشوفات والعيادات التخصصية ومتابعة الحالات الطبية المعقدة والطوارئ.",
        features: [
            "إدارة الملفات الطبية الشاملة للمرضى: البيانات الشخصية، فصيلة الدم، التاريخ المرضي، والحساسيات الدوائية.",
            "جدولة المواعيد والكشوفات حسب الأولوية السريرية (عادي، مستعجل، طوارئ) وربطها بالطبيب المختص.",
            "السجلات والاستشارات السريرية: توثيق العلامات الحيوية، التشخيص، وإصدار وطباعة الوصفات الدوائية (Rx).",
            "إدارة الأقسام والعيادات التخصصية: عيادة القلب، جراحة العظام، الأطفال، الباطنية، وقسم الطوارئ.",
            "مصفوفة صلاحيات متقدمة (Role Authorization) تشمل: المدير العام (Admin)، الطبيب (Doctor)، موظف الاستقبال (Receptionist)، والمحاسب (Accountant)."
        ],
        tech: ["Laravel 12.x", "PHP 8.2", "Blade Components", "Tailwind CSS RTL", "SQLite / MySQL", "Vite Bundler"],
        links: [
            { label: "مستودع GitHub", url: "https://github.com/eslam-anwar1/nasser-hospital-system", icon: "fa-brands fa-github" },
            { label: "معاينة حية (Live Demo)", url: "https://nasser-hospital.sys", icon: "fa-solid fa-arrow-up-right-from-square" },
            { label: "طلب نظام مماثل", url: "#contact", icon: "fa-solid fa-bolt" }
        ],
        previewHtml: `
            <div style="background: linear-gradient(135deg, #09203f 0%, #17365d 100%); padding: 1.5rem; color: #fff; border-radius: 8px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; border-bottom:1px solid rgba(255,255,255,0.15); padding-bottom:0.75rem;">
                    <div><strong style="font-size:1.1rem;">🏥 مجمع ناصر الطبي | لوحة الأطباء والاستقبال</strong></div>
                    <span style="background:rgba(16,185,129,0.2); color:#34d399; padding:2px 8px; border-radius:12px; font-size:0.75rem;">نظام فعال 100%</span>
                </div>
                <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:0.75rem; text-align:center;">
                    <div style="background:rgba(255,255,255,0.08); padding:0.75rem; border-radius:6px;"><div style="font-size:1.2rem; font-weight:800;">156</div><small style="color:#cbd5e1;">المرضى النشطين</small></div>
                    <div style="background:rgba(255,255,255,0.08); padding:0.75rem; border-radius:6px;"><div style="font-size:1.2rem; font-weight:800; color:#38bdf8;">24</div><small style="color:#cbd5e1;">الكوادر الطبية</small></div>
                    <div style="background:rgba(255,255,255,0.08); padding:0.75rem; border-radius:6px;"><div style="font-size:1.2rem; font-weight:800; color:#fbbf24;">48</div><small style="color:#cbd5e1;">حجوزات اليوم</small></div>
                    <div style="background:rgba(255,255,255,0.08); padding:0.75rem; border-radius:6px;"><div style="font-size:1.2rem; font-weight:800; color:#f43f5e;">12</div><small style="color:#cbd5e1;">حالات الطوارئ</small></div>
                </div>
            </div>
        `
    },
    samogaza: {
        badge: "منصة إنسانية وإدارية سحابية",
        title: "منصة ومؤسسة سماء غزة الإنسانية / موقع سامو للحلول",
        desc: "منصة ويب متطورة مبنية بواسطة Node.js و Express لإدارة وتنسيق الحملات الإغاثية والإنسانية ومتابعة التبرعات وتوزيع المساعدات والطرود والخدمات الطبية الميدانية، ومجهزة بدليل كامل ومعدات رفع مجانية على Render و Vercel.",
        features: [
            "نظام إدارة الحملات الإغاثية، متابعة أهداف جمع التبرعات، وتوثيق أعداد المستفيدين لحظة بلحظة.",
            "هيكلية خادم سريعة مبنية بـ Express و Node.js تدعم التحجيم السحابي والأمان العالي بـ JWT.",
            "ملف تهيئة النشر السحابي التلقائي (render.yaml) للربط بضغطة زر واحدة مع استضافة Render المجانية.",
            "واجهة متجاوبة بالكامل لتقديم طلبات المساعدة وحجز الطرود الإغاثية ومشاريع سقيا الماء.",
            "لوحة متابعة إدارية لإصدار تقارير الشفافية والتوثيق للمؤسسات المانحة والشركاء."
        ],
        tech: ["Node.js", "Express.js", "Render Cloud API", "JWT Security", "REST API", "Vercel"],
        links: [
            { label: "المعاينة على Render", url: "https://sama-gaza-foundation.onrender.com", icon: "fa-solid fa-globe" },
            { label: "مستودع GitHub", url: "https://github.com/eslam-anwar1/samo-solutions", icon: "fa-brands fa-github" },
            { label: "طلب منصة مشابهة", url: "#contact", icon: "fa-solid fa-bolt" }
        ],
        previewHtml: `
            <div style="background: linear-gradient(135deg, #064e3b 0%, #065f46 100%); padding: 1.5rem; color: #fff; border-radius: 8px;">
                <div style="text-align:center; margin-bottom:1rem;">
                    <h3 style="margin-bottom:0.3rem;"><i class="fa-solid fa-hand-holding-heart"></i> مؤسسة سماء غزة الإنسانية</h3>
                    <p style="font-size:0.85rem; color:#a7f3d0;">منصة التوثيق والإغاثة الميدانية السريعة</p>
                </div>
                <div style="background:rgba(0,0,0,0.25); padding:1rem; border-radius:8px;">
                    <div style="display:flex; justify-content:space-between; font-size:0.85rem; margin-bottom:6px;">
                        <span>حملة توزيع الطرود والكسوة الشتوية</span>
                        <strong style="color:#34d399;">84% مكتمل</strong>
                    </div>
                    <div style="height:8px; background:rgba(255,255,255,0.15); border-radius:4px; overflow:hidden;">
                        <div style="width:84%; height:100%; background:#10b981;"></div>
                    </div>
                </div>
            </div>
        `
    },
    omyaman: {
        badge: "منصة تجارة إلكترونية متكاملة مع AI",
        title: "متجر ونظام توابل وبهارات أم يمان (Om Yaman Spices)",
        desc: "تطبيق ويب متكامل (Full-Stack E-commerce Web Application) مصمم وفق أعلى معايير الويب للتوابل والبهارات الفلسطينية والشرقية، مع دعم ألوان التوابل الدافئة وسلة مشتريات ذكية ترسل الطلبات مباشرة لواتساب المتجر.",
        features: [
            "كتالوج ضخم يشمل أكثر من 185 صنفاً أصيلاً موزعاً على 8 أقسام رئيسية مع دعم الأسعار بالـ ₪ (شيكل).",
            "سلة مشتريات ذكية تحفظ محتوياتها محلياً (localStorage) وتولد فواتير مفصلة للمنتجات مع إجمالي الحساب.",
            "نظام الطلب المباشر عبر واتساب (+970594797110) للمنتج الفردي أو السلة كاملة ببيانات العميل وعنوانه.",
            "مساعد ذكي تفاعلي (AI Spice Assistant) بنبرة أم يمان الدافئة يقدم أسرار الطبخ واقتراحات البهارات تلقائياً.",
            "لوحة إدارة متطورة (Admin Dashboard CRUD) لإضافة وتعديل وحذف الأصناف مع تصدير النسخ الاحتياطية JSON."
        ],
        tech: ["Vanilla JavaScript ES6+", "HTML5 Semantic", "Modern CSS3", "WhatsApp Webhook API", "Local Storage", "PHP Admin"],
        links: [
            { label: "معاينة المتجر", url: "https://omyaman-spices.store", icon: "fa-solid fa-bag-shopping" },
            { label: "مستودع GitHub", url: "https://github.com/eslam-anwar1/om-yaman-spices", icon: "fa-brands fa-github" },
            { label: "تواصل عبر واتساب المتجر", url: "https://wa.me/970594797110", icon: "fa-brands fa-whatsapp" },
            { label: "طلب متجر مماثل", url: "#contact", icon: "fa-solid fa-bolt" }
        ],
        previewHtml: `
            <div style="background: linear-gradient(135deg, #451a03 0%, #78350f 100%); padding: 1.5rem; color: #fff; border-radius: 8px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
                    <div><strong>🌿 متجر توابل وبهارات أم يمان</strong></div>
                    <span style="background:#d97706; padding:2px 8px; border-radius:10px; font-size:0.75rem;">185+ صنف فلسطيني</span>
                </div>
                <div style="display:flex; gap:0.8rem; justify-content:center; flex-wrap:wrap;">
                    <div style="background:rgba(0,0,0,0.3); padding:0.6rem 1rem; border-radius:6px; font-size:0.85rem;"><i class="fa-solid fa-bowl-food" style="color:#fbbf24;"></i> خلطات القدرة والمنسف</div>
                    <div style="background:rgba(0,0,0,0.3); padding:0.6rem 1rem; border-radius:6px; font-size:0.85rem;"><i class="fa-solid fa-seedling" style="color:#34d399;"></i> زعتر جنيني ملوكي</div>
                    <div style="background:rgba(0,0,0,0.3); padding:0.6rem 1rem; border-radius:6px; font-size:0.85rem;"><i class="fa-solid fa-robot" style="color:#38bdf8;"></i> شات أم يمان الذكي</div>
                </div>
            </div>
        `
    },
    rawh: {
        badge: "تطبيق ويب تقدمي (PWA Offline-First)",
        title: "تطبيق 'رَوْح' / حديقة القيم الهادئة وبوابة الجنة",
        desc: "تطبيق ويب تقدمي إسلامي وتربوي فائق السلاسة والجمال، يعمل بنسبة 100% دون اتصال بالإنترنت بعد أول فتح، مصمم بتقنيات الكانفاس الحية ومولد صوتي نقي بدون ملفات خارجية وبأعلى معايير راحة العين.",
        features: [
            "معمارية العمل بدون إنترنت بنسبة 100% (Offline-First) عبر Service Workers وتخزين IndexedDB/LocalStorage.",
            "الحديقة التفاعلية للفضائل: 6 غراس نبوية (زيتون، نخل، ياسمين، ريحان) تنمو بالرسوم الحية مع كل عمل صالح.",
            "نقاء حسي وصوتي: مولد أصوات برمجية نقي (Pure Web Audio API) يولد خرير الماء والنسيم دون أي موسيقى أو تسجيلات خارجية.",
            "متحكم فوري بحجم الخط لكبار السن (عادي، كبير، كبير جداً) مع محاكي قراءة صوتي (Speech Synthesis).",
            "جاهز للنشر على متجر Google Play مع توثيق رسمي وحقوق حصرية للمهندسة إسلام أنور الفجم."
        ],
        tech: ["Progressive Web App (PWA)", "Pure Web Audio API", "HTML5 Canvas Animation", "Service Workers", "Google Play Store Ready"],
        links: [
            { label: "تشغيل التطبيق PWA", url: "https://rawh-virtues.app", icon: "fa-solid fa-play" },
            { label: "مستودع GitHub", url: "https://github.com/eslam-anwar1/portfolio", icon: "fa-brands fa-github" },
            { label: "طلب تطبيق PWA مخصص", url: "#contact", icon: "fa-solid fa-bolt" }
        ],
        previewHtml: `
            <div style="background: linear-gradient(135deg, #064e3b 0%, #134e4a 100%); padding: 1.5rem; color: #fff; border-radius: 8px; text-align:center;">
                <div style="font-size:1.8rem; margin-bottom:0.4rem;">🌿 🌸 🌴</div>
                <h4 style="color:#a7f3d0; margin-bottom:0.4rem;">حديقة القيم الهادئة (The Peaceful Virtues Garden)</h4>
                <p style="font-size:0.85rem; color:#cbd5e1; max-width:500px; margin:0 auto 0.8rem;">تنمو غراس الحديقة مع التزامك بالفضائل اليومية وبر الوالدين، مع أصوات مهدئة مبرمجة برمجياً.</p>
                <div style="display:inline-flex; gap:0.5rem; background:rgba(0,0,0,0.3); padding:0.4rem 0.8rem; border-radius:20px; font-size:0.78rem;">
                    <span><i class="fa-solid fa-wifi-slash"></i> بدون إنترنت 100%</span>
                    <span>•</span>
                    <span><i class="fa-solid fa-eye"></i> مريح لكبار السن</span>
                </div>
            </div>
        `
    },
    eyas: {
        badge: "نظام إدارة الكوادر والمؤسسات (EMS)",
        title: "لوحة تحكم مركز ميديا لإدارة الموظفين والمهام (EMS Dashboard)",
        desc: "نظام إداري داخلي ومؤسسي متكامل، صُمم لإدارة موظفي ومهام مركز ميديا وتتبع سجلات الحضور والانصراف، توزيع المهام، ومتابعة الأداء الشهري مع بنية قواعد بيانات متقدمة (ER Diagram).",
        features: [
            "تتبع الحضور والانصراف اليومي وساعات العمل الإضافية مع سجلات رقمية دقيقة.",
            "مخطط علاقات الكيانات لقواعد البيانات (ERD) مهيكل لدعم آلاف السجلات مع الأمان العالي.",
            "إدارة الأقسام والفرق الإعلامية وتوزيع المهام مع مؤشرات إنجاز مرئية (Progress Bars).",
            "تقييم الأداء الدوري وتصدير التقارير الإدارية الخاصة بالموارد البشرية (HR Management)."
        ],
        tech: ["HTML5 / CSS3 Semantic", "JavaScript Dashboard", "Database ERD Modeling", "Bootstrap / Tailwind"],
        links: [
            { label: "كود المشروع على GitHub", url: "https://github.com/eslam-anwar1/EYAS-MEDIA", icon: "fa-brands fa-github" },
            { label: "طلب لوحة إدارة", url: "#contact", icon: "fa-solid fa-bolt" }
        ],
        previewHtml: `
            <div style="background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%); padding: 1.5rem; color: #fff; border-radius: 8px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
                    <strong>لوحة تحكم مركز ميديا | نظرة عامة</strong>
                    <span style="background:rgba(56,189,248,0.2); color:#38bdf8; padding:2px 8px; border-radius:8px; font-size:0.75rem;">EMS v2.4</span>
                </div>
                <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:0.6rem; text-align:center;">
                    <div style="background:rgba(255,255,255,0.06); padding:0.6rem; border-radius:4px;"><small>نسبة الحضور</small><h4 style="color:#34d399;">98.2%</h4></div>
                    <div style="background:rgba(255,255,255,0.06); padding:0.6rem; border-radius:4px;"><small>المهام النشطة</small><h4 style="color:#38bdf8;">34 مهمة</h4></div>
                    <div style="background:rgba(255,255,255,0.06); padding:0.6rem; border-radius:4px;"><small>الأقسام</small><h4 style="color:#fbbf24;">6 فروع</h4></div>
                </div>
            </div>
        `
    },
    hamada: {
        badge: "بوابة استشارات وتطبيقات React",
        title: "بوابة مركز حمادة التخصصي للرعاية الصحية",
        desc: "تطبيق ويب سريع تفاعلي مبني عبر React و Vite و TypeScript، يقدم تجربة حجز استشارات طبية فورية وسلسة تُمكّن المرضى من اختيار الطبيب والوقت المتاح بنقرات معدودة.",
        features: [
            "واجهة حجز ذكية وفورية بنمط Step-by-Step Flow دون أي تعقيد أو إعادة تحميل للصفحة.",
            "مبني بأحدث تقنيات React 18 و Vite مع معمارية مكونات قابلة لإعادة الاستخدام بالكامل.",
            "تصميم عصري ونظيف ومريح للعين مع تجاوب 100% مع شاشات الهواتف والأجهزة اللوحية.",
            "ربط إشعارات الحجز المباشرة مع البريد ونظام التنبيهات الداخلي للمركز."
        ],
        tech: ["React 18", "TypeScript", "Vite", "Tailwind CSS", "REST Integration"],
        links: [
            { label: "مستودع GitHub", url: "https://github.com", icon: "fa-brands fa-github" },
            { label: "طلب منصة React", url: "#contact", icon: "fa-solid fa-bolt" }
        ],
        previewHtml: `
            <div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 1.5rem; color: #fff; border-radius: 8px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
                    <strong>🩺 مركز حمادة الاستشاري | حجز فوري</strong>
                    <span style="color:#38bdf8; font-size:0.8rem;">React + Vite SPA</span>
                </div>
                <div style="display:flex; flex-direction:column; gap:0.4rem;">
                    <div style="background:rgba(255,255,255,0.05); padding:0.5rem; border-radius:4px; font-size:0.8rem; display:flex; justify-content:space-between;">
                        <span>عيادة الاستشارات الباطنية</span>
                        <span style="color:#34d399;"><i class="fa-solid fa-check"></i> 4 فترات متاحة اليوم</span>
                    </div>
                </div>
            </div>
        `
    }
};

const designData = {
    'khamsat-web': {
        badge: "غلاف خدمة معتمد لمنصة خمسات",
        title: "غلاف خدمة برمجة وتطوير أنظمة ومواقع الويب (Laravel & Node.js)",
        desc: "تصميم غلاف تسويقي وبصري مخصص لمنصة خمسات، تم بناؤه بمراعاة القواعد التسويقية وسيكولوجية الألوان (Psychology of Colors) لإبراز نقاط القوة الفنية فورياً وجذب المشترين لطلب الخدمة بثقة تامة.",
        features: [
            "أبعاد قياسية معتمدة لمنصة خمسات (800x470 بكسل) مع وضوح عالي وتناسب عبر تطبيق الهاتف وسطح المكتب.",
            "إبراز المزايا التنافسية: كود نظيف، تسليم في الموعد، وتوافق كامل مع شاشات الهواتف الذكية.",
            "ألوان داكنة راقية تعطي انطباعاً برمجياً واحترافياً باللون الكحلي الداكن والأزرق السماوي المتوهج.",
            "مؤشر تقييم خمس نجوم وبادج بائع موثوق لرفع معدل النقر والتحويل (CTR & Conversion)."
        ],
        tech: ["Figma UI Kit", "Adobe Illustrator", "Modern Marketing Typography", "Khamsat Grid Standard"],
        links: [
            { label: "طلب الخدمة على خمسات", url: "https://khamsat.com", icon: "fa-solid fa-5" },
            { label: "تواصل عبر واتساب", url: "https://wa.me/970594797110", icon: "fa-brands fa-whatsapp" }
        ],
        previewHtml: `
            <div style="background: linear-gradient(135deg, #1e1b4b 0%, #0f172a 60%, #0369a1 100%); padding: 2rem; color: #fff; border-radius: 8px; text-align:center;">
                <div style="background:#0ea5e9; color:#fff; display:inline-block; padding:4px 12px; border-radius:6px; font-weight:800; margin-bottom:1rem;">خمسات | خدمة مميزة ⭐⭐⭐⭐⭐</div>
                <h3 style="margin-bottom:0.8rem;">برمجة وتطوير مواقع وأنظمة ويب احترافية بـ Laravel & Node.js</h3>
                <p style="color:#cbd5e1; font-size:0.9rem;">كود نظيف • لوحة تحكم كاملة • دعم فني مستمر</p>
            </div>
        `
    },
    'mockup-responsive': {
        badge: "موكاب تفاعلي عالي الدقة (Device Mockup)",
        title: "موكاب شاشات العرض المتجاوبة (لابتوب حديث + هاتف ذكي)",
        desc: "قالب موكاب ثلاثي الأبعاد يُستخدم لعرض واجهات الأنظمة وتطبيقات الويب التقدمية (PWA) للعملاء، يُبرز التكيف المثالي لواجهات المستخدم مع مختلف أبعاد الشاشات وتناسق التفاصيل بين سطح المكتب والهاتف المحمول.",
        features: [
            "إخراج واقعي لشاشات اللابتوب بإطار نحيف وعصري يعكس واجهة تطبيق 'رَوْح' ونظام المستشفيات.",
            "موكاب هاتف ذكي يوضح شاشات التطبيق المتوافقة مع أجهزة iPhone و Android.",
            "تناسق بصري فائق مع ظلال ناعمة (Soft Ambient Shadows) وانعكاسات زجاجية مميزة.",
            "جاهز للعرض في معارض الأعمال والمقترحات الفنية للشركات والعملاء المميزين."
        ],
        tech: ["3D Device Modeling", "Figma Mockup Engine", "Responsive Grid Validation"],
        links: [
            { label: "طلب تصميم موكاب لمشروعك", url: "#contact", icon: "fa-solid fa-bolt" },
            { label: "استعراض باقي التصاميم", url: "#design-mockups", icon: "fa-solid fa-palette" }
        ],
        previewHtml: `
            <div style="background: radial-gradient(circle at center, #1e293b 0%, #0b0f19 100%); padding: 2rem; color: #fff; border-radius: 8px; text-align:center;">
                <div style="font-size:2.5rem; margin-bottom:0.5rem;"><i class="fa-solid fa-laptop"></i> & <i class="fa-solid fa-mobile-screen"></i></div>
                <h4>عرض احترافي متعدد الشاشات المتجاوبة</h4>
                <p style="color:#94a3b8; font-size:0.85rem;">يمنح العميل نظرة واقعية عن تجربة المستخدم قبل وأثناء الإطلاق الرسمي.</p>
            </div>
        `
    },
    'khamsat-uiux': {
        badge: "غلاف خدمة خمسات Figma",
        title: "غلاف خدمة تصميم واجهات وتجربة المستخدم (UI/UX) للتطبيقات والمواقع",
        desc: "تصميم مخصص لخدمات واجهات فيجما وأدوبي إكس دي على خمسات، يعكس الإبداع والمهارة البصرية وتوزيع العناصر المتوازن مع توضيح مراحل العمل (Wireframes, Prototypes, Design Systems).",
        features: [
            "تركيز على أيقونة وبرمجية Figma المشهورة لضمان وصول المهتمين بالتصاميم القابلة للبرمجة.",
            "تدرج لوني بنفسجي حديث (Modern Violet) يعكس الفخامة والإبداع الرقمي.",
            "إبراز سرعة التسليم، تسليم الملفات المصدرية المفتوحة، والتعديلات المرنة."
        ],
        tech: ["Figma Design", "Adobe XD", "Color Theory", "Khamsat Banner Standards"],
        links: [
            { label: "طلب الخدمة على خمسات", url: "https://khamsat.com", icon: "fa-solid fa-5" }
        ],
        previewHtml: `
            <div style="background: linear-gradient(135deg, #3b0764 0%, #1e1b4b 60%, #4338ca 100%); padding: 2rem; color: #fff; border-radius: 8px; text-align:center;">
                <i class="fa-brands fa-figma" style="font-size:2.5rem; color:#c084fc; margin-bottom:0.8rem;"></i>
                <h3>تصميم واجهات وتجربة مستخدم عصرية (UI/UX)</h3>
                <p style="color:#e9d5ff; font-size:0.9rem;">Wireframes • Prototypes • تسليم ملفات فيجما منظمة</p>
            </div>
        `
    },
    'mockup-omyaman': {
        badge: "هوية بصرية وتغليف فاخر",
        title: "موكاب عبوات وتغليف وهوية 'توابل وبهارات أم يمان'",
        desc: "تصميم موكاب راقٍ يجسد الهوية البصرية لمتجر بهارات أم يمان عبر أوعية زجاجية أنيقة وأكياس حفظ مصنوعة من الخيش والورق الطبيعي الصديق للبيئة، مع ملصقات هوية واضحة ومبهجة.",
        features: [
            "ألوان دافئة مستوحاة من الهيل، والزعفران، والبابريكا المدخنة، والزعتر البلدي.",
            "تصميم بطاقات المنتجات مع خريطة فلسطين وشعار الجودة 100% طبيعي.",
            "إبراز المظهر التجاري الفاخر المناسب للمتاجر الإلكترونية وقنوات السوشيال ميديا."
        ],
        tech: ["Brand Identity", "Packaging Mockups", "Typography & Stamp Emblems"],
        links: [
            { label: "طلب هوية بصرية مماثلة", url: "#contact", icon: "fa-solid fa-bolt" }
        ],
        previewHtml: `
            <div style="background: linear-gradient(135deg, #271a0c 0%, #4a2810 50%, #854d0e 100%); padding: 2rem; color: #fff; border-radius: 8px; text-align:center;">
                <div style="font-size:2rem; margin-bottom:0.5rem;">🏺 🌿 ✨</div>
                <h3 style="color:#fef08a;">هوية وتغليف توابل أم يمان</h3>
                <p style="color:#fde68a; font-size:0.85rem;">أصالة الماضي بلمسة عصرية تليق بالتجارة الإلكترونية المعاصرة.</p>
            </div>
        `
    },
    'khamsat-ecom': {
        badge: "غلاف خدمة خمسات للمتاجر",
        title: "غلاف خدمة إنشاء المتاجر الإلكترونية السريعة وربط الواتساب",
        desc: "غلاف خدمة يركز على الحلول السريعة لأصحاب الأعمال المنزلية والتجار المحليين الذين يرغبون في متجر خفيف وسريع يتلقى الطلبات عبر الواتساب بدون تعقيدات الدفع الإلكتروني المرهقة.",
        features: [
            "تسليط الضوء على إمكانية إرسال الفاتورة والطلب بضغطة زر لرقم واتساب التاجر.",
            "إبراز سرعة التحميل وانعدام الرسوم الشهرية.",
            "تصميم يجذب المشترين في منصات العمل الحر."
        ],
        tech: ["Khamsat Standards", "E-Commerce Strategy", "Digital Graphics"],
        links: [
            { label: "طلب الخدمة على خمسات", url: "https://khamsat.com", icon: "fa-solid fa-5" }
        ],
        previewHtml: `
            <div style="background: linear-gradient(135deg, #451a03 0%, #1c1917 60%, #b45309 100%); padding: 2rem; color: #fff; border-radius: 8px; text-align:center;">
                <i class="fa-solid fa-cart-shopping" style="font-size:2.2rem; color:#fbbf24; margin-bottom:0.6rem;"></i>
                <h3>متجر إلكتروني وسلة مشتريات واتساب بدون تكاليف شهرية</h3>
                <p style="color:#fed7aa; font-size:0.85rem;">الحل الأمثل لمشاريع الأسر المنتجة والمتاجر الناشئة</p>
            </div>
        `
    },
    'mockup-uikit': {
        badge: "نظام تصميم متكامل (UI Kit)",
        title: "منظومة التصميم المتسق ومكتبة المكونات الرقمية (UI Kit)",
        desc: "توثيق احترافي لمنظومة التصميم والألوان والأزرار وحقول الإدخال، تم إعدادها لتكون مرجعاً موحداً للمطورين يضمن تجربة متناسقة 100% في كافة صفحات وتطبيقات المشروع.",
        features: [
            "تحديد درجات التباين المتوافقة مع معايير الوصول العالمي (WCAG AAA).",
            "مكونات قابلة لإعادة الاستخدام (Buttons, Cards, Inputs, Modals, Badges).",
            "دعم كامل لتأثيرات الوضع الليلي الداكن والوضع النهاري النظيف."
        ],
        tech: ["Design Systems", "Figma Components & Auto-layout", "Accessibility Guidelines"],
        links: [
            { label: "طلب بناء نظام تصميم (UI Kit)", url: "#contact", icon: "fa-solid fa-bolt" }
        ],
        previewHtml: `
            <div style="background: linear-gradient(135deg, #090d16 0%, #1e293b 100%); padding: 1.8rem; color: #fff; border-radius: 8px; text-align:center;">
                <h4 style="color:#38bdf8; margin-bottom:0.4rem;">Design System & UI Kit</h4>
                <p style="color:#94a3b8; font-size:0.85rem;">نظام ألوان وعناصر متسق يرفع جودة البرمجة ويقلل وقت التطوير للنصف.</p>
            </div>
        `
    }
};

const projectModal = document.getElementById('projectModal');
const modalBadge = document.getElementById('modalBadge');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalFeaturesList = document.getElementById('modalFeaturesList');
const modalTechPills = document.getElementById('modalTechPills');
const modalLinksGroup = document.getElementById('modalLinksGroup');
const modalPreviewBox = document.getElementById('modalPreviewBox');

function openProjectModal(projectId) {
    const data = projectData[projectId];
    if (!data) return;

    modalBadge.textContent = data.badge;
    modalTitle.textContent = data.title;
    modalDesc.textContent = data.desc;
    modalPreviewBox.innerHTML = data.previewHtml;

    // Features
    modalFeaturesList.innerHTML = '';
    data.features.forEach(feat => {
        const li = document.createElement('li');
        li.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${feat}</span>`;
        modalFeaturesList.appendChild(li);
    });

    // Tech
    modalTechPills.innerHTML = '';
    data.tech.forEach(t => {
        const span = document.createElement('span');
        span.className = 'tech-pill';
        span.textContent = t;
        modalTechPills.appendChild(span);
    });

    // Links
    modalLinksGroup.innerHTML = '';
    data.links.forEach(l => {
        const a = document.createElement('a');
        a.className = 'btn btn-primary btn-sm';
        a.href = l.url;
        if (l.url.startsWith('http')) {
            a.target = '_blank';
            a.rel = 'noopener';
        } else {
            a.onclick = () => closeProjectModal();
        }
        a.innerHTML = `<i class="${l.icon}"></i> <span>${l.label}</span>`;
        modalLinksGroup.appendChild(a);
    });

    projectModal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function openDesignModal(designId) {
    const data = designData[designId];
    if (!data) return;

    modalBadge.textContent = data.badge;
    modalTitle.textContent = data.title;
    modalDesc.textContent = data.desc;
    modalPreviewBox.innerHTML = data.previewHtml;

    modalFeaturesList.innerHTML = '';
    data.features.forEach(feat => {
        const li = document.createElement('li');
        li.innerHTML = `<i class="fa-solid fa-star"></i> <span>${feat}</span>`;
        modalFeaturesList.appendChild(li);
    });

    modalTechPills.innerHTML = '';
    data.tech.forEach(t => {
        const span = document.createElement('span');
        span.className = 'tech-pill';
        span.textContent = t;
        modalTechPills.appendChild(span);
    });

    modalLinksGroup.innerHTML = '';
    data.links.forEach(l => {
        const a = document.createElement('a');
        a.className = 'btn btn-primary btn-sm';
        a.href = l.url;
        if (l.url.startsWith('http')) {
            a.target = '_blank';
            a.rel = 'noopener';
        } else {
            a.onclick = () => closeProjectModal();
        }
        a.innerHTML = `<i class="${l.icon}"></i> <span>${l.label}</span>`;
        modalLinksGroup.appendChild(a);
    });

    projectModal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    projectModal.classList.remove('show');
    document.body.style.overflow = '';
}

// Close modal when clicking on backdrop or pressing Escape
projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) {
        closeProjectModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal.classList.contains('show')) {
        closeProjectModal();
    }
});

// ==========================================
// 7. Contact Form Handler (Direct & WhatsApp)
// ==========================================
function handleContactSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const type = form.type.options[form.type.selectedIndex].text;
    const message = form.message.value;

    const alertBox = document.getElementById('formSuccessMessage');
    alertBox.style.display = 'flex';

    // Build WhatsApp message URL as optional instant send
    const waText = encodeURIComponent(
        `السلام عليكم ورحمة الله، أنا ${name}.\n` +
        `أود الاستفسار بخصوص مشروع: ${type}\n` +
        `طريقة التواصل: ${email}\n` +
        `تفاصيل الطلب: ${message}`
    );
    const waUrl = `https://wa.me/970594797110?text=${waText}`;

    // Prompt user to also send via WhatsApp if they prefer
    setTimeout(() => {
        const confirmSend = confirm(
            `شكراً لك أ/ ${name}!\nتم تسجيل رسالتك بنجاح.\n\nهل تود أيضاً فتح محادثة واتساب فورية مباشرة لإرسال الطلب الآن؟`
        );
        if (confirmSend) {
            window.open(waUrl, '_blank');
        }
        form.reset();
        setTimeout(() => {
            alertBox.style.display = 'none';
        }, 5000);
    }, 400);
}

// Make functions globally available
window.openProjectModal = openProjectModal;
window.openDesignModal = openDesignModal;
window.closeProjectModal = closeProjectModal;
window.handleContactSubmit = handleContactSubmit;
