import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { OrderHistory } from '../../models/models';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  history: OrderHistory[] = [];
  filtered: OrderHistory[] = [];
  loading = true;
  search = '';
  showModal = false;
  isEditing = false;
  saving = false;
  modalError = '';
  showDeleteConfirm = false;
  deleteId: number | null = null;
  statusOptions = ['Delivered', 'Cancelled', 'Returned', 'Refunded'];
  form: OrderHistory = this.empty();

  constructor(private data: DataService) {}
  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.data.getOrderHistory().subscribe({
      next: h => { this.history = h; this.filtered = h; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  empty(): OrderHistory {
    return { orderId: 0, productName: '', quantity: 1, total: 0, status: 'Delivered', orderDate: new Date().toISOString().split('T')[0], deliveredDate: null, customerName: '', address: '' };
  }

  openCreate() { this.form = this.empty(); this.isEditing = false; this.modalError = ''; this.showModal = true; }
  openEdit(h: OrderHistory) { this.form = { ...h }; this.isEditing = true; this.modalError = ''; this.showModal = true; }
  closeModal() { this.showModal = false; }

  save() {
    if (!this.form.productName || !this.form.customerName) { this.modalError = 'Product and customer name are required.'; return; }
    this.saving = true; this.modalError = '';
    const op = this.isEditing && this.form.id ? this.data.updateOrderHistory(this.form.id, this.form) : this.data.createOrderHistory(this.form);
    op.subscribe({
      next: () => { this.saving = false; this.closeModal(); this.load(); },
      error: () => { this.saving = false; this.modalError = 'Save failed.'; }
    });
  }

  confirmDelete(id: number) { this.deleteId = id; this.showDeleteConfirm = true; }
  cancelDelete() { this.showDeleteConfirm = false; this.deleteId = null; }
  doDelete() {
    if (!this.deleteId) return;
    this.data.deleteOrderHistory(this.deleteId).subscribe({ next: () => { this.showDeleteConfirm = false; this.deleteId = null; this.load(); } });
  }

  onSearch() {
    const q = this.search.toLowerCase();
    this.filtered = this.history.filter(h => h.productName.toLowerCase().includes(q) || h.customerName.toLowerCase().includes(q) || h.status.toLowerCase().includes(q));
  }

  statusClass(s: string): string {
    const m: Record<string,string> = { 'Delivered': 'badge-success', 'Cancelled': 'badge-danger', 'Returned': 'badge-warning', 'Refunded': 'badge-info' };
    return m[s] || 'badge-muted';
  }
}
