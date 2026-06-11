const CONFIG = {
    format: '12',
    theme: 'glass',
    font: 'Inter',
    color: '#ffffff',
    accent: '#00ffcc',
    bg: 'rgba(15, 15, 20, 0.4)',
    scale: '1',
    animation: 'none',
    showHours: 'true',
    showMinutes: 'true',
    showSeconds: 'true',
    showDate: 'true',
    showAmPm: 'true',
    borderRadius: '24',
    textShadow: 'true',
    textBorder: 'false',
    textBorderSize: '1',
    textBorderColor: '#000000',
    customCss: ''
};

const dom = {
    container: document.getElementById('clock-container'),
    hoursContainer: document.getElementById('hours-container'),
    minutesContainer: document.getElementById('minutes-container'),
    secondsContainer: document.getElementById('seconds-container'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds'),
    ampm: document.getElementById('ampm'),
    dayName: document.getElementById('day-name'),
    month: document.getElementById('month'),
    dayNumber: document.getElementById('day-number'),
    dateDisplay: document.getElementById('date-display'),
    sepHm: document.getElementById('sep-hm')
};

let lastTime = {
    h: null,
    m: null,
    s: null
};

function parseUrlParams() {
    const params = new URLSearchParams(window.location.search);
    for (const key in CONFIG) {
        if (params.has(key)) {
            CONFIG[key] = params.get(key);
        }
    }
}

function applyConfig() {
    const root = document.documentElement;
    root.style.setProperty('--font-family', `'${CONFIG.font}', sans-serif`);
    root.style.setProperty('--text-color', CONFIG.color);
    root.style.setProperty('--accent-color', CONFIG.accent);
    root.style.setProperty('--scale', CONFIG.scale);
    root.style.setProperty('--border-radius', `${CONFIG.borderRadius}px`);
    
    if (CONFIG.theme === 'neon') {
        dom.container.classList.add('theme-neon');
    } else if (CONFIG.theme === 'minimal') {
        dom.container.classList.add('theme-minimal');
    } else if (CONFIG.theme === 'custom') {
        root.style.setProperty('--bg-color', CONFIG.bg);
    }

    if (CONFIG.showHours === 'false') {
        dom.hoursContainer.style.display = 'none';
    }
    
    if (CONFIG.showMinutes === 'false') {
        dom.minutesContainer.style.display = 'none';
        if (CONFIG.showHours !== 'false') {
            dom.sepHm.style.display = 'none';
        }
    }

    if (CONFIG.showSeconds === 'false') {
        dom.secondsContainer.style.display = 'none';
    }
    
    if (CONFIG.showAmPm === 'false' || CONFIG.format === '24') {
        dom.ampm.style.display = 'none';
    }

    if (CONFIG.showDate === 'false') {
        dom.dateDisplay.style.display = 'none';
    }

    if (CONFIG.textShadow === 'false') {
        root.style.setProperty('--text-shadow', 'none');
    } else {
        root.style.removeProperty('--text-shadow');
    }

    if (CONFIG.textBorder === 'true') {
        root.style.setProperty('--text-border-size', `${CONFIG.textBorderSize}px`);
        root.style.setProperty('--text-border-color', CONFIG.textBorderColor);
    } else {
        root.style.setProperty('--text-border-size', '0px');
        root.style.setProperty('--text-border-color', 'transparent');
    }

    let customStyleTag = document.getElementById('custom-css-injection');
    if (CONFIG.customCss && CONFIG.customCss.trim() !== '') {
        if (!customStyleTag) {
            customStyleTag = document.createElement('style');
            customStyleTag.id = 'custom-css-injection';
            document.head.appendChild(customStyleTag);
        }
        customStyleTag.textContent = CONFIG.customCss;
    } else if (customStyleTag) {
        customStyleTag.textContent = '';
    }
}

function triggerAnimation(element) {
    if (CONFIG.animation === 'none') return;
    
    const animClass = `anim-${CONFIG.animation}`;
    element.classList.remove(animClass);
    void element.offsetWidth;
    element.classList.add(animClass);
}

function updateClock() {
    const now = new Date();
    
    let h = now.getHours();
    const m = now.getMinutes();
    const s = now.getSeconds();
    
    let ampm = '';
    if (CONFIG.format === '12') {
        ampm = h >= 12 ? 'PM' : 'AM';
        h = h % 12 || 12;
    }
    
    const hStr = h.toString().padStart(2, '0');
    const mStr = m.toString().padStart(2, '0');
    const sStr = s.toString().padStart(2, '0');
    
    if (lastTime.h !== hStr) {
        dom.hours.textContent = hStr;
        triggerAnimation(dom.hours);
        lastTime.h = hStr;
        
        if (CONFIG.format === '12' && dom.ampm.textContent !== ampm) {
            dom.ampm.textContent = ampm;
            triggerAnimation(dom.ampm);
        }
    }
    
    if (lastTime.m !== mStr) {
        dom.minutes.textContent = mStr;
        triggerAnimation(dom.minutes);
        lastTime.m = mStr;
    }
    
    if (lastTime.s !== sStr) {
        dom.seconds.textContent = sStr;
        triggerAnimation(dom.seconds);
        lastTime.s = sStr;
    }
    
    if (h === 0 && m === 0 && s === 0 || !lastTime.dateInitialized) {
        const options = { weekday: 'long', month: 'short', day: '2-digit' };
        const parts = new Intl.DateTimeFormat('en-US', options).formatToParts(now);
        
        dom.dayName.textContent = parts.find(p => p.type === 'weekday').value;
        dom.month.textContent = parts.find(p => p.type === 'month').value;
        dom.dayNumber.textContent = parts.find(p => p.type === 'day').value;
        
        lastTime.dateInitialized = true;
    }
    
    requestAnimationFrame(updateClock);
}

function init() {
    parseUrlParams();
    applyConfig();
    updateClock();
}

init();
