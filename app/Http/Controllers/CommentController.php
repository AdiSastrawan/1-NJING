<?php

namespace App\Http\Controllers;

use App\Http\Resources\CommentResource;
use App\Models\Comment;
use App\Models\CommentVote;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function store(Request $request, $id)
    {

        $comment = $request->input("comment");
        if ($request->input("parent_id") == null) {
            $parent_id = null;
        } else {

            $parent_id = $request->input("parent_id");
        }
        $comments = Comment::create(["user_id" => Auth::id(), "post_id" => $id, "comment" => $comment, "parent_id" => $parent_id]);
        return response()->json(["status" => "success", "comment" => $comments->comment]);
    }
    public function index()
    {
        return CommentResource::collection(Comment::with(["replies"])->get());
    }
    public function postComment($id)
    {
        if (Auth::check()) {
            $comment = Comment::with(["voted" => function ($query) {
                $query->where("user_id", Auth::id());
            }, "replies",])->where("post_id", $id)->get();
        } else {
            $comment = Comment::where("post_id", $id)->with(["replies"])->get();
        }
        return CommentResource::collection($comment);
    }
    public function destroy($id)
    {
        $comments = Comment::findOrFail($id);
        $comments->delete();
        return response()->json(["success" => true], 204);
    }
    public function vote(Request $request, $id)
    {
        $comments = Comment::findOrFail($id);
        $is_up = $request->input("isup");
        $is_down = $request->input("isdown");
        $vote = CommentVote::where('user_id', Auth::id())->where('comment_id', $id)->first();
        if (is_null($vote)) {
            $newVote = CommentVote::create(["user_id" => Auth::id(), "comment_id" => $id, "votedup" => $is_up, "voteddown" => $is_down]);
        } else {
            $vote->update(["user_id" => Auth::id(), "comment_id" => $id, "votedup" => $is_up, "voteddown" => $is_down]);
        }
        $comments->upvote = $request->input("upvote");
        $comments->downvote = $request->input("downvote");
        $comments->save();
        return response()->json(['success' => $comments], 200);
    }
}
