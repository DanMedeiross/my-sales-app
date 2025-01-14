import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CartService } from '../cart.service';
import { CartItem } from '../cart.dto';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-checkout',
  imports: [MatCardModule, CurrencyPipe, MatIconModule],
  templateUrl: './checkout.component.html',
  styles: ``
})
export class CheckoutComponent implements OnInit {
  cartService = inject(CartService);
  public items: CartItem[] = [];

  ngOnInit(): void {
      this.items = this.cartService.getItems();
  }

  onRemoveItem(item: CartItem) {
    this.cartService.removeItem(item);
    this.items = this.cartService.getItems();
  }
}
