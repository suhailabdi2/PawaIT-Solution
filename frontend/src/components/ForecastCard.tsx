import React from 'react';
import { ForecastItem } from '../types/weather';

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

    return (
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <p className="font-semibold">{date.toLocaleDateString('en-US', { weekday: 'short' })}</p>
            <img 
                src={`http://openweathermap.org/img/wn/${weatherInfo.icon}@2x.png`} 
                alt={weatherInfo.description}
                className="w-16 h-16 mx-auto"
            />
            <p className="text-gray-600 capitalize">{weatherInfo.description}</p>
            <div className="mt-2">
                <span className="font-bold">
                    {Math.round(convertTemperature(main.temp_max))}°{isCelsius ? 'C' : 'F'}
                </span>
                <span className="text-gray-500 ml-2">
                    {Math.round(convertTemperature(main.temp_min))}°{isCelsius ? 'C' : 'F'}
                </span>
            </div>
        </div>
    );
}; 