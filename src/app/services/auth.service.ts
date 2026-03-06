import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { User } from '../models/models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  private KEY = 'shopx_user';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<User | null> {
    return this.http.get<User[]>(`${this.apiUrl}/users`).pipe(
      map(users => {
        const user = users.find(u => u.username === username && u.password === password);
        if (user) localStorage.setItem(this.KEY, JSON.stringify(user));
        return user || null;
      })
    );
  }

  logout(): void { localStorage.removeItem(this.KEY); }
  isLoggedIn(): boolean { return !!localStorage.getItem(this.KEY); }
  getCurrentUser(): User | null {
    const d = localStorage.getItem(this.KEY);
    return d ? JSON.parse(d) : null;
  }
}
