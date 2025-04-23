<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class WeatherController extends Controller
{
    private $apiKey;
    private $baseUrl = 'https://api.openweathermap.org/data/2.5';
    private $geoUrl = 'http://api.openweathermap.org/geo/1.0';

    public function __construct()
    {
        $this->apiKey = env('OPENWEATHER_API_KEY');
    }

    private function getCoordinates($city)
    {
        $response = Http::get("{$this->geoUrl}/direct", [
            'q' => $city,
            'limit' => 1,
            'appid' => $this->apiKey
        ]);

        if ($response->failed() || empty($response->json())) {
            return null;
        }

        $data = $response->json()[0];
        return [
            'lat' => $data['lat'],
            'lon' => $data['lon']
        ];
    }

    public function getCurrentWeather(Request $request)
    {
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
                return response()->json([
                    'error' => 'Failed to fetch weather data',
                    'message' => $response->json()['message'] ?? 'Unknown error'
                ], $response->status());
            }

            return response()->json($response->json());
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Server error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function getForecast(Request $request)
    {
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
                return response()->json([
                    'error' => 'Failed to fetch forecast data',
                    'message' => $response->json()['message'] ?? 'Unknown error'
                ], $response->status());
            }

            return response()->json($response->json());
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Server error',
                'message' => $e->getMessage()
            ], 500);
        }
    }
} 