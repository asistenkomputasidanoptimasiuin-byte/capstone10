// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');

if (hamburger && menu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        menu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.menu a').forEach(n => n.addEventListener('click', () => {
    if (hamburger && menu) {
        hamburger.classList.remove('active');
        menu.classList.remove('active');
    }
}));

// Animasi Ikan yang Lebih Cepat dan Random
// Animasi Ikan yang Lebih Smooth dan Variatif
// Animasi Ikan Full Layar
class FishAnimation {
    constructor() {
        this.fishContainer = document.getElementById('fish-container');
        this.fishEmojis = ['🐠', '🐟', '🐡', '🦈', '🐬', '🐋', '🦐', '🐙'];
        this.maxFish = 15; // Sedikit lebih banyak ikan untuk full layar
        this.activeFish = [];
        
        this.init();
    }
    
    init() {
        // Pastikan container memiliki tinggi penuh
        this.fishContainer.style.height = '100vh';
        
        this.createFish();
        setInterval(() => {
            this.manageFish();
        }, 1000);
    }
    
    createFish() {
        for (let i = 0; i < this.maxFish; i++) {
            setTimeout(() => {
                this.spawnFish();
            }, i * 300);
        }
    }
    
    spawnFish() {
        if (this.activeFish.length >= this.maxFish) return;
        
        const fish = document.createElement('div');
        fish.className = 'fish';
        fish.textContent = this.getRandomFishEmoji();
        
        // Tentukan arah berenang (50% kiri->kanan, 50% kanan->kiri)
        const direction = Math.random() < 0.5 ? 'right' : 'left';
        
        // Ukuran ikan lebih terkontrol (tidak terlalu kecil atau besar)
        const size = Math.random() * 0.6 + 0.7; // 0.7 - 1.3
        const fontSize = size * 2.5; // Base size 2.5rem
        
        // Durasi lebih variatif
        const duration = Math.random() * 8 + 12; // 12-20 detik
        
        // Posisi Y acak di seluruh layar (5% - 95%)
        const startY = Math.random() * 90 + 5; 
        
        // Opacity lebih natural
        const opacity = Math.random() * 0.3 + 0.7; // 0.7 - 1.0
        
        // Tentukan jenis animasi (70% linear, 30% melengkung)
        const animationType = Math.random() < 0.7 ? 'linear' : 'curve';
        
        fish.style.fontSize = `${fontSize}rem`;
        fish.style.setProperty('--fish-opacity', opacity);
        fish.style.setProperty('--fish-direction', direction === 'right' ? '1' : '-1');
        
        if (animationType === 'linear') {
            this.setupLinearAnimation(fish, direction, duration, startY);
        } else {
            this.setupCurveAnimation(fish, direction, duration, startY);
        }
        
        this.fishContainer.appendChild(fish);
        this.activeFish.push(fish);
        
        // Remove fish after animation completes
        setTimeout(() => {
            if (fish.parentNode) {
                fish.parentNode.removeChild(fish);
                this.activeFish = this.activeFish.filter(f => f !== fish);
            }
        }, (duration + 1) * 1000);
    }
    
    setupLinearAnimation(fish, direction, duration, startY) {
        const animationName = direction === 'right' ? 'swim-right' : 'swim-left';
        
        // Variasi pada posisi akhir Y (lebih besar range-nya)
        const endY = startY + (Math.random() * 60 - 30); // ±30% dari startY
        
        // Rotasi halus
        const startRotate = Math.random() * 15 - 7.5; // -7.5° to 7.5°
        const endRotate = startRotate + (Math.random() * 10 - 5);
        
        fish.style.setProperty('--start-y', `${startY}vh`); // Gunakan vh unit
        fish.style.setProperty('--end-y', `${endY}vh`); // Gunakan vh unit
        fish.style.setProperty('--start-rotate', `${startRotate}deg`);
        fish.style.setProperty('--end-rotate', `${endRotate}deg`);
        
        fish.style.animationName = animationName;
        fish.style.animationDuration = `${duration}s`;
        fish.style.animationTimingFunction = 'linear';
    }
    
