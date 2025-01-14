import { CommonModule } from '@angular/common';
import { Component, Input, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Product } from '../product.dto';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-products-card',
  imports: [MatCardModule, CommonModule, MatIconModule],
  templateUrl: './products-card.component.html',
  styles: ``
})
export class ProductsCardComponent {
  @Input() product: Product;

  onAddToCart(product: Product) {
    console.log('TODO');
  }
}
