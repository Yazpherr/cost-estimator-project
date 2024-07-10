<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Requirement extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_req';
    protected $fillable = [
        'project_id',
        'team_member_id',
        'project_owner_id',
        'name',
        'component_type',
        'complexity_level',
        'function_points',
        'justification',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class, 'project_id', 'id_pro');
    }

    public function teamMember()
    {
        return $this->belongsTo(TeamMember::class, 'team_member_id', 'id_tm');
    }

    public function productOwner()
    {
        return $this->belongsTo(ProductOwner::class, 'project_owner_id', 'id_po');
    }
}
