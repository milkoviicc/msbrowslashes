import axios from "axios";

export const fetchServices = async () => {
    try {
        const res = await axios.get("http://91.99.227.117/api/services");
        return res.data;
    } catch (error) {
        console.error("Error fetching services:", error);
        throw new Error("Failed to fetch services");
    }
}

export const fetchReviews = async () => {
    try {
        const res = await axios.get("http://91.99.227.117/api/reviews");
        return res.data;
    } catch (error) {
        console.error("Error fetching reviews:", error);
        throw new Error("Failed to fetch reviews");
    }
}