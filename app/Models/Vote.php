<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vote extends Model
{
    use HasFactory;
    protected $fillable = ['user_id', 'votedup', 'voteddown', 'post_id'];
    public $timestamps = false;
    public function posts()
    {
        $this->belongsToMany(Post::class);
    }
    public function user()
    {
        $this->belongsToMany(User::class);
    }
}
