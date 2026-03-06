import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { Product } from '../../models/models';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filtered: Product[] = [];
  loading = true;
  search = '';
  showModal = false;
  isEditing = false;
  saving = false;
  modalError = '';
  showDeleteConfirm = false;
  deleteId: number | null = null;
  form: Product = this.empty();

  constructor(private data: DataService) {}
  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.data.getProducts().subscribe({
      next: p => { this.products = p; this.filtered = p; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  empty(): Product { return { name: '', category: '', price: 0, stock: 0, description: '' }; }

  openCreate() { this.form = this.empty(); this.isEditing = false; this.modalError = ''; this.showModal = true; }
  openEdit(p: Product) { this.form = { ...p }; this.isEditing = true; this.modalError = ''; this.showModal = true; }
  closeModal() { this.showModal = false; }

  save() {
    if (!this.form.name || !this.form.category) { this.modalError = 'Name and category are required.'; return; }
    this.saving = true; this.modalError = '';
    const op = this.isEditing && this.form.id
      ? this.data.updateProduct(this.form.id, this.form)
      : this.data.createProduct(this.form);
    op.subscribe({
      next: () => { this.saving = false; this.closeModal(); this.load(); },
      error: () => { this.saving = false; this.modalError = 'Save failed. Try again.'; }
    });
  }

  confirmDelete(id: number) { this.deleteId = id; this.showDeleteConfirm = true; }
  cancelDelete() { this.showDeleteConfirm = false; this.deleteId = null; }
  doDelete() {
    if (!this.deleteId) return;
    this.data.deleteProduct(this.deleteId).subscribe({
      next: () => { this.showDeleteConfirm = false; this.deleteId = null; this.load(); }
    });
  }

  onSearch() {
    const q = this.search.toLowerCase();
    this.filtered = this.products.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
  }

  stockClass(s: number): string {
    if (s > 20) return 'badge-success';
    if (s > 5) return 'badge-warning';
    return 'badge-danger';
  }
}
