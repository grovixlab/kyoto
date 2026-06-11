const iframe = document.getElementById('preview-frame');
const urlInput = document.getElementById('generated-url');
const copyBtn = document.getElementById('copy-btn');

const inputs = {
    theme: document.getElementById('theme'),
    font: document.getElementById('font'),
    color: document.getElementById('color'),
    accent: document.getElementById('accent'),
    bg: document.getElementById('bg'),
    borderRadius: document.getElementById('borderRadius'),
    scale: document.getElementById('scale'),
    format: document.getElementById('format'),
    animation: document.getElementById('animation'),
    showHours: document.getElementById('showHours'),
    showMinutes: document.getElementById('showMinutes'),
    showSeconds: document.getElementById('showSeconds'),
    showAmPm: document.getElementById('showAmPm'),
    showDate: document.getElementById('showDate'),
    textShadow: document.getElementById('textShadow'),
    textBorder: document.getElementById('textBorder'),
    textBorderSize: document.getElementById('textBorderSize'),
    textBorderColor: document.getElementById('textBorderColor')
};

const borderSettingsPanel = document.getElementById('border-settings');

const displays = {
    borderRadius: document.getElementById('borderRadius-val'),
    scale: document.getElementById('scale-val'),
    textBorderSize: document.getElementById('textBorderSize-val')
};

function generateUrl() {
    const params = new URLSearchParams();
    
    ['theme', 'font', 'color', 'accent', 'bg', 'borderRadius', 'scale', 'format', 'animation', 'textBorderSize', 'textBorderColor'].forEach(key => {
        params.append(key, inputs[key].value);
    });

    ['showHours', 'showMinutes', 'showSeconds', 'showAmPm', 'showDate', 'textShadow', 'textBorder'].forEach(key => {
        params.append(key, inputs[key].checked);
    });

    const baseUrl = window.location.href.replace('index.html', '').replace(/\/$/, '') + '/clock.html';
    const fullUrl = `${baseUrl}?${params.toString()}`;
    
    urlInput.value = fullUrl;
    iframe.src = `clock.html?${params.toString()}`;
}

Object.keys(inputs).forEach(key => {
    const el = inputs[key];
    if (el.type === 'checkbox') {
        el.addEventListener('change', (e) => {
            if (key === 'textBorder') {
                borderSettingsPanel.style.display = e.target.checked ? 'flex' : 'none';
            }
            generateUrl();
        });
    } else {
        el.addEventListener('input', (e) => {
            if (key === 'borderRadius') displays.borderRadius.textContent = `${e.target.value}px`;
            if (key === 'scale') displays.scale.textContent = `${parseFloat(e.target.value).toFixed(1)}x`;
            if (key === 'textBorderSize') displays.textBorderSize.textContent = `${e.target.value}px`;
            generateUrl();
        });
    }
});

copyBtn.addEventListener('click', () => {
    urlInput.select();
    document.execCommand('copy');
    const originalText = copyBtn.textContent;
    copyBtn.textContent = 'Copied Successfully!';
    copyBtn.classList.add('copied');
    
    setTimeout(() => {
        copyBtn.textContent = originalText;
        copyBtn.classList.remove('copied');
    }, 2000);
});

// Initial generation
generateUrl();
