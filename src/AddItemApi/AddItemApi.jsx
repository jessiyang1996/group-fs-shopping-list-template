// imports
import axios from "axios";

// get Axios call
export const fetchItems = () => {
    return axios.get('api/shoppingList');
};

// axios POST call
export const postItems = (itemData) => {
    return axios.post(`api/shoppingList`, itemData);
};

// axios PUT (Update) call
export const updateItemPurchased = (itemId) => {
    return axios.put(`/api/hoppingList.${itemId}`);
};

// axios Delete call
export const deleteItems = (itemId) => {
    return axios.delete(`/api/shoppingList/${itemId}`);
};