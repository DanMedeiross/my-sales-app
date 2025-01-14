import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { LoadingBarComponent } from '../../loading-bar.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SupplierService } from '../supplier.service';
import { Supplier } from '../supplier.dto';
import { lastValueFrom, Observable } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-suppliers-show',
  imports: [MatCardModule, MatButtonModule, AsyncPipe, LoadingBarComponent, RouterLink],
  templateUrl: './suppliers-show.component.html',
  styles: ``
})
export class SuppliersShowComponent implements OnInit {
  route = inject(ActivatedRoute);
  supplierService = inject(SupplierService);
  supplier: Supplier;
  supplierObservable: Observable<Supplier>;

  async ngOnInit() {
    const id: Number = +(this.route.snapshot.paramMap.get('id') || 0);
    this.supplierObservable = this.supplierService.getById(id);
    this.supplier = await lastValueFrom(this.supplierObservable);
    console.log(this.supplier);
  }
}
