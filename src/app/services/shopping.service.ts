import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShoppingItem } from '../store/models/shopping-item.model';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ShoppingService {
  private SHOPPING_URL = 'http://localhost:3000/shopping';

  constructor(private http: HttpClient) {}

  getShoppingItems() {
    return this.http
      .get<Array<ShoppingItem>>(this.SHOPPING_URL)
      .pipe(delay(500));
  }

  addShoppingItem(item: ShoppingItem) {
    return this.http.post(this.SHOPPING_URL, item).pipe(delay(500));
  }

  deleteShoppingItem(itemId: string) {
    return this.http.delete(`${this.SHOPPING_URL}/${itemId}`).pipe(delay(500));
  }
}
