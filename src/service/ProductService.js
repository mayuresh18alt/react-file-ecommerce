import axios from 'axios';

const API_URL = 'http://localhost:8080/product';

const ProductService = {
    addProduct: async (productData, file) => {
        const formData = new FormData();
        formData.append('name', productData.name);
        formData.append('brand', productData.brand);
        formData.append('category', productData.category);
        formData.append('description', productData.description);
        formData.append('quantity', productData.quantity);
        formData.append('price', productData.price);
        formData.append('image', file);

        return axios.post(`${API_URL}/add`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    getAllProducts: (page = 0, size = 7, sortBy = 'id', sortDir = 'asc') => {
        return axios.get(`${API_URL}/all`, {
            params: {
                page,
                size,
                sortBy,
                sortDir,
            },
        });
    },

    updateProduct: async (id, productData, file) => {
        const formData = new FormData();
        formData.append('name', productData.name);
        formData.append('brand', productData.brand);
        formData.append('category', productData.category);
        formData.append('description', productData.description);
        formData.append('quantity', productData.quantity);
        formData.append('price', productData.price);

        if (file) {
            formData.append('image', file);
        }

        return axios.put(`${API_URL}/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    deleteProduct: (id) => {
        return axios.delete(`${API_URL}/${id}`);
    },
};

export default ProductService;
