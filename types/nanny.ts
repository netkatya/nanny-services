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

export type SortOption =
  | "alphabet-asc"
  | "alphabet-desc"
  | "price-less-10"
  | "price-more-10"
  | "popular"
  | "not-popular"
  | "all";

export interface AppointmentFormData {
  address: string;
  phone: string;
  childAge: string;
  time: string;
  email: string;
  parentName: string;
  comment?: string;
}
