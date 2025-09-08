<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Config;
use App\Models\maintenance\system\System;

class SystemDatabaseManager
{
    public function connect(System $system)
    {
        $connection_name = $system->system_name;

        // Forget old connection if exists
        DB::purge($connection_name);

        // Set new config
        Config::set("database.connections.{$connection_name}", [
            'driver' => 'mysql',
            'host' => $system->db_host,
            'port' => $system->db_port,
            'database' => $system->db_database,
            'username' => $system->db_username,
            'password' => $system->db_password ?? "",
            'charset' => 'utf8mb4',
            'collation' => 'utf8mb4_unicode_ci',
        ]);

        DB::reconnect($connection_name);

        DB::setDefaultConnection($connection_name);
    }
}
