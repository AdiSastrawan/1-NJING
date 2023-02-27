<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'user' => UserResource::collection(User::select('name', 'profile_img', 'description')->where('id', $this->user_id)->get()),
            'voted' => $this->whenLoaded("voted"),
            'title' => $this->title,
            'file' => $this->file,
            'comments' => CommentResource::collection($this->whenLoaded("comments")),
            'format' => $this->format,
            'upvote' => $this->upvote,
            'downvote' => $this->downvote,
            'created_at' => $this->created_at

        ];
    }
}
