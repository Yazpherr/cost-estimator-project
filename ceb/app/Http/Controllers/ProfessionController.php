<?php

namespace App\Http\Controllers;

use App\Models\Profession;
use Illuminate\Http\Request;

class ProfessionController extends Controller
{
    public function index()
    {
        return Profession::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:professions|max:255',
            'description' => 'nullable|string',
        ]);

        return Profession::create($request->all());
    }

    public function show($id)
    {
        return Profession::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $profession = Profession::findOrFail($id);

        $request->validate([
            'name' => 'required|max:255|unique:professions,name,' . $id,
            'description' => 'nullable|string',
        ]);

        $profession->update($request->all());

        return $profession;
    }

    public function destroy($id)
    {
        $profession = Profession::findOrFail($id);
        $profession->delete();

        return response()->noContent();
    }
}
