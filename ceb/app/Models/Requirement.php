<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Requirement extends Model
{
    use HasFactory;

    protected $fillable = [
        'requirement_code',
        'project_id',
        'team_member_id',
        'function_points',
    ];

    // Relación con Project
    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    // Relación con TeamMember
    public function teamMember()
    {
        return $this->belongsTo(TeamMember::class, 'team_member_id');
    }
}
