// Sistema de Estação Meteorológica - JavaScript Puro

class WeatherStation {
    constructor() {
        this.currentData = {};
        this.historicalData = this.generateHistoricalData();
        this.chart = null;
        this.updateInterval = null;
        this.countdownInterval = null;
        this.countdown = 5;
        
        this.init();
    }

    init() {
        this.setupTabs();
        this.setupMetricSelector();
        this.startDataUpdates();
        this.updateDisplay();
        this.startCountdown();
        this.createChart();
    }

    // Geração de dados simulados
    generateMockReading() {
        return {
            temperature: 20 + Math.random() * 15, // 20-35°C
            humidity: 40 + Math.random() * 40, // 40-80%
            pressure: 1000 + Math.random() * 30, // 1000-1030 hPa
            rainfall: Math.random() * 5, // 0-5mm
            soilMoisture: 30 + Math.random() * 40, // 30-70%
            timestamp: new Date()
        };
    }

    generateHistoricalData() {
        const data = {
            temperature: [],
            humidity: [],
            pressure: [],
            rainfall: [],
            soilMoisture: []
        };

        // Gerar dados das últimas 24 horas
        for (let i = 23; i >= 0; i--) {
            const time = new Date();
            time.setHours(time.getHours() - i);
            const timeStr = time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

            data.temperature.push({
                time: timeStr,
                value: 18 + Math.random() * 12 + Math.sin(i / 4) * 3
            });

            data.humidity.push({
                time: timeStr,
                value: 50 + Math.random() * 30 + Math.cos(i / 3) * 10
            });

            data.pressure.push({
                time: timeStr,
                value: 1010 + Math.random() * 15 + Math.sin(i / 6) * 5
            });

            data.rainfall.push({
                time: timeStr,
                value: Math.random() * 3
            });

            data.soilMoisture.push({
                time: timeStr,
                value: 40 + Math.random() * 35 + Math.sin(i / 5) * 8
            });
        }

        return data;
    }

    // Configuração das abas
    setupTabs() {
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabContents = document.querySelectorAll('.tab-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.dataset.tab;

                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));

                // Add active class to clicked button and corresponding content
                button.classList.add('active');
                document.getElementById(targetTab).classList.add('active');

