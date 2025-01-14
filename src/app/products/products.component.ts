import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [MatCardModule, RouterOutlet],
  templateUrl: './products.component.html',
  styles: ``
})
export class ProductsComponent {
}
