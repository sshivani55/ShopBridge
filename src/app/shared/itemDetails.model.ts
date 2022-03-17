export class itemParameters {
    public pid: string;
    public brand: string;
    public product_name: string;
    public retail_price: number;
    public discounted_price: number;
    public in_stock: number;
    public requested:  number;
    public description: string
    public _id: string;
    public uniq_id: string;
  
    constructor() {
      this.pid = '';
      this.brand = '';
      this.product_name = '';
      this.retail_price = 0;
      this.discounted_price = 0;
      this.in_stock = 0;
      this.requested = 0;
      this.description = '';
      this._id = '';
      this.uniq_id = '';
    }
}