import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { CommonService } from '../common.service';
import { itemParameters } from '../shared/itemDetails.model';


@Component({
  selector: 'app-modify-item',
  templateUrl: './modify-item.component.html',
  styleUrls: ['./modify-item.component.css']
})
export class ModifyItemComponent implements OnInit {
  item: itemParameters;
  editMode: boolean = false;
  nameRegExp: RegExp = /^\w+$/;
  statusMessage: string = '';
  errorFlag: boolean = false;
  isProductNameValid: boolean = true;
  isBrandNameValid: boolean = true;
  isLoading: boolean = false;
  isRetailValid: boolean = true;
  isDiscountValid: boolean = true;
  productIdList: any;
  isProductIdValid: boolean = true;

  constructor(private commonService: CommonService, private route: ActivatedRoute, private router: Router) { 
    this.item = new itemParameters();
  }

  ngOnInit(): void {
  
    this.route.queryParams.subscribe(params =>{
      if(params.mode == 'edit')
      {
        this.commonService.pageTitleUpdated('Modify Item Details');
        this.commonService.itemDetails.subscribe(item => this.item = item);
        this.editMode = true;
        console.log('details: ', this.item)
      }
      else {
        this.commonService.pageTitleUpdated('Add New Item');
        this.item = new itemParameters();
        this.editMode = false;
        this.commonService.getProductId().subscribe(response =>{
          this.productIdList = response; 
          console.log('product ID: ', response);
        })
      }
    })    
  }

  autoCheck() {
    if(this.validateFields()){
      this.onSubmit();
    }
  }
 
  validateFields(): boolean {
    this.isProductNameValid = true;
    this.isBrandNameValid = true;
    this.statusMessage = '';
    this.errorFlag = false;
     let flag: boolean = true;
    if(this.item.discounted_price > this.item.retail_price)
    {
        this.errorFlag = true;
        this.isDiscountValid = false;
        this.isRetailValid = false;
        this.statusMessage = "'Discount Price' of the item should not be greater than the 'Retail Price' of the item";
        flag = false;
        scrollTo(0,0);
    }

    if(!this.nameRegExp.test(this.item.product_name) || this.item.product_name.includes("  "))
      {
        this.errorFlag = true;
        this.isProductNameValid = false;
        this.statusMessage = "Please enter valid 'Product Name'";
        flag = false;
        scrollTo(0,0);
      }
      if(!this.nameRegExp.test(this.item.brand) || this.item.brand.includes("  "))
      {
        this.errorFlag = true;
        this.isBrandNameValid = false;
        this.statusMessage = "Please enter valid 'Brand Name'";
        flag = false;
        scrollTo(0,0);
      }
      if(!this.editMode)
      {
        if(_.some(this.productIdList, ['pid', this.item.pid]))
        {
          this.errorFlag = true;
          this.isProductIdValid = false;
          this.statusMessage = "Product ID already exists";
          flag = false;
          scrollTo(0,0);
        }
      }
      return flag;
  }
  
  onSubmit() {
    
      if(this.editMode)
      {
        this.isLoading = true;
        this.commonService.modifyData(this.item.pid, this.item).subscribe(response =>{
          console.log('item id: ', this.item.pid);
          if(response && !response.reason)
          {            
          alert('Item Details have been updated successfully');
          this.router.navigate(['/item-list']);
          }
          else{
            this.errorFlag = true;
            this.statusMessage = 'Data could not be modified. Kindly try again in sometime';
            scroll(0,0);
          }
        }, error=>{
          this.errorFlag = true;
          this.statusMessage = 'Data could not be modified. Kindly try again in sometime';
          scroll(0,0);
        })
      }
      else
      {
        this.commonService.addData(this.item).subscribe(response =>{
          if(response && !response.reason)
          {            
            alert('The item has been added successfully');
          this.router.navigate(['/item-list']);
          }
          else{
            this.errorFlag = true;
            this.statusMessage = 'Data could not be added. Kindly try again in sometime';
            scroll(0,0);
          }
        }, error =>{          
          this.errorFlag = true;
          this.statusMessage = 'Data could not be added. Kindly try again in sometime';
          scroll(0,0);
        })
      }
    console.log('updated item: ', this.item)
  }

}
