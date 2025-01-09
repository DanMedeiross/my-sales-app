import { SuppliersComponent } from './../suppliers.component';
import { SupplierService } from './../supplier.service';
import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { LoadingBarComponent } from '../../loading-bar.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Supplier } from '../supplier.dto';
import { lastValueFrom, Observable } from 'rxjs';
import { SuppliersFormComponent } from '../suppliers-form/suppliers-form.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-suppliers-edit',
  imports: [
    MatCardModule,
    AsyncPipe,
    LoadingBarComponent,
    RouterLink,
    SuppliersFormComponent
  ],
  templateUrl: './suppliers-edit.component.html',
  styles: ``
})
export class SuppliersEditComponent {
  route = inject(ActivatedRoute)
  router = inject(Router);
  supplierService = inject(SupplierService);
  supplier: Supplier
  supplierObservable: Observable<Supplier>;

  async ngOnInit() {
    const id: Number = +(this.route.snapshot.paramMap.get('id') || 0);
    this.supplierObservable = this.supplierService.getById(id);
    this.supplier = await lastValueFrom(this.supplierObservable);
    console.log(this.supplier);
  }

  async onSave(supplier: Supplier) {
    this.supplierObservable = this.supplierService.save(supplier);
    this.supplier = await lastValueFrom(this.supplierObservable);
    this.router.navigate(['/suppliers/show/', supplier?.id]);
  }

  onBack() {
    this.router.navigate(['/suppliers']);
  }
}
