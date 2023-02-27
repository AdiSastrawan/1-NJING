<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
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
            "id" => $this->id,
            "post_id" => $this->post_id,
            "parent_id" => $this->parent_id,
            'user_id' => $this->user_id,
            'user' => UserResource::collection(User::select('name', 'profile_img', 'description')->where('id', $this->user_id)->get()),
            'comment' => $this->comment,
            'replies' => CommentResource::collection($this->whenLoaded("replies")),
            'upvote' => $this->upvote,
            'downvote' => $this->downvote,
            'voted' => $this->whenLoaded("voted"),
            'created_at' => $this->created_at,
        ];
    }
}
