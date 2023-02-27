<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CommentVote extends Model
{
    use HasFactory;
    protected $fillable = ['user_id', 'votedup', 'voteddown', 'comment_id'];
    public $timestamps = false;
    public function user()
    {
        $this->belongsToMany(User::class);
    }
    public function comments()
    {
        $this->belongsToMany(Comment::class);
    }
}