    setupCurveAnimation(fish, direction, duration, startY) {
        const startX = direction === 'right' ? -100 : window.innerWidth + 100;
        const endX = direction === 'right' ? window.innerWidth + 100 : -100;
        
        // Posisi Y akhir yang lebih variatif
        const endY = Math.random() * 90 + 5;
        
        // Kurva yang lebih dramatis untuk full layar
        const curveX = (window.innerWidth / 2) + (Math.random() * 300 - 150);
        const curveY = (Math.random() * 80 - 40); // Perubahan Y yang lebih besar
        
        // Rotasi yang mengikuti kurva
        const startRotate = Math.random() * 20 - 10;
        const midRotate = startRotate + (Math.random() * 40 - 20);
        const endRotate = midRotate + (Math.random() * 20 - 10);
        
        fish.style.setProperty('--start-x', `${startX}px`);
        fish.style.setProperty('--start-y', `${startY}vh`);
        fish.style.setProperty('--end-x', `${endX}px`);
        fish.style.setProperty('--end-y', `${endY}vh`);
        fish.style.setProperty('--curve-x', `${curveX}px`);
        fish.style.setProperty('--curve-y', `${curveY}vh`);
        fish.style.setProperty('--start-rotate', `${startRotate}deg`);
        fish.style.setProperty('--mid-rotate', `${midRotate}deg`);
        fish.style.setProperty('--end-rotate', `${endRotate}deg`);
        
        fish.style.animationName = 'swim-curve';
        fish.style.animationDuration = `${duration}s`;
        fish.style.animationTimingFunction = 'ease-in-out';
    }
    
    getRandomFishEmoji() {
        return this.fishEmojis[Math.floor(Math.random() * this.fishEmojis.length)];
    }
    
    manageFish() {
        // Spawn ikan baru dengan probabilitas lebih tinggi untuk full layar
        if (this.activeFish.length < this.maxFish && Math.random() > 0.4) {
            this.spawnFish();
        }
        
        // Kadang-kadang spawn 2 ikan sekaligus
        if (this.activeFish.length < this.maxFish - 1 && Math.random() > 0.8) {
            setTimeout(() => this.spawnFish(), 200);
            setTimeout(() => this.spawnFish(), 600);
        }
    }
    
    pause() {
        // Pause semua animasi ikan
        this.activeFish.forEach(fish => {
            fish.style.animationPlayState = 'paused';
        });
    }
    
    resume() {
        // Resume semua animasi ikan
        this.activeFish.forEach(fish => {
            fish.style.animationPlayState = 'running';
        });
    }
}

// Sensor Data Simulation
// Sensor Data Simulation (Tanpa Ammonia)
class SensorData {
    constructor() {
        this.sensors = {
            'PH': { 
                value: 20, 
                unit: 'pH', 
                min: 0, 
                max: 14,
                normalRange: [6.5, 8.5],
                warningRange: [5.5, 6.4],
                dangerRange: [0, 5.4]
            },
            'Kekeruhan': { 
                value: 20, 
                unit: 'NTU', 
                min: 0, 
                max: 100,
                normalRange: [0, 30],
                warningRange: [31, 60],
                dangerRange: [61, 100]
            },
            'TDS': { 
                value: 20, 
                unit: 'ppm', 
                min: 0, 
                max: 1000,
                normalRange: [0, 300],
                warningRange: [301, 600],
                dangerRange: [601, 1000]
            },
            'Suhu': { 
                value: 20, 
                unit: '°C', 
                min: 10, 
                max: 40,
                normalRange: [22, 28],
                warningRange: [18, 21],
                dangerRange: [10, 17]
            },
            'Water Level': { 
                value: 20, 
                unit: 'cm', 
                min: 0, 
                max: 100,
                normalRange: [30, 70],
                warningRange: [20, 29],
                dangerRange: [0, 19]
            }
        };
        
        this.init();
    }
    
    
    init() {
        this.updateSensorDisplays();
        this.startSimulation();
        
        // Add click handlers for sensor cards
        document.querySelectorAll('.data-box').forEach((box, index) => {
            box.addEventListener('click', (e) => {
                this.handleSensorClick(e, index);
            });
        });
    }
    
