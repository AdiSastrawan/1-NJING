<?php
namespace App\Contracts;

use Illuminate\Database\Eloquent\Relations\MorphMany;

interface Voteable
{
public function votes(): MorphMany;
}
