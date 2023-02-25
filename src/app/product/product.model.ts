export class Product {
  name: string;
  price: number;
  description: string;
  image: string;
  quantity?: number;

  constructor(name : string,price : number,description: string,image: string,quantity?: number){
    this.name = name;
    this.price = price;
    this.description = description;
    this.image = image;
    this.quantity = quantity;
  }
}
