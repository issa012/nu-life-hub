export interface User {
  id: number;
  email: string;
  username: string;
}

export interface IEvent {
  id: number;
  name: string;
  date: string;
  description: string;
  image_url: string;
  club: string;
  clubIconUrl: string;
}

export interface IItem {
  id: string;
  user: string;
  name: string;
  description: string;
  price: string;
  category: string;
  image_url: string;
  created_date: string;
}

export interface IJob {
  id: number;
  name: string;
  description: string;
  created_date: string;
}

export interface IFetchFromApi<Item> {
  count: number;
  next: string | null;
  prev: string | null;
  results: Item;
}

export interface Category {
  id: number;
  name: string;
}
