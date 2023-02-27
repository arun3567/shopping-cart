import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: Product[] = [];
  carts: any[] = [];
  productAdded = new Subject<Product[]>();
  editting = new Subject<number>();

  constructor(private router: Router) {}

  addProduct(value: Product) {
    let products = JSON.parse(localStorage.getItem('products') || '[]');
    const maxId = products.reduce((max : any, product : any) => Math.max(max, product.id || 0), -1);
    const newId = maxId + 1;
    products.push({...value, id: newId});
    localStorage.setItem('products', JSON.stringify(products));
    this.productAdded.next(products.slice());
  }

  getProducts(): Product[] {
    const data = localStorage.getItem('products');
    if (data !== null) {
      this.products = JSON.parse(data);
    } else {
      console.log('No data found');
    }
    return this.products.slice();
  }

  onGetProducts(index: any): Product {
    const products = this.getProducts();
    return products[index];
  }

  getProductsObservable(): Observable<Product[]> {
    const products = this.getProducts();
    return of(products);
  }

  onAddCart(product: Product): void {
    let carts = JSON.parse(localStorage.getItem('carts') || '[]');
    const existingProductIndex = carts.findIndex((p:Product) => p.name === product.name);
    if (existingProductIndex !== -1) {
      carts[existingProductIndex].quantity = (carts[existingProductIndex].quantity ?? 0) + 1;
    } else {
      const newProduct = { ...product, quantity: 1 };
      carts.push(newProduct);
    }
    localStorage.setItem('carts', JSON.stringify(carts));
    this.carts = carts;
    this.router.navigate(['/shoppingCart']);
  }

  getProductById(id: string): Product | undefined {
    const numericId = parseInt(id, 10);
    return this.products.find(product => product.id === numericId);
  }

  updateProduct(productId: any | null, product: Product): void {
    const products = this.getProducts();
    const productIndex = products.findIndex((p: Product) => p.id === productId);
    if (productIndex !== -1) {
      products[productIndex] = {...product, id: productId};
      localStorage.setItem('products', JSON.stringify(products));
    }
    this.router.navigate(['/']);
  }

  onDelete(id: number) {
    const products = this.getProducts();
    const updatedProducts = products.filter(product => product.id !== id);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    this.router.navigate(['/']);
  }

}
