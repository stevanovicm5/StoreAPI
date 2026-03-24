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
  imports: [ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register { 
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  error = signal<string | null>(null);
  isLoading = signal(false);

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  async onSubmit() {
    if (this.form.invalid) return;

    this.isLoading.set(true);
    this.error.set(null);

    const result = await this.authService.register({
      name: this.form.value.name!,
      email: this.form.value.email!,
      password: this.form.value.password!
    });

    if (result.success){
      this.router.navigate(['/']);
    }else{
      this.error.set(result.error ?? 'Registration failed.');
    }
    this.isLoading.set(false);

  }
}
