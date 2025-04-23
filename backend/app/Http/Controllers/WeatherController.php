<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class WeatherController extends Controller
{
    private $apiKey;
    private $baseUrl = 'https://api.openweathermap.org/data/2.5';
    private $geoUrl = 'http://api.openweathermap.org/geo/1.0';

    public function __construct()
    {
        $this->apiKey = env('OPENWEATHER_API_KEY');
        Log::info('WeatherController initialized with API key: ' . substr($this->apiKey, 0, 5) . '...');
    }

    private function getCoordinates($city)
    {
        Log::info('Getting coordinates for city: ' . $city);
        $response = Http::get("{$this->geoUrl}/direct", [
            'q' => $city,
            'limit' => 1,
            'appid' => $this->apiKey
        ]);

        if ($response->failed() || empty($response->json())) {
            Log::error('Failed to get coordinates for city: ' . $city);
            return null;
        }

        $data = $response->json()[0];
        Log::info('Coordinates found: ' . json_encode($data));
        return [
            'lat' => $data['lat'],
            'lon' => $data['lon']
        ];
    }

    public function getCurrentWeather(Request $request)
    {
        Log::info('Current weather request received for city: ' . $request->query('city', 'London'));
        try {
            $city = $request->query('city', 'London');
            $coordinates = $this->getCoordinates($city);

            if (!$coordinates) {
                return response()->json([
                    'error' => 'City not found',
                    'message' => 'Please check the city name and try again'
                ], 404);
            }

            $response = Http::get("{$this->baseUrl}/weather", [
                'lat' => $coordinates['lat'],
                'lon' => $coordinates['lon'],
                'appid' => $this->apiKey,
                'units' => 'metric'
            ]);

            if ($response->failed()) {
                Log::error('Weather API error: ' . json_encode($response->json()));
                return response()->json([
                    'error' => 'Failed to fetch weather data',
                    'message' => $response->json()['message'] ?? 'Unknown error'
                ], $response->status());
            }

            return response()->json($response->json());
        } catch (\Exception $e) {
            Log::error('Weather controller error: ' . $e->getMessage());
            return response()->json([
                'error' => 'Server error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function getForecast(Request $request)
    {
        Log::info('Forecast request received for city: ' . $request->query('city', 'London'));
        try {
            $city = $request->query('city', 'London');
            $coordinates = $this->getCoordinates($city);

            if (!$coordinates) {
                return response()->json([
                    'error' => 'City not found',
                    'message' => 'Please check the city name and try again'
                ], 404);
            }

            $response = Http::get("{$this->baseUrl}/forecast", [
                'lat' => $coordinates['lat'],
                'lon' => $coordinates['lon'],
                'appid' => $this->apiKey,
                'units' => 'metric'
            ]);

            if ($response->failed()) {
                Log::error('Forecast API error: ' . json_encode($response->json()));
                return response()->json([
                    'error' => 'Failed to fetch forecast data',
                    'message' => $response->json()['message'] ?? 'Unknown error'
                ], $response->status());
            }

            return response()->json($response->json());
        } catch (\Exception $e) {
            Log::error('Forecast controller error: ' . $e->getMessage());
            return response()->json([
                'error' => 'Server error',
                'message' => $e->getMessage()
            ], 500);
        }
    }
} 