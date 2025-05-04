import api from "configs/api";

const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");

const getBooks = async () => {
    try {
        const response = await api.get("book?page=1&limit=30");
        console.log(response)
        return response.data;
    } catch (error) {
        throw error;
    }
};

const createBook = async (title, quantity, price) => {

    try {
        const response = await api.post("book",
            {title, quantity, price},
            {
                headers: { Authorization: `Bearer ${token}`}
            }

        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

const deleteBook = async (id) => {   
    try {
        const response = await api.delete(`book/${id}`,
            {
                headers: { Authorization: `Bearer ${token}`,
                }
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

const editBook = async (id, title, quantity, price) => {
    try {
        const response = await api.put(`book/${id}`,
            {title, quantity, price},
            {
                headers: { Authorization: `Bearer ${token}`}
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};



export { getBooks, createBook, deleteBook, editBook }