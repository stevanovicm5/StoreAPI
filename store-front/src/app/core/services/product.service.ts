import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/api/product';

  getAll(): Observable<Product[]>{
    return this.http.get<Product[]>(this.apiUrl);
  }

getById(id: string): Observable<Product>{
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
}