                // Update chart if switching to history tab
                if (targetTab === 'history') {
                    setTimeout(() => this.updateChart(), 100);
                }
            });
        });
    }

    // Configuração do seletor de métricas
    setupMetricSelector() {
        const select = document.getElementById('metric-select');
        select.addEventListener('change', () => {
            this.updateChart();
            this.updateStats();
        });
    }

    // Atualização dos dados em tempo real
    startDataUpdates() {
        this.updateInterval = setInterval(() => {
            this.currentData = this.generateMockReading();
            this.updateDisplay();
            this.countdown = 5;
        }, 5000);
    }

    startCountdown() {
        this.countdownInterval = setInterval(() => {
            this.countdown--;
            document.getElementById('next-reading').textContent = `${this.countdown}s`;
            
            if (this.countdown <= 0) {
                this.countdown = 5;
            }
        }, 1000);
    }

    // Atualização da interface
    updateDisplay() {
        if (!this.currentData.temperature) return;

        // Atualizar valores
        document.getElementById('temperature-value').textContent = this.currentData.temperature.toFixed(1);
        document.getElementById('humidity-value').textContent = this.currentData.humidity.toFixed(1);
        document.getElementById('pressure-value').textContent = this.currentData.pressure.toFixed(1);
        document.getElementById('rainfall-value').textContent = this.currentData.rainfall.toFixed(1);
        document.getElementById('soil-moisture-value').textContent = this.currentData.soilMoisture.toFixed(1);

        // Atualizar timestamp
        document.getElementById('last-update').textContent = this.currentData.timestamp.toLocaleTimeString('pt-BR');

        // Atualizar trends (simulados)
        this.updateTrends();
    }

    updateTrends() {
        const trends = ['temperature', 'humidity', 'pressure', 'rainfall', 'soil-moisture'];
        
        trends.forEach(trend => {
            const element = document.getElementById(`${trend}-trend`);
            const randomTrend = Math.random();
            
            let trendClass, trendIcon, trendText;
            
            if (randomTrend < 0.33) {
                trendClass = 'up';
                trendIcon = '↗';
                trendText = 'Subindo';
            } else if (randomTrend < 0.66) {
                trendClass = 'down';
                trendIcon = '↘';
                trendText = 'Descendo';
            } else {
                trendClass = 'stable';
                trendIcon = '→';
                trendText = 'Estável';
            }
            
            element.className = `trend ${trendClass}`;
            element.innerHTML = `${trendIcon} ${trendText}`;
        });
    }

    // Criação e atualização do gráfico
    createChart() {
        const ctx = document.getElementById('history-chart');
        
        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Temperatura',
                    data: [],
                    borderColor: '#ef4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#ef4444',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: '#f8fafc',
                            font: {
                                size: 14
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: '#f8fafc',
                            font: {
                                size: 12
                            }
                        },
                        grid: {
                            color: 'rgba(248, 250, 252, 0.1)'
                        }
                    },
                    y: {
                        ticks: {
                            color: '#f8fafc',
                            font: {
                                size: 12
                            }
                        },
                        grid: {
                            color: 'rgba(248, 250, 252, 0.1)'
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        });

        this.updateChart();
    }

    updateChart() {
        if (!this.chart) return;

        const selectedMetric = document.getElementById('metric-select').value;
        const data = this.historicalData[selectedMetric];
        
        const metricConfig = {
            temperature: { 
                label: 'Temperatura (°C)', 
                color: '#ef4444',
                bgColor: 'rgba(239, 68, 68, 0.1)'
            },
            humidity: { 
                label: 'Umidade (%)', 
                color: '#3b82f6',
                bgColor: 'rgba(59, 130, 246, 0.1)'
            },
            pressure: { 
                label: 'Pressão (hPa)', 
                color: '#8b5cf6',
                bgColor: 'rgba(139, 92, 246, 0.1)'
            },
            rainfall: { 
                label: 'Precipitação (mm)', 
                color: '#06b6d4',
                bgColor: 'rgba(6, 182, 212, 0.1)'
            },
            soilMoisture: { 
                label: 'Umidade do Solo (%)', 
                color: '#10b981',
                bgColor: 'rgba(16, 185, 129, 0.1)'
            }
        };

        const config = metricConfig[selectedMetric];

        this.chart.data.labels = data.map(item => item.time);
        this.chart.data.datasets[0].data = data.map(item => item.value);
        this.chart.data.datasets[0].label = config.label;
        this.chart.data.datasets[0].borderColor = config.color;
        this.chart.data.datasets[0].backgroundColor = config.bgColor;
        this.chart.data.datasets[0].pointBackgroundColor = config.color;
        
        this.chart.update();
        this.updateStats();
    }

    updateStats() {
        const selectedMetric = document.getElementById('metric-select').value;
        const data = this.historicalData[selectedMetric];
        const values = data.map(item => item.value);

        const min = Math.min(...values);
        const max = Math.max(...values);
        const avg = values.reduce((a, b) => a + b, 0) / values.length;
        const current = values[values.length - 1];

        const units = {
            temperature: '°C',
            humidity: '%',
            pressure: ' hPa',
            rainfall: ' mm',
            soilMoisture: '%'
        };

        const unit = units[selectedMetric] || '';

        document.getElementById('stat-min').textContent = min.toFixed(1) + unit;
        document.getElementById('stat-max').textContent = max.toFixed(1) + unit;
        document.getElementById('stat-avg').textContent = avg.toFixed(1) + unit;
        document.getElementById('stat-current').textContent = current.toFixed(1) + unit;
    }

    // Limpeza dos intervalos
    destroy() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
        if (this.countdownInterval) {
            clearInterval(this.countdownInterval);
        }
        if (this.chart) {
            this.chart.destroy();
        }
    }
}

// Inicialização da aplicação
document.addEventListener('DOMContentLoaded', () => {
    window.weatherStation = new WeatherStation();
});

// Limpeza ao sair da página
window.addEventListener('beforeunload', () => {
    if (window.weatherStation) {
        window.weatherStation.destroy();
    }
});