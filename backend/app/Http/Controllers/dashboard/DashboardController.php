<?php

namespace App\Http\Controllers\dashboard;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class DashboardController extends Controller
{
    // public function index()
    // {
    //     $users_count = DB::table('users')->count();

    //     return response()->json([
    //         'users_count' => $users_count,
    //     ]);
    // }


    // public function index()
    // {
      
    //     $system_id = request()->header('X-System-ID');
    //     $system = DB::connection('mysql')->table('systems')->find($system_id);

    //     $users_count = DB::connection($system->system_name)->table('users')->count();

        
        

    //     return response()->json([
    //         'system_name' => $system->system_name ?? null,
    //         'users_count' => $users_count,
    //     ]);
    // }

    public function index(Request $request)
    {
        return $request->get('system');
    }
}
