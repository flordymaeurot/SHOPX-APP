export interface User {
  id: number;
  username: string;
  password: string;
  name: string;
  email: string;
}

export interface Product {
  id?: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  description: string;
}

export interface Order {
  id?: number;
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  total: number;
  status: string;
  orderDate: string;
  customerName: string;
  address: string;
}

export interface OrderHistory {
  id?: number;
  orderId: number;
  productName: string;
  quantity: number;
  total: number;
  status: string;
  orderDate: string;
  deliveredDate: string | null;
  customerName: string;
  address: string;
}
