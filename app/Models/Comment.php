<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;
    protected $table = "comments";
    protected $fillable = ['user_id', 'post_id', 'upvote', 'downvote', 'comment', "parent_id"];
    public function post()
    {
        return $this->belongsToMany(Post::class);
    }
    public function user()
    {
        return $this->belongsToMany(User::class);
    }
    public function voted()
    {
        return $this->hasMany(CommentVote::class);
    }
    public function replies()
    {
        return $this->hasMany(Comment::class, "parent_id");
    }
}
