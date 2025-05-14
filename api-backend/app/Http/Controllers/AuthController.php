<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    //register user
    public function register(Request $request)
    {
        // validate request
        $validate = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed'
        ]);

        if ($validate->fails()) {
            return response()->json([
                'status' => false,
                'message' => $validate->errors()
            ], 422);
            # code...
        }

        try {
            // creating user
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password)
            ]);

            return response()->json([
                'status' => true,
                'message' => 'User created successfully',
                'data' => $user
            ], 201);
        } catch (\Exception $err) {
            return response()->json([
                'status' => false,
                'message' => 'User creation failed',
                'error' => $err->getMessage()
            ], 500);
        }
    }

    // login User
    public function login(Request $request)
    {
        // validating
        $validate = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string|min:6'
        ]);

        // return error while validating
        if ($validate->fails()) {
            return response()->json([
                'status' => false,
                'message' => $validate->errors()
            ], 422);
            # code...
        }

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'status' => false,
                'message' => 'Invalid credentials'
            ], 401);
        }

        $user = Auth::user();

        // generating token
        $token = $user->createToken('myToken')->plainTextToken;

        return response()->json([
            'status' => true,
            'message' => 'User logged in successfully',
            'data' => $user,
            'token' => $token
        ], 200);
    }


    public function profile()
    {
        $user = Auth::user();
        return response()->json([
            'status' => true,
            'message' => 'User profile',
            'data' => $user
        ], 200);
    }

    public function logout()
    {
        Auth::logout();

        return response()->json([
            'status' => true,
            'message' => 'User logged out successfully'
        ], 200);
    }
}