    updateSensorDisplays() {
        const sensorNames = Object.keys(this.sensors);
        const dataBoxes = document.querySelectorAll('.data-box');
        
        dataBoxes.forEach((box, index) => {
            if (index < sensorNames.length) {
                const sensor = sensorNames[index];
                const data = this.sensors[sensor];
                box.innerHTML = `
                    <div>${sensor}</div>
                    <div style="font-size: 1.8rem; margin-top: 10px;">${data.value}</div>
                    <div style="font-size: 0.8rem; margin-top: 5px;">${data.unit}</div>
                `;
            }
        });
    }
    
    simulateDataChange() {
        for (const [sensor, data] of Object.entries(this.sensors)) {
            // Random fluctuation lebih dinamis
            const change = (Math.random() - 0.5) * 4;
            let newValue = data.value + change;
            
            // Keep within bounds
            newValue = Math.max(data.min, Math.min(data.max, newValue));
            
            // Round to 1 decimal place
            data.value = Math.round(newValue * 10) / 10;
        }
        
        this.updateSensorDisplays();
    }
    
    startSimulation() {
        setInterval(() => {
            this.simulateDataChange();
        }, 2000); // Update lebih cepat
    }
    
    handleSensorClick(event, index) {
        const sensorNames = Object.keys(this.sensors);
        if (index < sensorNames.length) {
            const sensorName = sensorNames[index];
            const sensorData = this.sensors[sensorName];
            
            this.showToast(`${sensorName}: ${sensorData.value} ${sensorData.unit}`);
        }
    }
    
    showToast(message) {
        // Remove existing toast if any
        const existingToast = document.querySelector('.toast-message');
        if (existingToast) {
            existingToast.remove();
        }
        
        // Create new toast
        const toast = document.createElement('div');
        toast.className = 'toast-message';
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        // Remove toast after 2 seconds
        setTimeout(() => {
            if (toast.parentNode) {
                toast.style.animation = 'slideDown 0.3s ease-out forwards';
                setTimeout(() => {
                    if (toast.parentNode) {
                        toast.parentNode.removeChild(toast);
                    }
                }, 300);
            }
        }, 2000);
    }
}

// Interactive Elements
class InteractiveElements {
    constructor() {
        this.init();
    }
    
    init() {
        this.addHoverEffects();
        this.addClickEffects();
    }
    
    addHoverEffects() {
        // Add hover effects to interactive elements
        const interactiveElements = document.querySelectorAll('.foto-box, .contact-card, .data-box');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.transform = 'translateY(-5px)';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translateY(0)';
            });
        });
    }
    
    addClickEffects() {
        // Add click effects to foto boxes
        document.querySelectorAll('.foto-box').forEach(box => {
            box.addEventListener('click', function() {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            });
        });
    }
}

// Contact Cards Interactivity
class ContactInteractivity {
    constructor() {
        this.init();
    }
    
    init() {
        this.addContactCardEffects();
    }
    
    addContactCardEffects() {
        const contactCards = document.querySelectorAll('.contact-card');
        
        contactCards.forEach(card => {
            card.addEventListener('click', () => {
                this.handleContactCardClick(card);
            });
        });
    }
    
    handleContactCardClick(card) {
        const icon = card.querySelector('i').textContent;
        const info = card.querySelector('.contact-info').textContent;
        
        let actionMessage = '';
        
        switch(icon) {
            case '📞':
                actionMessage = `Calling ${info}...`;
                break;
            case '📧':
                actionMessage = `Email: ${info}`;
                break;
            case '📍':
                actionMessage = `Location: ${info}`;
                break;
        }
        
        this.showToast(actionMessage);
    }
    
