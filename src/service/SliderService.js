import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/slider'; // or the correct path

const SliderService = {

  // Fetch all sliders (no authentication required)
  getSliders: (page = 0, size = 10) => {
    return axios.get(API_BASE_URL, {
      params: {
        page: page,
        size: size,
      },
    })
    .then(response => response.data)
    .catch(error => {
      console.error("Error fetching sliders:", error);
      throw error;
    });
  },

  // Add a new slider (no authentication required)
  addProduct: (sname, file) => {
    const formData = new FormData();
    formData.append('sname', sname);
    formData.append('image', file);

    return axios.post(`${API_BASE_URL}/add`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(response => response.data)
    .catch(error => {
      console.error("Error adding product:", error);
      throw error;
    });
  },

  // Update an existing slider (no authentication required, but you can still add authorization if needed)
  updateProduct: (id, sname, file = null) => {
    const formData = new FormData();
    formData.append('sname', sname);
    if (file) {
      formData.append('image', file);
    }

    return axios.put(`${API_BASE_URL}/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(response => response.data)
    .catch(error => {
      console.error("Error updating product:", error);
      throw error;
    });
  },

  // Delete a slider (no authentication required)
  deleteProduct: (id) => {
    return axios.delete(`${API_BASE_URL}/${id}`)
        .then(response => response.data)
        .catch(error => {
            console.error("Error deleting product:", error);
            throw error;
        });
  },
};

export default SliderService;
