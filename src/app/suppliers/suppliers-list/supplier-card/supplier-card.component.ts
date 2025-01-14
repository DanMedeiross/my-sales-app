import { MatCardModule } from '@angular/material/card';
import { Supplier } from './../../supplier.dto';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-supplier-card',
  imports: [MatCardModule, RouterLink],
  templateUrl: './supplier-card.component.html',
  styles: `mat-card-content:hover{
    background-color: #def;
    cursor: pointer;
  }`
})
export class SupplierCardComponent {
  @Input({required: true}) supplier: Supplier;
}