    showToast(message) {
        const existingToast = document.querySelector('.toast-message');
        if (existingToast) {
            existingToast.remove();
        }
        
        const toast = document.createElement('div');
        toast.className = 'toast-message';
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            if (toast.parentNode) {
                toast.style.animation = 'slideDown 0.3s ease-out forwards';
                setTimeout(() => {
                    if (toast.parentNode) {
                        toast.parentNode.removeChild(toast);
                    }
                }, 300);
            }
        }, 2000);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Pastikan body memiliki tinggi penuh
    document.body.style.minHeight = '100vh';
    
    // Inisialisasi animasi ikan
    const fishAnimation = new FishAnimation();
    
    // Only initialize dashboard manager on dashboard page
    if (document.querySelector('.dashboard-container')) {
        new DashboardManager();
    }
    
    // Only initialize sensor data on dashboard page (fallback)
    if (document.querySelector('.dashboard-grid') && !document.querySelector('.dashboard-container')) {
        new SensorData();
    }
    
    // Initialize database manager on database page
    if (document.querySelector('.database-content')) {
        new DatabaseManager();
    }
    
    // Initialize home and contact manager
    if (document.querySelector('.home-container') || document.querySelector('.contact-container')) {
        new HomeContactManager();
    }
    
    new InteractiveElements();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        document.getElementById('fish-container').style.height = '100vh';
    });
    
    // Pause fish animation when page is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            fishAnimation.pause();
        } else {
            fishAnimation.resume();
        }
    });
});

// Database Management Class
class DatabaseManager {
    constructor() {
        this.currentPage = 1;
        this.itemsPerPage = 10;
        this.currentFilter = {
            date: '',
            sensor: 'all'
        };
        this.charts = {};
        
        this.init();
    }
    
    init() {
        this.loadSampleData();
        this.setupEventListeners();
        this.initializeCharts();
        this.updateStatistics();
    }
    
    loadSampleData() {
        // Sample data - tanpa ammonia
        this.sensorData = this.generateSampleData();
        this.renderTable();
    }
    
    generateSampleData() {
        const data = [];
        const now = new Date();
        
        for (let i = 0; i < 100; i++) {
            const timestamp = new Date(now - i * 3600000); // Setiap jam
            data.push({
                id: i + 1,
                timestamp: timestamp.toISOString(),
                ph: (Math.random() * 4 + 6.5).toFixed(1), // PH 6.5-10.5
                kekeruhan: (Math.random() * 50 + 10).toFixed(1), // Kekeruhan 10-60 NTU
                tds: (Math.random() * 400 + 100).toFixed(1), // TDS 100-500 ppm
                suhu: (Math.random() * 15 + 20).toFixed(1), // Suhu 20-35°C
                water_level: (Math.random() * 60 + 20).toFixed(1), // Water Level 20-80 cm
                status: this.getRandomStatus()
            });
        }
        
        return data;
    }
    
    getRandomStatus() {
        const statuses = ['normal', 'warning', 'danger'];
        return statuses[Math.floor(Math.random() * statuses.length)];
    }
    
    setupEventListeners() {
        // Filter events
        document.getElementById('date-filter').addEventListener('change', (e) => {
            this.currentFilter.date = e.target.value;
            this.applyFilters();
        });
        
        document.getElementById('sensor-filter').addEventListener('change', (e) => {
            this.currentFilter.sensor = e.target.value;
            this.applyFilters();
        });
        
        // Pagination events
        document.getElementById('prev-btn').addEventListener('click', () => {
            this.previousPage();
        });
        
        document.getElementById('next-btn').addEventListener('click', () => {
            this.nextPage();
        });
        
        // Export button
        document.getElementById('export-btn').addEventListener('click', () => {
            this.exportData();
        });
    }
    
    applyFilters() {
        this.currentPage = 1;
        this.renderTable();
        this.updateCharts();
    }
    
    renderTable() {
        const tbody = document.getElementById('data-table-body');
        const filteredData = this.getFilteredData();
        const paginatedData = this.getPaginatedData(filteredData);
        
        tbody.innerHTML = paginatedData.map(item => `
            <tr>
                <td>${this.formatDateTime(item.timestamp)}</td>
                <td>${item.ph}</td>
                <td>${item.kekeruhan}</td>
                <td>${item.tds}</td>
                <td>${item.suhu}</td>
                <td>${item.water_level}</td>
                <td><span class="status-badge status-${item.status}">${item.status.toUpperCase()}</span></td>
            </tr>
        `).join('');
        
        this.updatePagination(filteredData.length);
    }
    
    getFilteredData() {
        let filtered = [...this.sensorData];
        
        // Filter by date
        if (this.currentFilter.date) {
            filtered = filtered.filter(item => {
                const itemDate = new Date(item.timestamp).toISOString().split('T')[0];
                return itemDate === this.currentFilter.date;
            });
        }
        
        return filtered;
    }
    
