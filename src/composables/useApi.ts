import { ref } from "vue";
import { fetchReviews, fetchServices } from "../api/api";
import type { Review, Service } from "../types/types";

const services = ref<Service[]>([]);
const reviews = ref<Review[]>([]);

export const useApi = () => {
    const getServices = async () => {
        services.value = await fetchServices();
    }

    const getReviews = async () => {
        reviews.value = await fetchReviews();
    }

    return {
    getServices,
    getReviews,
    services,
    reviews
  }
}