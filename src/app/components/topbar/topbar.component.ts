import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/models';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent {
  @Output() toggleSidebar = new EventEmitter<void>();
  currentUser: User | null;
  showDropdown = false;

  constructor(private auth: AuthService, private router: Router) {
    this.currentUser = this.auth.getCurrentUser();
  }

  logout() { this.auth.logout(); this.router.navigate(['/login']); }

  getInitials(): string {
    return (this.currentUser?.name || 'A').split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }
}
