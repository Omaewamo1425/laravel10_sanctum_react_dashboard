<?php

namespace App\Http\Controllers\maintenance;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\maintenance\system\System;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class SystemController extends Controller
{
    use AuthorizesRequests;
    
    public function index()
    {
        return System::all()->where('is_active', 1);
    }
    public function read(Request $request)
    {
        $query = System::query();

        if ($search = $request->query('search')) {
            $query->where('system_name', 'like', "%{$search}%");
        }

        if ($sortBy = $request->query('sort_by')) {
            $order = $request->query('order', 'asc');
            $query->orderBy($sortBy, $order);
        }

        $limit = intval($request->query('limit', 10));

        return response()->json($query->paginate($limit));
    }

    public function store(Request $request)
    {

        $this->authorize('create-system');
        
        $validated = $request->validate([
            'system_name' => 'required|string|unique:systems,system_name',
            'is_active' => 'required|boolean',
            'db_host' => 'required|string',
            'db_port' => 'required|integer',
            'db_database' => 'required|string',
            'db_username' => 'required|string',
        ]);

        $system = new System();
        $system->system_name = strtoupper($validated['system_name']);
        $system->db_host = $validated['db_host'];
        $system->db_port = $validated['db_port'];
        $system->db_database = $validated['db_database'];
        $system->db_username = $validated['db_username'];
        $system->db_password = $validated['db_password'] ?? "";
        $system->is_active   = $validated['is_active'];
        $system->created_by = $request->user()->id;
        $system->updated_by = $request->user()->id;
        $system->save();

        return response()->json([
            'status' => 'success',
            'message' => "System added successfully",
            'system' => $system
        ], 200);
    }

    public function edit(System $system)
    {
        return response()->json(
            $system->only(['id', 'system_name', 'is_active','db_host','db_port','db_database','db_username','db_password'])
        );
    }

}
