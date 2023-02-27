<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class UserAuthenticationController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:20',
            'email' => 'required|email',
            'password' => 'required|min:8',
            'confirm_password' => 'required|same:password'
        ]);
        if ($validator->fails()) {
            return response()->json([

                'errors' => $validator->errors()
            ], 406);
        }
        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $user = User::create($input);
        $data = [
            'name' => $user->name,
            'token' => $user->createToken('auth_token')->plainTextToken,
        ];
        return response()->json(['success' => true, 'message' => 'registered successfully', 'data' => $data], 201);
    }

    public function login(Request $request)
    {
        $email = $request->input('email');
        $password = $request->input('password');
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|min:8',

        ]);
        if ($validator->fails()) {
            return response()->json([

                'errors' => $validator->errors()
            ], 406);
        }
        $credentials = [
            'email' => $email,
            'password' => $password
        ];
        if (!Auth::guard('web')->attempt($credentials)) {
            return response()->json([
                'errors' => 'Incorrect Password or Email'
            ], 401);
        }
        $user = User::where('email', $request['email'])->firstOrFail();
        $token = $user->createToken('auth_token')->plainTextToken;
        $data = [
            'name' => $user->name,
            'token' => $token
        ];
        return response()->json(['success' => true, 'data' => $data]);
    }
    public function logout()
    {
        auth()->user()->tokens()->delete();

        return response()->json([
            'message' => 'Succesfully Logged out'
        ], 200);
    }
    public function userCheck()
    {
        if (Auth::check()) {
            $user = User::findOrFail(Auth::id());
            return response()->json($user);
        } else {
            return response()->json(null);
        }
    }
}
