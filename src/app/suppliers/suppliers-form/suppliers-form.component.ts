import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Supplier } from '../supplier.dto';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-suppliers-form',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  templateUrl: './suppliers-form.component.html',
  styles: ``
})
export class SuppliersFormComponent implements OnInit {
  @Input({required: true}) supplier: Supplier
  @Output() save = new EventEmitter<Supplier>();
  @Output() back = new EventEmitter();
  supplierForm: FormGroup
  private fb = inject(FormBuilder)

  ngOnInit(): void {
    this.supplierForm = this.fb.group({
      id: [this.supplier.id],
      companyName: [
        this.supplier.companyName,
        [Validators.required, Validators.minLength(3)]
      ],
      contactName: [
        this.supplier.contactName,
        [Validators.required, Validators.minLength(3)]
      ],
      contactTitle: [this.supplier.contactTitle],
      address: this.fb.group({
        city: [this.supplier.address.city],
        country: [this.supplier.address.country],
        phone: [this.supplier.address.phone],
        postalCode: [this.supplier.address.postalCode],
        region: [this.supplier.address.region],
        street: [this.supplier.address.street]
      })
    });
  }

  onSubmit() {
    this.save.emit(this.supplierForm.value as Supplier)
  }
  onBack(event:Event) {
    event.preventDefault()
    this.back.emit()
  }
}
