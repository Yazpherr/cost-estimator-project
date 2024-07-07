<?php

namespace App\Http\Controllers;

use App\Models\Salary;
use Illuminate\Http\Request;

class SalaryController extends Controller
{
    public function index()
    {
        return Salary::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'profession_id' => 'required|exists:professions,id',
            'amount' => 'required|numeric',
        ]);

        return Salary::create($request->all());
    }

    public function show($id)
    {
        return Salary::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $salary = Salary::findOrFail($id);

        $request->validate([
            'profession_id' => 'required|exists:professions,id',
            'amount' => 'required|numeric',
        ]);

        $salary->update($request->all());

        return $salary;
    }

    public function destroy($id)
    {
        $salary = Salary::findOrFail($id);
        $salary->delete();

        return response()->noContent();
    }
}
