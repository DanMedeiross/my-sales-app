import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule, MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { CategoriesDataSource, CategoriesItem } from './categories-datasource';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Category } from './category.dto';
import { CategoryService } from './category.service';
import { lastValueFrom } from 'rxjs';
import { CategoryFormComponent } from './form/form.component';
import { MatIconModule } from '@angular/material/icon';
import { LoadingBarComponent } from '../loading-bar.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styles: `
    .full-width-table {
      width: 100%;
    }`,
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatButtonModule,
    CategoryFormComponent,
    MatIconModule,
    LoadingBarComponent
  ]
})
export class CategoriesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<CategoriesItem>;

  dataSource = new MatTableDataSource<Category>();
  category!: Category;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'description', 'actions'];

  showForm: Boolean = false;
  showLoading: Boolean = false;

  constructor(private categoryService: CategoryService) { }

  // ngAfterViewInit(): void {
  //   throw new Error('Method not implemented.');
  // }
  ngOnInit(): void {
    this.loadCategories();
  }

  onNewCategoryClick() {
    this.category = {
      id: 0,
      name: '',
      description: ''
    }
    this.showForm = true;
  }

  hideCategoryForm() {
    this.showForm = false;
    this.loadCategories();
  }

  onBackForm() {
  throw new Error('Method not implemented.');
  }

  onEditCategoryClick(category: Category) {

    this.categoryService.show(category.id).subscribe(category => {
      console.log('Edit category', category);
    });
  }

  // ngAfterViewInit(): void {
  //   this.loadCategories();
  // }

  // async loadCategories(): Promise<void> {
  //   const categories = await lastValueFrom(this.categoryService.getAll());
  //   this.dataSource = new MatTableDataSource(categories);
  //   this.table.dataSource = this.dataSource;
  //   this.dataSource.sort = this.sort;
  //   this.dataSource.paginator = this.paginator;
  // }
  async loadCategories(): Promise<void> {
    this.showLoading = true;
    const categories = await lastValueFrom(this.categoryService.getAll());
    this.dataSource = new MatTableDataSource(categories);
    this.table.dataSource = this.dataSource;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.showLoading = false;
  }
  async onSave(category: Category) {
    const saved = lastValueFrom(this.categoryService.save(category));
    console.log('Saved category', saved);
    this.hideCategoryForm();
  }

  async onDeleteCategoryClick(category: Category) {
    if (confirm('Delete "${category.name}" with ID ${category.id} ?')) {
      this.showLoading = true;
      await lastValueFrom(this.categoryService.delete(category.id));
      this.showLoading = false;
      this.loadCategories();
    }
  }
}
