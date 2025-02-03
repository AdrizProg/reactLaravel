<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    public function definition()
    {
        return [
            'name' => $this->faker->words(3, true), 
            'description' => $this->faker->paragraph(5), 
            'price' => $this->faker->numberBetween(100, 10000), 
            'image' => $this->faker->imageUrl('https://picsum.photos/200'),
            'user_id' => $this->faker->numberBetween(1,2)
        ];
    }
}
