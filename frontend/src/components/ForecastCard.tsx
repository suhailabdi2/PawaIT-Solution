import React from 'react';
import { ForecastItem } from '../types/weather';
import { getWeatherBackground } from '../utils/weatherUtils';

interface ForecastCardProps {
    forecast: ForecastItem;
    isCelsius: boolean;
    convertTemperature: (temp: number) => number;
}

export const ForecastCard: React.FC<ForecastCardProps> = ({ 
    forecast, 
    isCelsius, 
    convertTemperature 
}) => {
    const { main, weather, dt_txt } = forecast;
    const weatherInfo = weather[0];
    const date = new Date(dt_txt);
    const backgroundClass = getWeatherBackground(weatherInfo.main);

    // Format the date to show day name and date
    const formattedDate = date.toLocaleDateString('en-US', { 
        weekday: 'long',
        month: 'short',
        day: 'numeric'
    });

    return (
        <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg p-4 text-white hover:scale-105 transition-all duration-200">
            <p className="text-lg font-semibold mb-2">
                {formattedDate}
            </p>
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <img 
                        src={`http://openweathermap.org/img/wn/${weatherInfo.icon}@2x.png`} 
                        alt={weatherInfo.description}
                        className="w-12 h-12"
                    />
                    <p className="text-blue-100 capitalize text-sm">{weatherInfo.description}</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xl font-bold">
                        {Math.round(convertTemperature(main.temp_max))}°
                    </span>
                    <span className="text-blue-100 text-lg">
                        {Math.round(convertTemperature(main.temp_min))}°
                    </span>
                    <span className="text-blue-100 text-sm">{isCelsius ? 'C' : 'F'}</span>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
                <div className="bg-white/5 backdrop-blur-sm p-2 rounded-lg">
                    <p className="text-blue-100 text-xs">Humidity</p>
                    <p className="text-sm font-semibold">{main.humidity}%</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm p-2 rounded-lg">
                    <p className="text-blue-100 text-xs">Pressure</p>
                    <p className="text-sm font-semibold">{main.pressure} hPa</p>
                </div>
            </div>
        </div>
    );
}; 