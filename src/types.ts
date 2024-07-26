export interface Dish {
  id: string;
  title: string;
  image: string;
  price: number;
}

export type ApiDish = Omit<Dish, 'id'>;

export interface ApiDishes {
  [id: string]: ApiDish;
}

export interface DishMutation {
  title: string;
  image: string;
  price: string;
}

////////////////////
export interface CartDish {
  dish: Dish;
  amount: number;
}

export interface Customer {
  name: string;
  address: string;
  phone: string;
}

export interface AppOrder {
  customer: Customer;
  dishes: CartDish[];
}

export interface OrderDishes {
  [id: string]: number;
}

export interface ApiOrder {
  customer: Customer;
  dishes: OrderDishes;
}