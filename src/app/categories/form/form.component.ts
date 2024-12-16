import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'category-form',
  imports: [MatButtonModule, MatInputModule, ReactiveFormsModule, MatCardModule],
  templateUrl: './form.component.html',
  styles: ``
})
export class CategoryFormComponent {
  // constructor(private fb: FormBuilder) {}
  private fb = inject(FormBuilder)
  categoryForm = this.fb.group({
    id: [null],
    name: ['', Validators.required],
    description: ['', Validators.required]
  });
}
