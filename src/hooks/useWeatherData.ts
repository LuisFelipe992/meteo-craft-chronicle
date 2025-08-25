import { useState, useEffect } from 'react';

export interface WeatherReading {
  temperature: number;
  humidity: number;
  pressure: number;
  rainfall: number;
  soilMoisture: number;
  timestamp: Date;
}

export interface HistoricalData {
  temperature: Array<{ time: string; value: number }>;
  humidity: Array<{ time: string; value: number }>;
  pressure: Array<{ time: string; value: number }>;
  rainfall: Array<{ time: string; value: number }>;
  soilMoisture: Array<{ time: string; value: number }>;
}

// Simulação de dados em tempo real
const generateMockReading = (): WeatherReading => ({
  temperature: 20 + Math.random() * 15, // 20-35°C
  humidity: 40 + Math.random() * 40, // 40-80%
  pressure: 1000 + Math.random() * 30, // 1000-1030 hPa
  rainfall: Math.random() * 5, // 0-5mm
  soilMoisture: 30 + Math.random() * 40, // 30-70%
  timestamp: new Date()
});

// Simulação de dados históricos
const generateHistoricalData = (): HistoricalData => {
  const hours = Array.from({ length: 24 }, (_, i) => {
    const time = new Date();
    time.setHours(time.getHours() - (23 - i));
    return time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  });

  return {
    temperature: hours.map(time => ({
      time,
      value: 18 + Math.random() * 12 + Math.sin(hours.indexOf(time) / 4) * 3
    })),
    humidity: hours.map(time => ({
      time,
      value: 50 + Math.random() * 30 + Math.cos(hours.indexOf(time) / 3) * 10
    })),
    pressure: hours.map(time => ({
      time,
      value: 1010 + Math.random() * 15 + Math.sin(hours.indexOf(time) / 6) * 5
    })),
    rainfall: hours.map(time => ({
      time,
      value: Math.random() * 3
    })),
    soilMoisture: hours.map(time => ({
      time,
      value: 40 + Math.random() * 35 + Math.sin(hours.indexOf(time) / 5) * 8
    }))
  };
};

export function useWeatherData() {
  const [currentReading, setCurrentReading] = useState<WeatherReading>(generateMockReading());
  const [historicalData] = useState<HistoricalData>(generateHistoricalData());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReading(generateMockReading());
    }, 5000); // Atualiza a cada 5 segundos

    return () => clearInterval(interval);
  }, []);

  return { currentReading, historicalData };
}