<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //ge user product
        $user_id = auth()->user()->id;

        try {
            $products = Product::where('user_id', $user_id)->get()->map(function($product){
                $product->banner_image = $product->banner_image ? asset("storage/". $product->banner_image) : null;
                return $product;
            });
            return response()->json([
                'status' => true,
                'message' => 'Products fetched successfully',
                'products' => $products
            ], 200);
        } catch (\Exception $err) {
            return response()->json([
                'status' => false,
                'message' => 'Products fetching failed',
                'error' => $err->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // store product
        $validate = Validator::make($request->all(), [
            'title' => 'required|string|max:255'
        ]);

        if ($validate->fails()) {
            return response()->json([
                'status' => false,
                'message' => $validate->errors()
            ], 422);
        }

        $data = $request->all();



        $user_id = auth()->user()->id;
        $data['user_id'] = $user_id;


        // return response()->json([
        //     'data' => $data
        // ]);

        // checking if request has file
        if ($request->hasFile('banner_image')) {
            $data['banner_image'] = $request->file('banner_image')->store('products', 'public');
        }

        // creating a product
        try {
            $product = Product::create($data);

            return response()->json([
                'status' => true,
                'message' => 'Product created successfully',
            ], 201);
        } catch (\Exception $err) {
            return response()->json([
                'status' => false,
                'message' => 'Product creation failed',
                'error' => $err->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // show product
        try {
            $product = Product::findOrFail($id);
            return response()->json([
                'status' => true,
                'message' => 'Product fetched successfully',
                'data' => $product
            ], 200);
        } catch (\Exception $err) {
            return response()->json([
                'status' => false,
                'message' => 'Product fetching failed',
                'error' => $err->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        // validate request
        $validate = Validator::make($request->all(), [
            'title' => 'required|string|max:255'
        ]);
        if ($validate->fails()) {
            return response()->json([
                'status' => false,
                'message' => $validate->errors()
            ], 422);
        }

        $data = $request->all();

        // checking if descrioption is there or not
        $data['description'] = $request->description ? $request->description : $product->description;
        $data['cost'] = $request->cost ? $request->cost : $product->cost; 

        // check if request has file
        if ($request->hasFile('banner_image')) {
            if ($product->banner_image) {
                // delete old file
                Storage::disk('public')->delete($product->banner_image);
            }
            // store new file
            $data['banner_image'] = $request->file('banner_image')->store('products', 'public');
        }

        $product->update($data);
        return response()->json([
            'status' => true,
            'message' => 'Product updated successfully',
            'data' => $product
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        // delete product
        $product->delete();
        return response()->json([
            'status' => true,
            'message' => 'Product deleted successfully'
        ], 200);
    }
}