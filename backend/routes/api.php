<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\role\RoleController;
use App\Http\Controllers\Api\AuthenticationController;
use App\Http\Controllers\maintenance\SystemController;
use App\Http\Controllers\user_management\UserController;
use App\Http\Controllers\permission\PermissionController;


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

// ---------- Public Routes ----------
Route::post('/register', [AuthenticationController::class, 'register'])->name('register');
Route::post('/login', [AuthenticationController::class, 'login'])->name('login');

// ---------- Protected Routes ----------
Route::middleware('auth:sanctum')->group(function () {
    // Route::get('/get-user', [AuthenticationController::class, 'userInfo'])->name('get-user');
    Route::post('/logout', [AuthenticationController::class, 'logOut'])->name('logout');
    Route::get('/user_info', [AuthenticationController::class, 'userInfo'])->name('user');


    Route::get('/roles', function () {
        return \Spatie\Permission\Models\Role::select('id', 'name')->get();
    });
    Route::get('users', [UserController::class, 'index']);
    Route::post('users', [UserController::class, 'store']);
    Route::put('users/{user}', [UserController::class, 'update']);
    Route::delete('users/{user}', [UserController::class, 'destroy']);


    Route::get('/roles', [RoleController::class, 'index']);
    Route::get('/roles/read', [RoleController::class, 'read']);
    Route::post('/roles', [RoleController::class, 'store']);
    Route::put('/roles/{role}', [RoleController::class, 'update']);
    Route::delete('/roles/{role}', [RoleController::class, 'destroy']);
    Route::get('/permissions', [PermissionController::class, 'index']);


    Route::get('/permissions', [PermissionController::class, 'index']);
    Route::get('/permissions/read', [PermissionController::class, 'read']);
    Route::post('/permissions', [PermissionController::class, 'store']);
    Route::put('/permissions/{permission}', [PermissionController::class, 'update']);
    Route::delete('/permissions/{permission}', [PermissionController::class, 'destroy']);

    Route::get('/systems/read', [SystemController::class, 'read']);
    Route::get('/systems', [SystemController::class, 'index']);
    Route::post('/systems', [SystemController::class, 'store']);
    Route::get('/systems/{system}', [SystemController::class, 'edit']);
});


Route::get('/vehicle', function () {
    $vehicles = DB::connection('etrans3')
        ->table('vehicles')
        ->get();

    return response()->json($vehicles);
});

Route::get('/employee', function () {
    $employees = DB::connection('hris')
        ->table('employees')
        ->get();

    return response()->json($employees);
});