import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  error = signal<string | null>(null);
  isLoading = signal(false);
  showPassword = signal(false);

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
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

  getNameError(): string {
    const control = this.form.controls.name;
    if (control.hasError('required')) return 'Name is required';
    if (control.hasError('minlength')) return 'Name must be at least 2 characters';
    return '';
  }

  getEmailError(): string {
    const control = this.form.controls.email;
    if (control.hasError('required')) return 'Email is required';
    if (control.hasError('email')) return 'Invalid email format';
    return '';
  }

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

    const result = await this.authService.register({
      name: this.form.value.name!,
      email: this.form.value.email!,
      password: this.form.value.password!,
    });

    if (result.success) {
      this.router.navigate(['/']);
    } else {
      this.error.set(result.error ?? 'Registration failed.');
    }
    this.isLoading.set(false);
  }
}
