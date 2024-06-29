<?php

use Illuminate\Database\Migrations\Migration;
use Spatie\Permission\Models\Role;
use App\Models\User;

class AssignInitialRoles extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Crear roles si no existen
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $projectManagerRole = Role::firstOrCreate(['name' => 'project-manager']);
        $teamMemberRole = Role::firstOrCreate(['name' => 'team-member']);

        // Asignar roles a usuarios existentes
        $users = User::all();
        foreach ($users as $user) {
            if ($user->role === 'admin') {
                $user->assignRole($adminRole);
            } elseif ($user->role === 'project-manager') {
                $user->assignRole($projectManagerRole);
            } elseif ($user->role === 'team-member') {
                $user->assignRole($teamMemberRole);
            }
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Lógica para revertir la asignación de roles si es necesario
    }
}
