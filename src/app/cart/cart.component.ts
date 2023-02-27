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

  quantity! : number;

  numberOfProduct! : number;

  totalPrice! : number;

  constructor(private productService : ProductService) { }

  // ngOnInit(): void {
  //   this.carts = this.productService.carts;
  // }

  ngOnInit(): void {
    const cartData = localStorage.getItem('carts');
    if (cartData) {
      this.carts = JSON.parse(cartData);
    }
  }


  increment(product : any) {
    product.quantity++;
    this.quantity++;
    this.updateCartData();
  }

  decrement(product: any) {
    if (product.quantity > 1) {
      product.quantity--;
      this.quantity--;
      this.updateCartData();
    }
  }

  updateCartData(): void {
    localStorage.setItem('carts', JSON.stringify(this.carts));
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

  getProductQuantity() {
    return this.carts.reduce((acc, curr) => {
      if (curr.quantity !== undefined) {
        return acc + curr.quantity;
      } else {
        return acc;
      }
    }, 0);
  }

  removeProduct(product: Product): void {
    const productIndex = this.carts.findIndex((p) => p.name === product.name);
    if (productIndex !== -1) {
      this.carts.splice(productIndex, 1);
      localStorage.setItem('carts', JSON.stringify(this.carts));
    }
  }




}
