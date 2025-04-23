'use client';

import React, { useState, useEffect } from 'react';
import { SearchBar } from '../components/SearchBar';
import { WeatherCard } from '../components/WeatherCard';
import { ForecastCard } from '../components/ForecastCard';
import { weatherService } from '../services/weatherService';
import { CurrentWeatherResponse, ForecastResponse } from '../types/weather';

export default function Home() {
    const [currentWeather, setCurrentWeather] = useState<CurrentWeatherResponse | null>(null);
    const [forecast, setForecast] = useState<ForecastResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isCelsius, setIsCelsius] = useState(true);

    const fetchWeatherData = async (city: string) => {
        console.log('Starting to fetch weather data for:', city);
        setLoading(true);
        setError(null);
        try {
            console.log('Making API calls for:', city);
            const [current, forecastData] = await Promise.all([
                weatherService.getCurrentWeather(city),
                weatherService.getForecast(city)
            ]);
            console.log('Current weather response:', current);
            console.log('Forecast response:', forecastData);
            setCurrentWeather(current);
            setForecast(forecastData);
        } catch (err) {
            console.error('Error fetching weather data:', err);
            setError('Failed to fetch weather data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (city: string) => {
        console.log('Handling search for city:', city);
        fetchWeatherData(city);
    };

    const toggleTemperatureUnit = () => {
        setIsCelsius(!isCelsius);
    };

    const convertTemperature = (temp: number) => {
        return isCelsius ? temp : (temp * 9/5) + 32;
    };

    return (
        <main className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-center mb-8">Weather App</h1>
                
                <SearchBar onSearch={handleSearch} />
                
                <div className="text-center mb-4">
                    <button
                        onClick={toggleTemperatureUnit}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Switch to {isCelsius ? 'Fahrenheit' : 'Celsius'}
                    </button>
                </div>

                {loading && (
                    <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                )}

                {error && (
                    <div className="text-center text-red-500 mb-4">
                        {error}
                    </div>
                )}

                {currentWeather && (
                    <div className="mb-8">
                        <WeatherCard 
                            weather={currentWeather} 
                            isCelsius={isCelsius}
                            convertTemperature={convertTemperature}
                        />
                    </div>
                )}

                {forecast && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {forecast.list.slice(0, 3).map((item, index) => (
                            <ForecastCard 
                                key={index} 
                                forecast={item}
                                isCelsius={isCelsius}
                                convertTemperature={convertTemperature}
                            />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
