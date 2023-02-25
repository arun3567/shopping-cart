import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of} from "rxjs";
import { Product } from "./product.model";

@Injectable({
  providedIn : 'root'
})
export class ProductService{

  private products: Product[] = [
    new Product ("Ps4",70,"PS Console","https://gmedia.playstation.com/is/image/SIEPDC/ps4-product-thumbnail-01-en-14sep21?$facebook$"),
    new Product ("iPhone 12",100,"Apple Iphone 12","https://img.giznext.com/assets/model/2/96/apple-iphone-12-986bf5e98daf0059117d2f08f5a5e7.jpg"),
    new Product ("Laptop",50,"HP New Laptop","https://m.media-amazon.com/images/I/314J9pAsXyL._SY450_.jpg"),
    new Product ("Pendrive",14,"8 GB","https://m.media-amazon.com/images/I/61DjwgS4cbL._SL1500_.jpg"),
    new Product ("Mouse",12,"Bluetooth Connection Available","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM_ZR9QNfxRnJkLNSFJmyPmLVqryKFUYJbyw&usqp=CAU"),
    new Product ("Keyboard",20,"Best Quality","data:image/jpeg;base64,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iwy/tKwHzA1D7rP0j2p7ODicbAbFlKn5EEf4zg3aHstxPBsfaISg6ZEHd/i8VPz2+JgReT8zKY9KqzMCSNBNgH5b+czZuKyNd6Uv9o77/Kz9pDTKzKLYn5mZuE4TJkOnGjuelIpavnQ2+sDBhwKgIDub/YGkepJv0mVdI6IP4u99jt9pa+V/h1x+WiyLiXzyNvXwVb+5EuPK/wAJsS0c+Z8h8VQBF/xb7iByR8xqiSB5DYeg2nvFTjcA1sQaIsfA+s/QnA9jeBxLScOgNVqI1N/O1t95Dz9gOCdrbH1N7EqfqVIJgcTVOg9B/kJveXdlOMzVpwMAfzP3B/VufoDO0cu5Dw+AfqsSL8Qos/M9TNmBA5fy38L2NHPnC+a4hZ/nf/pls5d2J4HDRGEO37WX9Zv503dH0AlliBjx4wAAAAB0AFD0mSIgIiICIiAiIgIiICIiAiIgIiICIiAmDiOGR1KuoYHbcTPECpYfw+5euQuMC7m9JsqD+6hOlfkBLHw/BY0ACIqgeAAElRAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERA//Z"),
    new Product ("Samsung",60,"Brand New Phone","https://m.media-amazon.com/images/I/91W42b8YW+L._SL1500_.jpg"),
    new Product ("Xbox",70,"Xbox Console","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkshWIJ5kEjH7g0Ya-b9A6NNJ9WB9T9IokcNP-Z-KciHkmo4Xh4kP2cDtNrUk_tFnx0SQ&usqp=CAU"),
    new Product ("TV",75,"Sony Bravia","https://www.sony.co.in/image/f4d3ecf55a598c071e6f28990461a788?fmt=pjpeg&bgcolor=FFFFFF&bgc=FFFFFF&wid=2515&hei=1320")
  ];

  carts : Product[]=[];

  constructor(private router : Router) {}

  addProduct(value: Product) {
    const data = localStorage.getItem('products');
    let products = [];
    if (data !== null) {
      products = JSON.parse(data);
    }
    products.push(value);
    localStorage.setItem('products', JSON.stringify(products));
  }


  getProducts(): Product[] {
    // const data = localStorage.getItem('products');
    // if (data !== null) {
    //   this.products = JSON.parse(data);
    //   console.log(data);
    // } else {
    //   console.log('No data found');
    // }
    return this.products.slice();
  }

  getProductsObservable(): Observable<Product[]> {
    const products = this.getProducts();
    return of(products);
  }

  onAddCart(value : Product){
    this.carts.push(value);
    this.router.navigate(['/shoppingCart'])
  }

}

