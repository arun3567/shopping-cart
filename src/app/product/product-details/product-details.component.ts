import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  @ViewChild('productForm', {static : true}) productForm! : NgForm;
  editedUser! : Product;
  productId!: number;

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.productId = parseInt(idParam, 10);
        this.editedUser = this.productService.onGetProducts(this.productId);
        setTimeout(() => {
          this.productForm.setValue({
            name: this.editedUser.name,
            price: this.editedUser.price,
            description: this.editedUser.description,
            image: this.editedUser.image
          });
        }, 1000);
      } else {
        // handle the case where idParam is null
      }
    });
  }

  onDelete(){
    this.productService.onDelete(this.productId);
    this.productForm.reset();
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newProduct = new Product(value.name, value.price, value.description, value.image);
    this.productService.updateProduct(this.productId, newProduct);
    console.log
  }

}
