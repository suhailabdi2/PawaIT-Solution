import { CurrentWeatherResponse, ForecastResponse } from '../types/weather';

const API_BASE_URL = 'http://localhost:8000';

export const weatherService = {
    async getCurrentWeather(city: string): Promise<CurrentWeatherResponse> {
        try {
            console.log('Fetching weather for:', city);
            const response = await fetch(`${API_BASE_URL}/weather/current?city=${encodeURIComponent(city)}`);
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('Weather API Error:', {
                    status: response.status,
                    statusText: response.statusText,
                    errorData
                });
                throw new Error(errorData.message || 'Failed to fetch current weather');
            }
            
            return response.json();
        } catch (error) {
            console.error('Weather Service Error:', error);
            throw error;
        }
    },

    async getForecast(city: string): Promise<ForecastResponse> {
        try {
            console.log('Fetching forecast for:', city);
            const response = await fetch(`${API_BASE_URL}/weather/forecast?city=${encodeURIComponent(city)}`);
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('Forecast API Error:', {
                    status: response.status,
                    statusText: response.statusText,
                    errorData
                });
                throw new Error(errorData.message || 'Failed to fetch forecast');
            }
            
            return response.json();
        } catch (error) {
            console.error('Forecast Service Error:', error);
            throw error;
        }
    }
}; 