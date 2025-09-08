<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Services\SystemDatabaseManager;
use App\Models\maintenance\system\System;
use Symfony\Component\HttpFoundation\Response;

class SystemConnectionMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        $system_id = $request->header('X-System-ID'); 

        if ($system_id) {
            $system = System::find($system_id);

            if (!$system) {
                return response()->json(['error' => 'Invalid system selected'], 400);
            }

            app(SystemDatabaseManager::class)->connect($system);

            $request->attributes->set('system', $system);
        } else {
            return response()->json(['error' => 'System ID header missing'], 400);
        }

        return $next($request);
    }
}