    getPaginatedData(data) {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        return data.slice(startIndex, startIndex + this.itemsPerPage);
    }
    
    updatePagination(totalItems) {
        const totalPages = Math.ceil(totalItems / this.itemsPerPage);
        const pageInfo = document.getElementById('page-info');
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        
        pageInfo.textContent = `Page ${this.currentPage} of ${totalPages}`;
        prevBtn.disabled = this.currentPage === 1;
        nextBtn.disabled = this.currentPage === totalPages;
    }
    
    previousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.renderTable();
        }
    }
    
    nextPage() {
        const totalItems = this.getFilteredData().length;
        const totalPages = Math.ceil(totalItems / this.itemsPerPage);
        
        if (this.currentPage < totalPages) {
            this.currentPage++;
            this.renderTable();
        }
    }
    
    initializeCharts() {
        const chartConfig = {
            type: 'line',
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        };
        
        // Initialize chart instances - tanpa ammonia
        const chartIds = ['ph-chart', 'temperature-chart', 'kekeruhan-chart', 'water-level-chart'];
        const chartColors = {
            'ph-chart': '#1fb7be',
            'temperature-chart': '#ff6b6b',
            'kekeruhan-chart': '#4ecdc4',
            'water-level-chart': '#45b7d1'
        };
        
        chartIds.forEach(chartId => {
            const ctx = document.getElementById(chartId).getContext('2d');
            this.charts[chartId] = new Chart(ctx, {
                ...chartConfig,
                data: {
                    labels: [],
                    datasets: [{
                        label: this.getChartLabel(chartId),
                        data: [],
                        borderColor: chartColors[chartId],
                        backgroundColor: this.hexToRgba(chartColors[chartId], 0.1),
                        tension: 0.4,
                        fill: true
                    }]
                }
            });
        });
        
        this.updateCharts();
    }
    
    getChartLabel(chartId) {
        const labels = {
            'ph-chart': 'PH',
            'temperature-chart': 'Suhu (°C)',
            'kekeruhan-chart': 'Kekeruhan (NTU)',
            'water-level-chart': 'Water Level (cm)'
        };
        return labels[chartId];
    }
    
    hexToRgba(hex, alpha) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    
    updateCharts() {
        const filteredData = this.getFilteredData().slice(0, 24); // Last 24 data points
        
        const chartData = {
            'ph-chart': filteredData.map(item => item.ph),
            'temperature-chart': filteredData.map(item => item.suhu),
            'kekeruhan-chart': filteredData.map(item => item.kekeruhan),
            'water-level-chart': filteredData.map(item => item.water_level)
        };
        
        const labels = filteredData.map(item => 
            new Date(item.timestamp).toLocaleTimeString('id-ID', { 
                hour: '2-digit', 
                minute: '2-digit' 
            })
        );
        
        Object.keys(this.charts).forEach(chartId => {
            this.charts[chartId].data.labels = labels;
            this.charts[chartId].data.datasets[0].data = chartData[chartId];
            this.charts[chartId].update();
        });
    }
    
    updateStatistics() {
        const data = this.sensorData;
        
        document.getElementById('total-records').textContent = data.length;
        document.getElementById('data-today').textContent = this.getTodayDataCount();
        
        // Calculate averages - tanpa ammonia
        const avgPH = (data.reduce((sum, item) => sum + parseFloat(item.ph), 0) / data.length).toFixed(1);
        const avgSuhu = (data.reduce((sum, item) => sum + parseFloat(item.suhu), 0) / data.length).toFixed(1);
        
        document.getElementById('avg-ph').textContent = avgPH;
        document.getElementById('avg-suhu').textContent = avgSuhu;
    }
    
    getTodayDataCount() {
        const today = new Date().toISOString().split('T')[0];
        return this.sensorData.filter(item => 
            new Date(item.timestamp).toISOString().split('T')[0] === today
        ).length;
    }
    
    formatDateTime(isoString) {
        const date = new Date(isoString);
        return date.toLocaleString('id-ID', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
    
    exportData() {
        const data = this.getFilteredData();
        const csv = this.convertToCSV(data);
        this.downloadCSV(csv, 'smart-pond-data.csv');
        this.showToast('Data berhasil diexport!');
    }
    
    convertToCSV(data) {
        const headers = ['Timestamp', 'PH', 'Kekeruhan (NTU)', 'TDS (ppm)', 'Suhu (°C)', 'Water Level (cm)', 'Status'];
        const rows = data.map(item => [
            this.formatDateTime(item.timestamp),
            item.ph,
            item.kekeruhan,
            item.tds,
            item.suhu,
            item.water_level,
            item.status
        ]);
        
        return [headers, ...rows].map(row => row.join(',')).join('\n');
    }
    
    downloadCSV(csv, filename) {
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', filename);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
    
    showToast(message) {
        const existingToast = document.querySelector('.toast-message');
        if (existingToast) {
            existingToast.remove();
        }
        
        const toast = document.createElement('div');
        toast.className = 'toast-message';
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            if (toast.parentNode) {
                toast.style.animation = 'slideDown 0.3s ease-out forwards';
                setTimeout(() => {
                    if (toast.parentNode) {
                        toast.parentNode.removeChild(toast);
                    }
                }, 300);
            }
        }, 3000);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Pastikan body memiliki tinggi penuh
    document.body.style.minHeight = '100vh';
    
    // Inisialisasi animasi ikan
    const fishAnimation = new FishAnimation();
    
    // Only initialize dashboard manager on dashboard page
    if (document.querySelector('.dashboard-container')) {
        new DashboardManager();
    }
    
    // Only initialize sensor data on dashboard page (fallback)
    if (document.querySelector('.dashboard-grid') && !document.querySelector('.dashboard-container')) {
        new SensorData();
    }
    
    // Initialize database manager on database page
    if (document.querySelector('.database-content')) {
        new DatabaseManager();
    }
    
    new InteractiveElements();
    
    // Only initialize contact interactivity on contact page
    if (document.querySelector('.contact-cards')) {
        new ContactInteractivity();
    }
    
    // Add loading animation to page elements
    document.querySelectorAll('.container > *').forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
        element.classList.add('loading');
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        document.getElementById('fish-container').style.height = '100vh';
    });
    
    // Pause fish animation when page is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            fishAnimation.pause();
        } else {
            fishAnimation.resume();
        }
    });
});

