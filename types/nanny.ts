export interface Nanny {
  id: string;
  name: string;
  avatar_url: string;
  birthday: string;
  experience: string;
  education: string;
  kids_age: string;
  location: string;
  about: string;
  characters?: string[];
  price_per_hour: number;
  rating: number;
  reviews?: Review[];
}

export interface Review {
  comment: string;
  reviewer: string;
  rating: number;
}
