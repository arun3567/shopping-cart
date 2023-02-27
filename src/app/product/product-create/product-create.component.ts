import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  @ViewChild('productForm', {static : true}) productForm! : NgForm;
  constructor(public productService : ProductService,private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newProduct = new Product(value.name, value.price, value.description, value.image);
    this.productService.addProduct(newProduct);
    this.productForm.reset();
    this.router.navigate(['/']);
  }

}
