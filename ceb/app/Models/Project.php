<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'unique_id', 'name', 'description', 'start_date', 'end_date', 'budget', 'resources'
    ];

    public function requirements()
    {
        return $this->hasMany(Requirement::class);
    }

    public function teamMembers()
    {
        return $this->belongsToMany(User::class, 'project_team')
                    ->withPivot('role')
                    ->withTimestamps();
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $latestProject = static::latest()->first();
            $model->unique_id = 'PRO-' . str_pad(optional($latestProject)->id + 1 ?? 1, 3, '0', STR_PAD_LEFT);
        });
    }
}