// Home & Contact Interactivity
class HomeContactManager {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupFormHandling();
        this.setupSmoothScrolling();
        this.setupInteractiveElements();
    }
    
    setupFormHandling() {
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit(contactForm);
            });
        }
    }
    
    setupSmoothScrolling() {
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    setupInteractiveElements() {
        // Add hover effects to interactive elements
        document.querySelectorAll('.feature-card, .team-member, .contact-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
        
        // Add click effects to buttons
        document.querySelectorAll('.cta-button, .contact-action, .action-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            });
        });
    }
    
    handleFormSubmit(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        this.showToast('Pesan berhasil dikirim! Kami akan segera merespons.');
        form.reset();
        
        // In real implementation, you would send data to server
        console.log('Form submitted:', data);
    }
    
    showToast(message) {
        const existingToast = document.querySelector('.toast-message');
        if (existingToast) {
            existingToast.remove();
        }
        
        const toast = document.createElement('div');
        toast.className = 'toast-message';
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            if (toast.parentNode) {
                toast.style.animation = 'slideDown 0.3s ease-out forwards';
                setTimeout(() => {
                    if (toast.parentNode) {
                        toast.parentNode.removeChild(toast);
                    }
                }, 300);
            }
        }, 4000);
    }
}   

// Home & Contact dengan Gambar
class ImageContactManager {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupImageLoading();
        this.setupModal();
        this.setupFormHandling();
        this.setupSmoothScrolling();
    }
    
    setupImageLoading() {
        // Handle image loading states
        document.querySelectorAll('img').forEach(img => {
            img.addEventListener('load', () => {
                img.classList.remove('img-loading');
            });
            
            img.addEventListener('error', () => {
                img.style.display = 'none';
                const fallback = document.createElement('div');
                fallback.className = 'img-fallback';
                fallback.textContent = img.alt || 'Image';
                img.parentNode.appendChild(fallback);
            });
            
            // Add loading class initially
            if (!img.complete) {
                img.classList.add('img-loading');
            }
        });
    }
    
    setupModal() {
        const modal = document.getElementById('teamModal');
        if (!modal) return;
        
        const closeBtn = modal.querySelector('.close-modal');
        const modalGrid = modal.querySelector('.modal-team-grid');
        
        // Close modal events
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
        
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
        
        // Populate modal with team data
        this.populateTeamModal(modalGrid);
    }
    
    populateTeamModal(modalGrid) {
        const teamData = [
            {
                name: "Muhammad Solihin",
                role: "Project Manager",
                nim: "22106060038",
                skills: ["Leadership", "Planning", "Coordination"],
                responsibilities: "Mengkoordinasi seluruh tim dan memastikan project berjalan sesuai timeline"
            },
            {
                name: "Evan Raditya A.A",
                role: "Hardware Specialist", 
                nim: "22106060023",
                skills: ["Electronics", "IoT", "Sensor Integration"],
                responsibilities: "Merancang dan mengimplementasi sistem hardware dan sensor"
            },
            {
                name: "Khilya Nur Khadzlaqoh",
                role: "Software Developer",
                nim: "22106060016", 
                skills: ["Programming", "Backend", "Database"],
                responsibilities: "Mengembangkan backend system dan database management"
            },
            {
                name: "Falkur Rohman",
                role: "System Integrator",
                nim: "22106060056",
                skills: ["Integration", "Testing", "Deployment"],
                responsibilities: "Mengintegrasikan seluruh komponen dan melakukan testing sistem"
            },
            {
                name: "Hilman Nojib Pratama", 
                role: "Research & Documentation",
                nim: "22106060074",
                skills: ["Research", "Documentation", "Analysis"],
                responsibilities: "Melakukan research dan menyusun dokumentasi project"
            },
            {
                name: "Nisrina Indy Saqifa",
                role: "UI/UX Designer", 
                nim: "22106060079",
                skills: ["Design", "UX Research", "Prototyping"],
                responsibilities: "Mendesain user interface dan experience untuk aplikasi"
            },
            {
                name: "Zahra Aulia Aqza",
                role: "Quality Assurance",
                nim: "22106060050",
                skills: ["Testing", "Quality Control", "Validation"],
                responsibilities: "Memastikan kualitas sistem dan melakukan quality testing"
            }
        ];
        
        modalGrid.innerHTML = teamData.map(member => `
            <div class="modal-member">
                <div class="modal-avatar">
                    <img src="{{ url_for('static', filename='images/team-${member.name.split(' ')[0].toLowerCase()}.jpg') }}" 
                         alt="${member.name}" 
                         class="modal-avatar-img"
                         onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
                    <div class="modal-avatar-fallback" style="display: none">
                        ${member.name.split(' ')[0].charAt(0)}${member.name.split(' ')[1].charAt(0)}
                    </div>
                </div>
                <h4>${member.name}</h4>
                <p class="modal-role">${member.role}</p>
                <p class="modal-nim">${member.nim}</p>
                <div class="modal-skills">
                    ${member.skills.map(skill => `<span class="modal-skill-tag">${skill}</span>`).join('')}
                </div>
                <p class="modal-responsibilities">${member.responsibilities}</p>
            </div>
        `).join('');
    }
    
    setupFormHandling() {
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit(contactForm);
            });
        }
    }
    
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    handleFormSubmit(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        this.showToast('Pesan berhasil dikirim! Kami akan segera merespons.');
        form.reset();
        
        console.log('Form submitted:', data);
    }
    
    showToast(message) {
        const existingToast = document.querySelector('.toast-message');
        if (existingToast) {
            existingToast.remove();
        }
        
        const toast = document.createElement('div');
        toast.className = 'toast-message';
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            if (toast.parentNode) {
                toast.style.animation = 'slideDown 0.3s ease-out forwards';
                setTimeout(() => {
                    if (toast.parentNode) {
                        toast.parentNode.removeChild(toast);
                    }
                }, 300);
            }
        }, 4000);
    }
}

// Global function untuk modal team
function showTeamDetails() {
    const modal = document.getElementById('teamModal');
    if (modal) {
        modal.style.display = 'block';
    }
}