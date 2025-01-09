import { Component, OnInit } from '@angular/core';
import { Supplier } from '../supplier.dto';
import { lastValueFrom, Observable } from 'rxjs';
import { SupplierService } from '../supplier.service';
import { MatCardModule } from '@angular/material/card';
import { LoadingBarComponent } from '../../loading-bar.component';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SupplierCardComponent } from './supplier-card/supplier-card.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-suppliers-list',
  imports: [MatCardModule, MatButtonModule, LoadingBarComponent, AsyncPipe, RouterLink, SupplierCardComponent],
  templateUrl: './suppliers-list.component.html',
  styles: ``
})
export class SuppliersListComponent implements OnInit {
  suppliers!: Supplier[];
  supplierObservable!: Observable<Supplier[]>;

  constructor(private supplierService: SupplierService) {};

  async ngOnInit() {
    this.supplierObservable = this.supplierService.getAll();
    this.suppliers = await lastValueFrom(this.supplierObservable);
  }
}
