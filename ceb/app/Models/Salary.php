<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Salary extends Model
{
    use HasFactory;

    protected $fillable = [
        'profession_id',
        'amount',
    ];

    // Relación con Profession
    public function profession()
    {
        return $this->belongsTo(Profession::class);
    }
}
