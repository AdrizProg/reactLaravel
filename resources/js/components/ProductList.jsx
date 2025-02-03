import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [metaDatos, setmetaDatos] = useState([]);
    const [page, setPage] = useState(1); // Asegúrate de inicializar la página con un valor válido (como 1)

    useEffect(() => {
        // Función para obtener los productos desde el endpoint
        const fetchProducts = async () => {
            setLoading(true); // Mostrar el estado de carga mientras se realiza la solicitud
            try {
                const response = await fetch(`http://reactlaravel.test/api/products?page=${page}`, {
                    credentials: "include",
                });

                if (response.redirected) {
                    window.location.href = response.url;
                    return;
                }

                const data = await response.json();
                console.log(data.data)
                setProducts(data.data); // Asumiendo que los datos están en response.data.data
                setmetaDatos(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProducts();
    }, [page]); // Agrega `page` como dependencia para que el efecto se ejecute cuando cambie

    const deleteProduct = async (productId) => {
        if (!window.confirm("¿Estás seguro de que quieres eliminar este producto?")) return;

        try {
            await axios.get("/sanctum/csrf-cookie");

            await axios.delete(`/api/products/${productId}`, { withCredentials: true });

            alert("Producto eliminado correctamente");
            setProducts(products.filter(product => product.id !== productId));
        } catch (error) {
            console.error("Error eliminando el producto:", error);
        }
    };

    const handleChange = (event, value) => {
        setPage(value); // `value` es el número de página seleccionado en el componente Pagination
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Product List</h1>
            <ul className="space-y-4">
                {products.map((product) => (
                    <li key={product.id} className="p-4 bg-gray-100 rounded-lg shadow">
                        <h2 className="text-xl font-semibold text-gray-700">{product.name}</h2>
                        <p className="text-gray-600">{product.description}</p>
                        <p className="text-gray-800 font-bold">Price: ${product.price}</p>
                        <p className="text-gray-700">Imagen:</p>
                        <img className="w-32 h-32 object-cover rounded-md mt-2" src={product.image} alt={product.name} />
                        <button
                            className="mt-3 bg-red-500 text-red-800 py-1 px-3 rounded hover:bg-red-600"
                            onClick={() => deleteProduct(product.id)}
                        >
                            Borrar
                        </button>
                    </li>
                ))}
            </ul>
            <div className="flex justify-center mt-6">
                <Stack spacing={2}>
                    <Pagination
                        count={5}
                        color="secondary"
                        page={page}
                        onChange={handleChange}
                    />
                </Stack>
            </div>
        </div>
    );
};

export default ProductList;
