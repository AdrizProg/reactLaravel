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
            'name' => $this->faker->words(3, true), // Nombre aleatorio de 3 palabras
            'description' => $this->faker->paragraph(5), // Descripción aleatoria de 5 frases
            'price' => $this->faker->numberBetween(100, 10000), // Precio aleatorio entre 100 y 10000
        ];
    }
}
