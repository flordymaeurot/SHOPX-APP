import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  showPassword = false;
  loading = false;
  error = '';

  constructor(private auth: AuthService, private router: Router) {
    if (this.auth.isLoggedIn()) this.router.navigate(['/app']);
  }

  onLogin() {
    this.error = '';
    if (!this.username || !this.password) {
      this.error = 'All fields are required.';
      return;
    }
    this.loading = true;
    this.auth.login(this.username, this.password).subscribe({
      next: (user) => {
        this.loading = false;
        if (user) this.router.navigate(['/app']);
        else this.error = 'Invalid credentials. Please try again.';
      },
      error: () => {
        this.loading = false;
        this.error = 'Server unreachable. Make sure JSON Server is running on port 3000.';
      }
    });
  }
}
