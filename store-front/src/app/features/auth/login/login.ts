import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  error = signal<string | null>(null);
  isLoading = signal(false);
  showPassword = signal(false);

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/[A-Z]/),
      Validators.pattern(/[a-z]/),
      Validators.pattern(/[0-9]/),
      Validators.pattern(/[^a-zA-Z0-9]/),
    ]),
  });

  getPasswordError(): string {
    const control = this.form.controls.password;
    if (control.hasError('required')) return 'Password is required';
    return 'Password must satisfy all requirements below';
  }

  hasMinLength(): boolean {
    return (this.form.controls.password.value ?? '').length >= 8;
  }

  hasUppercase(): boolean {
    return /[A-Z]/.test(this.form.controls.password.value ?? '');
  }

  hasLowercase(): boolean {
    return /[a-z]/.test(this.form.controls.password.value ?? '');
  }

  hasNumber(): boolean {
    return /[0-9]/.test(this.form.controls.password.value ?? '');
  }

  hasSpecialCharacter(): boolean {
    return /[^a-zA-Z0-9]/.test(this.form.controls.password.value ?? '');
  }

  async onSubmit() {
    if (this.form.invalid) return;

    this.isLoading.set(true);
    this.error.set(null);

    const result = await this.authService.login({
      email: this.form.value.email!,
      password: this.form.value.password!,
    });

    if (result.success) {
      this.router.navigate(['/']);
    } else {
      this.error.set(result.error ?? 'Login failed');
    }

    this.isLoading.set(false);
  }
}
