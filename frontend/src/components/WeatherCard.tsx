import React from 'react';
import { CurrentWeatherResponse } from '../types/weather';
import { getWeatherBackground } from '../utils/weatherUtils';

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
    const backgroundClass = getWeatherBackground(currentWeather.main);

    return (
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-white">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h2 className="text-3xl font-bold mb-2">{name}, {sys.country}</h2>
                    <p className="text-blue-100">{new Date().toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                    })}</p>
                </div>
                <div className="text-right">
                    <img 
                        src={`http://openweathermap.org/img/wn/${currentWeather.icon}@2x.png`} 
                        alt={currentWeather.description}
                        className="w-24 h-24"
                    />
                    <p className="text-blue-100 capitalize text-lg">{currentWeather.description}</p>
                </div>
            </div>
            
            <div className="flex items-center justify-between mb-8">
                <div className="text-7xl font-bold">
                    {Math.round(convertTemperature(main.temp))}°{isCelsius ? 'C' : 'F'}
                </div>
                <div className="text-blue-100 text-xl">
                    Feels like: {Math.round(convertTemperature(main.feels_like))}°{isCelsius ? 'C' : 'F'}
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl">
                    <p className="text-blue-100 text-sm">Humidity</p>
                    <p className="text-2xl font-semibold">{main.humidity}%</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl">
                    <p className="text-blue-100 text-sm">Wind Speed</p>
                    <p className="text-2xl font-semibold">{wind.speed} m/s</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl">
                    <p className="text-blue-100 text-sm">Pressure</p>
                    <p className="text-2xl font-semibold">{main.pressure} hPa</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl">
                    <p className="text-blue-100 text-sm">Wind Direction</p>
                    <p className="text-2xl font-semibold">{wind.deg}°</p>
                </div>
            </div>
        </div>
    );
}; 