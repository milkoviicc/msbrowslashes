export interface Service {
  serviceName: string;
  smallDescription: string[];
  fullDescription: string[];
  bgImgUrl: string;
  image: string;
  gallery: string[];
}

export interface Review {
  id: string;
  reviewerName: string;
  rating: number;
  comment: string;
}
