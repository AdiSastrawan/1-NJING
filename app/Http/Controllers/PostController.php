<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Models\Post;
use App\Models\Vote;
use App\Models\Voted;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Builder as EloquentBuilder;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

use function PHPUnit\Framework\isEmpty;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (Auth::check()) {
            return PostResource::collection(Post::with(["user", "voted" => function ($query) {
                $query->where("user_id", Auth::id());
            }, "comments"])->orderByRaw('(upvote - downvote) desc')->paginate(5));
        } else {

            return PostResource::collection(Post::with(["user", "comments"])->orderByRaw('(upvote - downvote) desc')->paginate(5));
        }
    }
    public function recent()
    {
        if (Auth::check()) {
            return PostResource::collection(Post::with(["user", "voted" => function ($query) {
                $query->where("user_id", Auth::id());
            }, "comments"])->latest()->paginate(5));
        } else {

            return PostResource::collection(Post::with(["user", "comments"])->latest()->paginate(5));
        }
    }



    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        if (!$request->hasFile('files')) {
            return response()->json([
                'status' => "404",
                "message" => "File Required"
            ], 404);
        }
        $validator = Validator::make($request->all(), [
            'title' => 'required|max:255',
            'files' => 'required|max:4096'

        ]);
        if ($validator->fails()) {
            return response()->json([

                'errors' => $validator->errors()
            ], 406);
        }

        $title = $request->input('title');
        $files = $request->file('files');
        $files_ext = $files->getClientOriginalExtension();
        $file_name = $files->getClientOriginalName();
        $format = $files_ext == "mp4"  ? "video" : "image";
        $url = $files_ext == "mp4"   ? "video/" : "img/";
        if ($files) {
            foreach ($request->files as $file) {
                // dd($file_name);
                if ($format == "video") {

                    $files->move(

                        public_path('video'),
                        $file_name

                    );
                } else {

                    $files->move(

                        public_path('img'),
                        $file_name

                    );
                }
                $post = Post::create(['user_id' => Auth::id(), 'title' => $title, 'file' =>  $url . $file_name, 'format' => $format]);
            }
        }
        if (!$post) {
            return response()->json(['failed' => "Bad Request"], 400);
        }
        return response()->json(['success' => "Data added", 'data' => new PostResource($post)], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function show(Post $post)
    {

        if (Auth::check()) {
            $post = Post::where("id", $post->id)
                ->with(["user", "voted" => function ($query) {
                    $query->where("user_id", Auth::id());
                }])->first();
            return new PostResource($post);
        } else {

            return new PostResource($post->where("id", $post->id)->with(["user"])->first());
        }
    }




    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Post $post)
    {

        $title = $request->input('title');
        $file = $request->input('file');
        $upvote = $request->input('upvote');
        $downvote = $request->input('downvote');

        $post->update(['title' => $title, 'file' => $file, 'upvote' => $upvote, 'downvote' => $downvote]);
        if (!$post) {
            return response()->json(['failed' => "Bad Request"], 400);
        }
        return response()->json(['success' => "Data Updated", 'data' => new PostResource($post)], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $post)
    {

        unlink(public_path($post->file));

        $post->delete();
        return response()->json(['success' => "Data Deleted"], 204);
    }
    public function vote(Request $request, $id)
    {
        $post = Post::find($id);
        $is_up = $request->input("isup");
        $is_down = $request->input("isdown");
        $vote = Vote::where('user_id', Auth::id())->where('post_id', $id)->first();
        if (is_null($vote)) {
            $newVote = Vote::create(["user_id" => Auth::id(), "post_id" => $id, "votedup" => $is_up, "voteddown" => $is_down]);
        } else {
            $vote->update(["user_id" => Auth::id(), "post_id" => $id, "votedup" => $is_up, "voteddown" => $is_down]);
        }
        $post->upvote = $request->input("upvote");
        $post->downvote = $request->input("downvote");
        $post->save();
        return response()->json(['success' => $post], 200);
    }
    public function getUserPost($id)
    {
        if (Auth::check()) {

            $post = Post::where("user_id", $id)->with(["user", "comments", "voted" => function ($query) {
                $query->where("user_id", Auth::id());
            }])->latest()->paginate(5);
        } else {
            $post = Post::where("user_id", $id)->with(["user", "comments",])->latest()->paginate(5);
        }
        return PostResource::collection($post);
    }
}
