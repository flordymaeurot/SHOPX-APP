import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() collapsed = false;

  menuItems = [
    { label: 'Products List', icon: 'inventory_2', route: '/app/products', code: '01' },
    { label: 'My Order', icon: 'receipt_long', route: '/app/my-order', code: '02' },
    { label: 'Order History', icon: 'history', route: '/app/order-history', code: '03' }
  ];
}
