<?php

namespace App\Models\maintenance\system;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class System extends Model
{
    use HasFactory;

    protected $fillable = [
        'system_name',
        'db_host',
        'db_port',
        'db_database',
        'db_username',
        'db_password',
        'is_active',
    ];
}
