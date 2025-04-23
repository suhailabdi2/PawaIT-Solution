<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WeatherController;
use Illuminate\Support\Facades\Log;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Debug route to verify file is loaded
Route::get('/', function () {
    Log::info('API root route hit');
    return response()->json(['message' => 'API routes file is loaded']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Simple test route
Route::get('/test', function () {
    return response()->json(['message' => 'API is working']);
});

// Weather routes
Route::get('/weather-test', function () {
    return response()->json(['message' => 'Weather route is working']);
});

// Weather controller routes
Route::get('/weather/current', [WeatherController::class, 'getCurrentWeather']);
Route::get('/weather/forecast', [WeatherController::class, 'getForecast']); 