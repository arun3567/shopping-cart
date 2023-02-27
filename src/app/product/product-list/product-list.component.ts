import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  @Output() selectedProduct = new EventEmitter<Product>();

  products: Product[]=[];

  searchText!: string;

  constructor(private productService: ProductService,private router : Router) { }

  ngOnInit() {
    this.products = this.productService.getProducts();
  }

  onAddcart(product : Product){
    this.productService.onAddCart(product);
  }

  onClick(index : any){
    this.productService.editting.next(index);
    console.log(index);
    this.router.navigate(['/product',index])
  }

}
