export interface User {
  id: number;
  email: string;
  username: string;
  first_name?: string;
  last_name?: string;
  telegram_url?: string;
  avatar_url?: string;
}

export interface IEvent {
  id: number;
  name: string;
  date: string;
  description: string;
  image_url: string;
  club: {
    id: number;
    name: string;
    image_url: string;
  };
  category: number;
  location: string;
}

export interface IItem {
  id: string;
  user: {
    id: number;
    avatar_url: string;
    telegram_url: string;
    username: string;
  };
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
  user: {
    id: number;
    avatar_url: string;
    telegram_url: string;
    username: string;
  };
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
