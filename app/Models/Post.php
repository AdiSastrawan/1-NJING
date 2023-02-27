<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;
    protected $fillable = ['title', 'user_id', 'file', 'upvote', 'downvote', 'format'];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function voted()
    {
        return $this->hasMany(Vote::class);
    }
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}
