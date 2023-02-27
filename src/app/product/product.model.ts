export class Product {
  name: string;
  price: number;
  description: string;
  image: string;
  quantity?: number;
  id? : number;

  constructor(name : string,price : number,description: string,image: string,quantity?: number,id? : number){
    this.name = name;
    this.price = price;
    this.description = description;
    this.image = image;
    this.quantity = quantity;
    this.id = id;
  }
}
