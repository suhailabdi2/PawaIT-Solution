import React from 'react';
import { CurrentWeatherResponse } from '../types/weather';

interface WeatherCardProps {
    weather: CurrentWeatherResponse;
    isCelsius: boolean;
    convertTemperature: (temp: number) => number;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ 
    weather, 
    isCelsius, 
    convertTemperature 
}) => {
    const { main, weather: weatherInfo, wind, name, sys } = weather;
    const currentWeather = weatherInfo[0];

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold">{name}, {sys.country}</h2>
                    <p className="text-gray-600">{new Date().toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                    <img 
                        src={`http://openweathermap.org/img/wn/${currentWeather.icon}@2x.png`} 
                        alt={currentWeather.description}
                        className="w-16 h-16"
                    />
                    <p className="text-gray-600 capitalize">{currentWeather.description}</p>
                </div>
            </div>
            
            <div className="mt-4">
                <div className="text-4xl font-bold">
                    {Math.round(convertTemperature(main.temp))}°{isCelsius ? 'C' : 'F'}
                </div>
                <div className="text-gray-600">
                    Feels like: {Math.round(convertTemperature(main.feels_like))}°{isCelsius ? 'C' : 'F'}
                </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                    <p className="text-gray-600">Humidity</p>
                    <p className="font-semibold">{main.humidity}%</p>
                </div>
                <div>
                    <p className="text-gray-600">Wind Speed</p>
                    <p className="font-semibold">{wind.speed} m/s</p>
                </div>
                <div>
                    <p className="text-gray-600">Pressure</p>
                    <p className="font-semibold">{main.pressure} hPa</p>
                </div>
                <div>
                    <p className="text-gray-600">Wind Direction</p>
                    <p className="font-semibold">{wind.deg}°</p>
                </div>
            </div>
        </div>
    );
}; 