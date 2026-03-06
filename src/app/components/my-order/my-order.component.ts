import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { Order } from '../../models/models';

@Component({
  selector: 'app-my-order',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {
  orders: Order[] = [];
  filtered: Order[] = [];
  loading = true;
  search = '';
  showModal = false;
  isEditing = false;
  saving = false;
  modalError = '';
  showDeleteConfirm = false;
  deleteId: number | null = null;
  statusOptions = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
  form: Order = this.empty();

  constructor(private data: DataService) {}
  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.data.getOrders().subscribe({
      next: o => { this.orders = o; this.filtered = o; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  empty(): Order {
    return { productId: 0, productName: '', quantity: 1, price: 0, total: 0, status: 'Pending', orderDate: new Date().toISOString().split('T')[0], customerName: '', address: '' };
  }

  computeTotal() { this.form.total = parseFloat((this.form.quantity * this.form.price).toFixed(2)); }

  openCreate() { this.form = this.empty(); this.isEditing = false; this.modalError = ''; this.showModal = true; }
  openEdit(o: Order) { this.form = { ...o }; this.isEditing = true; this.modalError = ''; this.showModal = true; }
  closeModal() { this.showModal = false; }

  save() {
    if (!this.form.productName || !this.form.customerName) { this.modalError = 'Product and customer name are required.'; return; }
    this.computeTotal(); this.saving = true; this.modalError = '';
    const op = this.isEditing && this.form.id ? this.data.updateOrder(this.form.id, this.form) : this.data.createOrder(this.form);
    op.subscribe({
      next: () => { this.saving = false; this.closeModal(); this.load(); },
      error: () => { this.saving = false; this.modalError = 'Save failed.'; }
    });
  }

  confirmDelete(id: number) { this.deleteId = id; this.showDeleteConfirm = true; }
  cancelDelete() { this.showDeleteConfirm = false; this.deleteId = null; }
  doDelete() {
    if (!this.deleteId) return;
    this.data.deleteOrder(this.deleteId).subscribe({ next: () => { this.showDeleteConfirm = false; this.deleteId = null; this.load(); } });
  }

  onSearch() {
    const q = this.search.toLowerCase();
    this.filtered = this.orders.filter(o => o.productName.toLowerCase().includes(q) || o.customerName.toLowerCase().includes(q) || o.status.toLowerCase().includes(q));
  }

  statusClass(s: string): string {
    const m: Record<string,string> = { 'Pending': 'badge-warning', 'Processing': 'badge-info', 'Shipped': 'badge-info', 'Delivered': 'badge-success', 'Cancelled': 'badge-danger' };
    return m[s] || 'badge-muted';
  }
}
