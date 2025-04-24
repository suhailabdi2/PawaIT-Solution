'use client';

import React, { useState, useEffect } from 'react';
import { SearchBar } from '../components/SearchBar';
import { WeatherCard } from '../components/WeatherCard';
import { ForecastCard } from '../components/ForecastCard';
import { weatherService } from '../services/weatherService';
import { CurrentWeatherResponse, ForecastResponse } from '../types/weather';
import { getWeatherBackground } from '../utils/weatherUtils';

export default function Home() {
    const [currentWeather, setCurrentWeather] = useState<CurrentWeatherResponse | null>(null);
    const [forecast, setForecast] = useState<ForecastResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isCelsius, setIsCelsius] = useState(true);
    const [backgroundClass, setBackgroundClass] = useState('from-blue-900 to-blue-700');

    const fetchWeatherData = async (city: string) => {
        setLoading(true);
        setError(null);
        try {
            const [current, forecastData] = await Promise.all([
                weatherService.getCurrentWeather(city),
                weatherService.getForecast(city)
            ]);
            setCurrentWeather(current);
            setForecast(forecastData);
            
            if (current.weather[0]) {
                setBackgroundClass(getWeatherBackground(current.weather[0].main));
            }
        } catch (err) {
            setError('Failed to fetch weather data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (city: string) => {
        fetchWeatherData(city);
    };

    const toggleTemperatureUnit = () => {
        setIsCelsius(!isCelsius);
    };

    const convertTemperature = (temp: number) => {
        return isCelsius ? temp : (temp * 9/5) + 32;
    };

    const getUniqueDays = () => {
        if (!forecast) return [];
        
        const uniqueDays = new Set();
        const nextDays = forecast.list.filter(item => {
            const date = new Date(item.dt_txt);
            const day = date.toDateString();
            
            if (!uniqueDays.has(day) && uniqueDays.size < 4) {
                uniqueDays.add(day);
                return true;
            }
            return false;
        });
        
        return nextDays;
    };

    return (
        <main className={`min-h-screen bg-gradient-to-b ${backgroundClass} py-8 transition-colors duration-500`}>
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-8 items-start justify-between mb-8">
                    <h1 className="text-4xl font-bold text-white">Weather Dashboard</h1>
                    <div className="flex items-center gap-4">
                        <SearchBar onSearch={handleSearch} />
                        <button
                            onClick={toggleTemperatureUnit}
                            className="bg-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors duration-200 backdrop-blur-sm"
                        >
                            {isCelsius ? '°C' : '°F'}
                        </button>
                    </div>
                </div>

                {loading && (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
                    </div>
                )}

                {error && (
                    <div className="text-center text-red-300 mb-8 bg-red-500/20 p-4 rounded-xl backdrop-blur-sm">
                        {error}
                    </div>
                )}

                {currentWeather && (
                    <div className="flex flex-col lg:flex-row gap-8">
                        {forecast && (
                            <div className="lg:w-1/3 grid grid-cols-1 gap-4">
                                {getUniqueDays().map((item, index) => (
                                    <ForecastCard 
                                        key={index} 
                                        forecast={item}
                                        isCelsius={isCelsius}
                                        convertTemperature={convertTemperature}
                                    />
                                ))}
                            </div>
                        )}
                        <div className="lg:w-2/3">
                            <WeatherCard 
                                weather={currentWeather} 
                                isCelsius={isCelsius}
                                convertTemperature={convertTemperature}
                            />
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
