import { Component, OnInit } from '@angular/core';
import { Product } from '../product/product.model';
import { ProductService } from '../product/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  carts : Product[]=[];

  quantity : number = 1;

  totalPrice! : number;

  constructor(private productService : ProductService) { }

  ngOnInit(): void {
    this.carts = this.productService.carts;
  }

  increment(product: Product) {
    product.quantity = (product.quantity ?? 0) + 1;
  }

  decrement(product: Product) {
    if (product.quantity && product.quantity > 1) {
      product.quantity--;
    } else {
      product.quantity = 1;
    }
  }





  getTotalPrice(): number {
    let totalPrice = 0;
    for (const item of this.carts) {
      if (item.quantity !== undefined) {
        totalPrice += item.price * item.quantity;
      }
    }
    return totalPrice;
  }


}
