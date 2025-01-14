import { Component, inject, OnInit } from '@angular/core';
import { Supplier } from '../supplier.dto';
import { lastValueFrom, Observable } from 'rxjs';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { SupplierService } from '../supplier.service';
import { MatCardModule } from '@angular/material/card';
import { AsyncPipe } from '@angular/common';
import { LoadingBarComponent } from '../../loading-bar.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-suppliers-delete',
  imports: [MatCardModule, MatButtonModule, AsyncPipe, RouterLink, LoadingBarComponent],
  templateUrl: './suppliers-delete.component.html',
  styles: ``
})
export class SuppliersDeleteComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);
  supplierService = inject(SupplierService);
  supplier: Supplier;
  supplierObservable: Observable<Supplier>;

  async ngOnInit() {
    const id: Number = +(this.route.snapshot.paramMap.get('id') || 0);
    this.supplierObservable = this.supplierService.getById(id);
    this.supplier = await lastValueFrom(this.supplierObservable);
  }

  onBack() {
    this.router.navigate(['/suppliers/show/', this.supplier.id]);
  }

  async confirmDelete() {
    this.supplierObservable = this.supplierService.delete(this.supplier.id)
    await lastValueFrom(this.supplierObservable)
    this.router.navigate(['/suppliers']);
  }
}
