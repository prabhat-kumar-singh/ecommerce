import { API } from "../../backend";

export const getAllProductDetails = () => {
    return fetch(`${API}/products`, {
        method:"GET"
    }).then(res => res.json())
    .catch(err => console.log("Unable to fetch products", err))
}