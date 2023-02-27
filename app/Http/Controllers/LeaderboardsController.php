<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class LeaderboardsController extends Controller
{
    public function mostVoted()
    {
        $user = User::withSum('posts', 'upvote')->orderByRaw('posts_sum_upvote DESC')->paginate(10);
        return response()->json(['data' => $user], 200);
    }
    public function mostPost()
    {
        $user = User::withCount('posts')->orderByRaw('posts_count DESC')->paginate(10);
        return response()->json(['data' => $user], 200);
    }
}
