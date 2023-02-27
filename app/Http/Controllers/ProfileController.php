<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProfileResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {


        $user = User::findOrFail($id);

        return new ProfileResource($user);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $user = User::findOrFail(Auth::id());
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:20',
            'email' => 'required|max:100',
            'img' => 'max:2048',
            'description' => 'max:1000',

        ]);
        if ($validator->fails()) {
            return response()->json([

                'errors' => $validator->errors()
            ], 406);
        }
        if ($request->hasFile("img")) {
            if ($user->profile_img != null) {

                unlink(public_path($user->profile_img));
            }
            $file = $request->file("img");
            $file_name = $file->getClientOriginalName();
            $file->move(

                public_path('img/profile'),
                $file_name

            );
            $user->profile_img = "img/profile/" . $file_name;
        }
        $user->description = $request->description;
        $user->email = $request->email;
        $user->name = $request->name;
        $user->save();
        return response()->json(["success " => "true", "message" => "Successfully updated "]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = User::find(Auth::id());
        auth()->user()->tokens()->delete();
        if ($user->profile_img != null) {
            unlink(public_path($user->profile_img));
        }
        $user->delete();
        return response()->json(["success" => "deleted"], 204);
    }
}
