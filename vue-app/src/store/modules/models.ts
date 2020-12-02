export class Discount {
  constructor(
    public id: number = 0,
    public store?: string,
    public percentage?: number,
    public code?: string,
  ) {}
}

export class Product {
  constructor(
    public id: number,
    public name: string = '',
    public description: string = '',
    public quantity: number = 0,
  ) {}
}
