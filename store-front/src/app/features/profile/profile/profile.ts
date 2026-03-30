import { Component, inject, signal, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user/user.service';
import { AuthService } from '../../../core/services/auth/auth.service';
import { FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-profile',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly userService = inject(UserService);

  user = this.authService.currentUser;

  isLoadingProfile = signal(false);
  isLoadingPassword = signal(false);
  profileError = signal<string | null>(null);
  profileSuccess = signal<string | null>(null);
  passwordError = signal<string | null>(null);
  passwordSuccess = signal<string | null>(null);

  profileForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  passwordForm = new FormGroup({
    currentPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/[A-Z]/),
      Validators.pattern(/[a-z]/),
      Validators.pattern(/[0-9]/),
      Validators.pattern(/[^a-zA-Z0-9]/),
    ])
  });

  getNewPasswordError(): string {
    const control = this.passwordForm.controls.newPassword;
    if (control.hasError('required')) return 'New password is required';
    return 'Password must satisfy all requirements below';
  }

  hasMinLength(): boolean {
    return (this.passwordForm.controls.newPassword.value ?? '').length >= 8;
  }

  hasUppercase(): boolean {
    return /[A-Z]/.test(this.passwordForm.controls.newPassword.value ?? '');
  }

  hasLowercase(): boolean {
    return /[a-z]/.test(this.passwordForm.controls.newPassword.value ?? '');
  }

  hasNumber(): boolean {
    return /[0-9]/.test(this.passwordForm.controls.newPassword.value ?? '');
  }

  hasSpecialCharacter(): boolean {
    return /[^a-zA-Z0-9]/.test(this.passwordForm.controls.newPassword.value ?? '');
  }

  ngOnInit() {
    this.profileForm.patchValue({
      name: this.user()?.name,
      email: this.user()?.email
    });
  }

   async onUpdateProfile() {
    if (this.profileForm.invalid) return;

    this.isLoadingProfile.set(true);
    this.profileError.set(null);
    this.profileSuccess.set(null);

    try {
      const updated = await firstValueFrom(
        this.userService.update(this.user()!.id, {
          name: this.profileForm.value.name!,
          email: this.profileForm.value.email!
        })
      );

      this.authService.currentUser.set(updated);
      this.profileSuccess.set('Profile updated successfully.');
    } catch {
      this.profileError.set('Failed to update profile.');
    } finally {
      this.isLoadingProfile.set(false);
    }
  }

  async onChangePassword(formDirective: FormGroupDirective) {
    if (this.passwordForm.invalid) return;

    this.isLoadingPassword.set(true);
    this.passwordError.set(null);
    this.passwordSuccess.set(null);

    try {
      await firstValueFrom(this.userService.changePassword(this.user()!.id, {
        currentPassword: this.passwordForm.value.currentPassword!,
        newPassword: this.passwordForm.value.newPassword!
      })
    );
    this.passwordSuccess.set('Password changed successfully.');
    formDirective.resetForm({
      currentPassword: '',
      newPassword: ''
    });
    this.passwordForm.markAsPristine();
    this.passwordForm.markAsUntouched();
    }catch{
      this.passwordError.set('Failed to change password.');
    }finally{
      this.isLoadingPassword.set(false);
    }
  }

}
