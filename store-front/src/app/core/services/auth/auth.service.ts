import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { AuthResponse, LoginRequest, RegisterRequest, UserInfo } from '../../models/user.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient); 
  private readonly apiUrl = 'http://localhost:8080/api/auth';

  private accessToken = signal<string | null>(null);
  currentUser = signal<UserInfo | null>(null);
  isAuthenticated = computed(() => !!this.accessToken());

  async login(request: LoginRequest): Promise<{ success: boolean; error?: string}> {
    try{
      const response = await firstValueFrom(
        this.http.post<AuthResponse>(`${this.apiUrl}/login`, request, {withCredentials: true})
      );

      this.accessToken.set(response.accessToken);
      this.currentUser.set(response.user);

      return { success: true };
    }catch{
      return { success: false, error: 'Invalid email or password'}
    }
  }

  async register(request: RegisterRequest): Promise<{success: boolean; error?:string}>{
    try{
      const response = await firstValueFrom(
        this.http.post<AuthResponse>(`${this.apiUrl}/register`, request, {withCredentials: true})
      );

      this.accessToken.set(response.accessToken);
      this.currentUser.set(response.user);

      return {success: true}
    }catch{
      return{success: false, error: 'failed to register'}
    }
  }

  getAccessToken(): string | null {
  return this.accessToken();
}

  async refreshToken(): Promise<boolean> {
    try {
      const response = await firstValueFrom(
        this.http.post<AuthResponse>(`${this.apiUrl}/refresh`, {}, {withCredentials: true})
      );

      this.accessToken.set(response.accessToken);
      this.currentUser.set(response.user);

      return true;
    }catch{
      this.accessToken.set(null);
      this.currentUser.set(null);
      return false;
    }
  }

  async logout(): Promise<void> {
    try {
      await firstValueFrom(
        this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true })
      );
    } catch {
    } finally {
      this.accessToken.set(null);
      this.currentUser.set(null);
  }
}
}
