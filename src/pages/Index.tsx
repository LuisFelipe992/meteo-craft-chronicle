import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WeatherWidget } from "@/components/WeatherWidget";
import { HistoryChart } from "@/components/HistoryChart";
import { useWeatherData } from "@/hooks/useWeatherData";
import { 
  Thermometer, 
  Droplets, 
  Gauge, 
  CloudRain,
  TreePine,
  Activity
} from "lucide-react";

const Index = () => {
  const { currentReading, historicalData } = useWeatherData();

  return (
    <div className="min-h-screen bg-gradient-atmosphere">
      {/* Header */}
      <header className="bg-gradient-sky text-primary-foreground p-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-3">
            <Activity className="h-8 w-8" />
            <div>
              <h1 className="text-3xl font-bold">Estação Meteorológica</h1>
              <p className="text-primary-foreground/80">
                Monitoramento em tempo real - {new Date().toLocaleString('pt-BR')}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
            <TabsTrigger value="dashboard">Tempo Real</TabsTrigger>
            <TabsTrigger value="history">Histórico</TabsTrigger>
          </TabsList>

          {/* Dashboard em Tempo Real */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <WeatherWidget
                title="Temperatura"
                value={currentReading.temperature.toFixed(1)}
                unit="°C"
                icon={Thermometer}
                color="temperature"
                trend="stable"
              />
              
              <WeatherWidget
                title="Umidade do Ar"
                value={currentReading.humidity.toFixed(0)}
                unit="%"
                icon={Droplets}
                color="humidity"
                trend="up"
              />
              
              <WeatherWidget
                title="Pressão Atmosférica"
                value={currentReading.pressure.toFixed(0)}
                unit="hPa"
                icon={Gauge}
                color="pressure"
                trend="down"
              />
              
              <WeatherWidget
                title="Precipitação"
                value={currentReading.rainfall.toFixed(1)}
                unit="mm"
                icon={CloudRain}
                color="rain"
                trend="stable"
              />
              
              <WeatherWidget
                title="Umidade do Solo"
                value={currentReading.soilMoisture.toFixed(0)}
                unit="%"
                icon={TreePine}
                color="soil"
                trend="up"
                className="md:col-span-2 lg:col-span-1"
              />
            </div>

            <div className="bg-card rounded-lg p-6 shadow-sm border">
              <h2 className="text-xl font-semibold mb-4">Status da Estação</h2>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">Online</div>
                  <div className="text-sm text-muted-foreground">Status da conexão</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">5s</div>
                  <div className="text-sm text-muted-foreground">Última atualização</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">98%</div>
                  <div className="text-sm text-muted-foreground">Precisão dos sensores</div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Análise Histórica */}
          <TabsContent value="history" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <HistoryChart
                title="Temperatura (24h)"
                data={historicalData.temperature}
                color="hsl(var(--temperature))"
                unit="°C"
              />
              
              <HistoryChart
                title="Umidade do Ar (24h)"
                data={historicalData.humidity}
                color="hsl(var(--humidity))"
                unit="%"
              />
              
              <HistoryChart
                title="Pressão Atmosférica (24h)"
                data={historicalData.pressure}
                color="hsl(var(--pressure))"
                unit="hPa"
              />
              
              <HistoryChart
                title="Precipitação (24h)"
                data={historicalData.rainfall}
                color="hsl(var(--rain))"
                unit="mm"
              />
            </div>
            
            <HistoryChart
              title="Umidade do Solo (24h)"
              data={historicalData.soilMoisture}
              color="hsl(var(--soil))"
              unit="%"
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;