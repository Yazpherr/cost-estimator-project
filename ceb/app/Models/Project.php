<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_pro';
    protected $fillable = [
        'name', 'description', 'product_owner_id', 'total_function_points',
        'complexity_adjustment_values', 'estimated_effort', 'estimated_time', 'associated_costs'
    ];

    public function productOwner()
    {
        return $this->belongsTo(ProductOwner::class, 'product_owner_id', 'id_po');
    }

    public function projectMembers()
    {
        return $this->hasMany(ProjectMember::class, 'project_id', 'id_pro');
    }

    public function requirements()
    {
        return $this->hasMany(Requirement::class, 'project_id', 'id_pro');
    }
}
