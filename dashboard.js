const iframe = document.getElementById('preview-frame');
const urlInput = document.getElementById('generated-url');
const copyBtn = document.getElementById('copy-btn');
const exportBtn = document.getElementById('export-btn');
const importBtn = document.getElementById('import-btn');
const importFile = document.getElementById('import-file');

const inputs = {
    timezone: document.getElementById('timezone'),
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
    textBorderColor: document.getElementById('textBorderColor'),
    customCss: document.getElementById('customCss')
};

// Populate timezones
if (Intl && Intl.supportedValuesOf) {
    const timezones = Intl.supportedValuesOf('timeZone');
    timezones.forEach(tz => {
        const option = document.createElement('option');
        option.value = tz;
        option.textContent = tz.replace(/_/g, ' ');
        inputs.timezone.appendChild(option);
    });
} else {
    const fallbackTzs = ["UTC", "America/New_York", "America/Los_Angeles", "Europe/London", "Europe/Paris", "Asia/Tokyo", "Asia/Shanghai", "Australia/Sydney"];
    fallbackTzs.forEach(tz => {
        const option = document.createElement('option');
        option.value = tz;
        option.textContent = tz.replace(/_/g, ' ');
        inputs.timezone.appendChild(option);
    });
}

const borderSettingsPanel = document.getElementById('border-settings');

const displays = {
    borderRadius: document.getElementById('borderRadius-val'),
    scale: document.getElementById('scale-val'),
    textBorderSize: document.getElementById('textBorderSize-val')
};

function generateUrl() {
    const params = new URLSearchParams();
    
    ['timezone', 'theme', 'font', 'color', 'accent', 'bg', 'borderRadius', 'scale', 'format', 'animation', 'textBorderSize', 'textBorderColor', 'customCss'].forEach(key => {
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

const cssChips = document.querySelectorAll('.chip');
const customCssArea = document.getElementById('customCss');

cssChips.forEach(chip => {
    chip.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', e.target.dataset.selector + ' {\n  \n}');
    });
    
    chip.addEventListener('click', (e) => {
        const selector = e.target.dataset.selector + ' {\n  \n}\n';
        const start = customCssArea.selectionStart;
        const end = customCssArea.selectionEnd;
        const text = customCssArea.value;
        customCssArea.value = text.substring(0, start) + selector + text.substring(end);
        customCssArea.focus();
        customCssArea.selectionStart = customCssArea.selectionEnd = start + selector.indexOf('\n  ') + 3;
        generateUrl();
    });
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

exportBtn.addEventListener('click', () => {
    const configData = {};
    ['timezone', 'theme', 'font', 'color', 'accent', 'bg', 'borderRadius', 'scale', 'format', 'animation', 'textBorderSize', 'textBorderColor', 'customCss'].forEach(key => {
        configData[key] = inputs[key].value;
    });
    ['showHours', 'showMinutes', 'showSeconds', 'showAmPm', 'showDate', 'textShadow', 'textBorder'].forEach(key => {
        configData[key] = inputs[key].checked;
    });
    
    const blob = new Blob([JSON.stringify(configData, null, 2)], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'kyoto-config.txt';
    a.click();
    URL.revokeObjectURL(url);
});

importBtn.addEventListener('click', () => {
    importFile.click();
});

importFile.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            const configData = JSON.parse(event.target.result);
            
            ['timezone', 'theme', 'font', 'color', 'accent', 'bg', 'borderRadius', 'scale', 'format', 'animation', 'textBorderSize', 'textBorderColor', 'customCss'].forEach(key => {
                if (configData[key] !== undefined) {
                    inputs[key].value = configData[key];
                    if (key === 'borderRadius') displays.borderRadius.textContent = `${configData[key]}px`;
                    if (key === 'scale') displays.scale.textContent = `${parseFloat(configData[key]).toFixed(1)}x`;
                    if (key === 'textBorderSize') displays.textBorderSize.textContent = `${configData[key]}px`;
                }
            });

            ['showHours', 'showMinutes', 'showSeconds', 'showAmPm', 'showDate', 'textShadow', 'textBorder'].forEach(key => {
                if (configData[key] !== undefined) {
                    inputs[key].checked = configData[key];
                    if (key === 'textBorder') {
                        borderSettingsPanel.style.display = configData[key] ? 'flex' : 'none';
                    }
                }
            });
            
            generateUrl();
        } catch (err) {
            alert('Invalid configuration file. Please upload a valid kyoto-config.txt file.');
        }
        importFile.value = '';
    };
    reader.readAsText(file);
});

// Initial generation
generateUrl();
