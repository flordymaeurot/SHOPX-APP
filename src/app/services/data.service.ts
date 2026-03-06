import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, Order, OrderHistory } from '../models/models';

@Injectable({ providedIn: 'root' })
export class DataService {
  private api = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  // Products
  getProducts(): Observable<Product[]> { return this.http.get<Product[]>(`${this.api}/products`); }
  createProduct(p: Product): Observable<Product> { return this.http.post<Product>(`${this.api}/products`, p); }
  updateProduct(id: number, p: Product): Observable<Product> { return this.http.put<Product>(`${this.api}/products/${id}`, p); }
  deleteProduct(id: number): Observable<void> { return this.http.delete<void>(`${this.api}/products/${id}`); }

  // Orders
  getOrders(): Observable<Order[]> { return this.http.get<Order[]>(`${this.api}/orders`); }
  createOrder(o: Order): Observable<Order> { return this.http.post<Order>(`${this.api}/orders`, o); }
  updateOrder(id: number, o: Order): Observable<Order> { return this.http.put<Order>(`${this.api}/orders/${id}`, o); }
  deleteOrder(id: number): Observable<void> { return this.http.delete<void>(`${this.api}/orders/${id}`); }

  // Order History
  getOrderHistory(): Observable<OrderHistory[]> { return this.http.get<OrderHistory[]>(`${this.api}/orderHistory`); }
  createOrderHistory(h: OrderHistory): Observable<OrderHistory> { return this.http.post<OrderHistory>(`${this.api}/orderHistory`, h); }
  updateOrderHistory(id: number, h: OrderHistory): Observable<OrderHistory> { return this.http.put<OrderHistory>(`${this.api}/orderHistory/${id}`, h); }
  deleteOrderHistory(id: number): Observable<void> { return this.http.delete<void>(`${this.api}/orderHistory/${id}`); }
}
