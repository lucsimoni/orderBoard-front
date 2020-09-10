import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product/product.model';
import { ProductService } from '../../services/product/product.service';
import { UtilsService } from '../../services/utils/utils.service';
import { ErrorService } from '../../services/error/error.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public products: Product[] = [];
  public searchResults: Product[];
  public isLoading: boolean = true;
  public newProductOpened: boolean = false;

  constructor(
    private productService: ProductService,
    private utilsService: UtilsService,
    private errorService: ErrorService
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getAll().subscribe(
      (res) => {
        this.products = Object.assign([], res);
        this.searchResults = [...this.products];
        this.isLoading = false;
      },
      (error) => {
        this.errorService.manageError('03:01');
        this.isLoading = false;
      }
    );
  }

  search(event: any) {
    this.searchResults = [];
    event = this.utilsService.format(event.target.value.toString());
    if (event) {
      this.products.forEach(product => {
        if (this.utilsService.format(product.name).startsWith(event))
          this.searchResults.push(product);
      });
    } else {
      this.searchResults = [...this.products];
    }
  }

}
