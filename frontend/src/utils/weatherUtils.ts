export const getWeatherBackground = (weatherCode: string) => {
    // Convert weather code to lowercase for case-insensitive comparison
    const code = weatherCode.toLowerCase();
    
    // Define background gradients for different weather conditions
    const backgrounds = {
        // Clear and sunny
        'clear': 'from-yellow-400 to-blue-400',
        'sunny': 'from-yellow-400 to-blue-400',
        
        // Cloudy
        'clouds': 'from-gray-400 to-blue-300',
        'partly cloudy': 'from-gray-300 to-blue-300',
        
        // Rain
        'rain': 'from-gray-600 to-blue-600',
        'drizzle': 'from-gray-500 to-blue-500',
        
        // Thunderstorm
        'thunderstorm': 'from-gray-800 to-blue-800',
        
        // Snow
        'snow': 'from-gray-200 to-blue-200',
        
        // Mist/Fog
        'mist': 'from-gray-300 to-gray-400',
        'fog': 'from-gray-300 to-gray-400',
        'haze': 'from-gray-300 to-gray-400',
        
        // Default (if no match)
        'default': 'from-blue-900 to-blue-700'
    };

    // Check for specific weather conditions
    if (code.includes('clear') || code.includes('sunny')) {
        return backgrounds.clear;
    } else if (code.includes('cloud')) {
        return backgrounds.clouds;
    } else if (code.includes('rain') || code.includes('drizzle')) {
        return backgrounds.rain;
    } else if (code.includes('thunder')) {
        return backgrounds.thunderstorm;
    } else if (code.includes('snow')) {
        return backgrounds.snow;
    } else if (code.includes('mist') || code.includes('fog') || code.includes('haze')) {
        return backgrounds.mist;
    }

    // Return default if no match found
    return backgrounds.default;
}; 