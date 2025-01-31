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
                const response = await fetch(`/api/products?page=${page}`);

                if (response.redirected) {
                    window.location.href = response.url;
                    return;
                }

                setProducts(response.data.data); // Asumiendo que los datos están en response.data.data
                setmetaDatos(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProducts();
    }, [page]); // Agrega `page` como dependencia para que el efecto se ejecute cuando cambie

    const handleChange = (event, value) => {
        setPage(value); // `value` es el número de página seleccionado en el componente Pagination
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <div>
                <h1>Product List</h1>
                <ul>
                    {products.map((product) => (
                        <li key={product.id}>
                            <h2>{product.name}</h2>
                            <p>{product.description}</p>
                            <p>Price: ${product.price}</p>
                            <p>Imagen: </p>
                            <img src={product.image} alt={product.name} />
                        </li>
                    ))}
                </ul>
            </div>

            <Stack spacing={2}>
                <Pagination
                    count={5}
                    color="secondary"
                    page={page}
                    onChange={handleChange}
                />
            </Stack>
        </>
    );
};

export default ProductList;
