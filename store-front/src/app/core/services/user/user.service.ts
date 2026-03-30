import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { ChangePasswordRequest, UpdateUserRequest, UserInfo } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiBaseUrl}/api/user`;

  getById(id: string): Observable<UserInfo>{
    return  this.http.get<UserInfo>(`${this.apiUrl}/${id}`);
  }

  update(id:string, user: UpdateUserRequest): Observable<UserInfo>{
    return this.http.patch<UserInfo>(`${this.apiUrl}/${id}`, user);
  }

  changePassword(id: string, request: ChangePasswordRequest): Observable<void>{
    return this.http.patch<void>(`${this.apiUrl}/${id}/change-password`, request);
  }
}