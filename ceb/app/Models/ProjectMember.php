<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectMember extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_pm';
    protected $fillable = [
        'project_id',
        'team_member_id',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class, 'project_id', 'id_pro');
    }

    public function teamMember()
    {
        return $this->belongsTo(TeamMember::class, 'team_member_id', 'id_tm');
    }
}
