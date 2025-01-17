import { Supplier } from './../supplier.dto';
import { SupplierService } from './../supplier.service';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterLink } from '@angular/router';
import { SuppliersFormComponent } from '../suppliers-form/suppliers-form.component';
import { AsyncPipe } from '@angular/common';
import { LoadingBarComponent } from '../../loading-bar.component';
import { lastValueFrom, Observable, of } from 'rxjs';

@Component({
  selector: 'app-suppliers-new',
  imports: [
    MatCardModule,
    MatButtonModule,
    SuppliersFormComponent,
    AsyncPipe,
    LoadingBarComponent,
  ],
  templateUrl: './suppliers-new.component.html',
  styles: ``
})
export class SuppliersNewComponent implements OnInit {
  router = inject(Router);
  supplierService = inject(SupplierService);
  supplierObservable!: Observable<Supplier>;
  supplier: Supplier = this.supplierService.create();

  async ngOnInit() {
    this.supplierObservable = await of(this.supplierService.create());
    this.supplier = await lastValueFrom(this.supplierObservable);
  }
  async onSave(supplier: Supplier) {
    this.supplierObservable = this.supplierService.save(supplier);
    const result = await lastValueFrom(this.supplierObservable);
    this.router.navigate(['/suppliers/show', result.id]);
  }

  onBack() {
    this.router.navigate(['suppliers']);
  }
}
