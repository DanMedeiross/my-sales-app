import { CartItem } from './../../cart.dto';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { LoadingBarComponent } from '../../loading-bar.component';
import { ProductService } from '../product.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Product } from '../product.dto';
import { lastValueFrom, Observable } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CartService } from '../../cart.service';
import { ProductsCardComponent } from '../products-card/products-card.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-products-list',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    AsyncPipe,
    LoadingBarComponent,
    CurrencyPipe,
    ProductsCardComponent
  ],
  templateUrl: './products-list.component.html',
  styles: ``
})
export class ProductsListComponent implements OnInit {
  productService = inject(ProductService);
  fb = inject(FormBuilder);
  cartService = inject(CartService);

  products: Product[];
  productsObservable: Observable<Product[]>;
  searchForm: FormGroup;

  async ngOnInit() {
   this.searchForm = this.fb.group({
    searchTerm: [''],
   });
   this.getProducts();
  }

  private async fetchProducts(searchTerm?: string) {
    this.productsObservable = this.productService.getAll(searchTerm);
    this.products = await lastValueFrom(this.productsObservable);
  }

  async onSearch() {
    await this.fetchProducts(this.searchForm.value.searchTerm);
    console.log(this.products);
  }

  private async getProducts(searchTerm?: string) {
    this.productsObservable = this.productService.getAll(searchTerm)
    this.products = await lastValueFrom(this.productsObservable)
  }

  onAddToCart(item: Product) {
    const cartItem: CartItem = {
      idProduct: item.id,
      name: item.name,
      quantity: 1,
      unitPrice: item.unitPrice
    };
    this.cartService.addItem(cartItem);
  }
}
