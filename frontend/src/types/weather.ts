export interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface Main {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
}

export interface Wind {
    speed: number;
    deg: number;
}

export interface CurrentWeatherResponse {
    weather: Weather[];
    main: Main;
    wind: Wind;
    name: string;
    dt: number;
    sys: {
        country: string;
    };
}

export interface ForecastItem {
    dt: number;
    main: Main;
    weather: Weather[];
    wind: Wind;
    dt_txt: string;
}

export interface ForecastResponse {
    list: ForecastItem[];
    city: {
        name: string;
        country: string;
    };
} 