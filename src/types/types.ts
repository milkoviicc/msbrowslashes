export interface Service {
    id: string,
    serviceName: string,
    description: string,
    price: number,
    imageUrls: string[],
}

export interface Review {
    id: string,
    reviewerName: string,
    rating: number,
    comment: string
}

