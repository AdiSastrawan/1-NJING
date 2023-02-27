<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\LeaderboardsController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserAuthenticationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('v1')->group(function () {

    Route::post('login', [UserAuthenticationController::class, 'login']);
    Route::post('register', [UserAuthenticationController::class, 'register']);
    Route::apiResource('posts', PostController::class)->only(['index', 'show']);
    Route::get('recent', [PostController::class, 'recent']);
    Route::get('comment', [CommentController::class, 'index']);
    Route::get('profile/{id}', [ProfileController::class, 'show']);
    Route::get('profile/posts/{id}', [PostController::class, 'getUserPost']);
    Route::get('comment/{id}', [CommentController::class, 'postComment']);
    Route::get('leaderboards/mostvoted', [LeaderboardsController::class, 'mostVoted']);
    Route::get('leaderboards/mostpost', [LeaderboardsController::class, 'mostPost']);
    Route::get('user', [UserAuthenticationController::class, 'userCheck']);
});

Route::prefix('v1')->middleware('auth:sanctum')->group(function () {

    Route::post('comment/{id}', [CommentController::class, 'store']);
    Route::post('logout', [UserAuthenticationController::class, 'logout']);
    Route::put('profile', [ProfileController::class, 'update']);
    Route::apiResource('posts', PostController::class)->only(['update', 'store', 'destroy']);
    Route::put('vote/{id}', [PostController::class, 'vote']);
    Route::put('comment/vote/{id}', [CommentController::class, 'vote']);

    Route::delete('comment/{id}', [CommentController::class, 'destroy']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
