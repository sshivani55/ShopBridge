import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from '../common.service';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  @ViewChild(MatMenuTrigger) menu2!: MatMenuTrigger;
  itemList: any;
  allItems: boolean = false;
  pageNo: number = 1;
  isLoading: boolean = false;
  statusMessage: string = '';
  errorFlag: boolean = false;
  sortByProduct_id: boolean = false;
  sortByProduct_name: boolean = false;
  sortByRetail_price: boolean = false;
  sortByDiscounted_price: boolean = false;
  sortByIn_stock: boolean = false;
  sortByRequested: boolean = false;


  constructor(private commonService: CommonService, private router: Router) {
   }

  ngOnInit(): void {
    this.commonService.pageTitleUpdated('List of Items')
    this.isLoading = true;
    // To get the list of items
    this.commonService.getItems().subscribe(response =>{
      this.isLoading = false;
      if(!response.reason)
      {
        this.itemList = response;
        this.commonService.itemListUpdated(this.itemList);
      }
      else{
        this.itemList = [];
        this.statusMessage = 'Unable to connect to the database!';
        this.errorFlag = true;
      }
    }, error =>{
      this.itemList = [];
      this.isLoading = false;
      this.statusMessage = 'Unable to connect to the database! You can try adding new items on your own..';
      this.errorFlag = true;
    });
  }

  menuOneClosed(){
    this.menu2.openMenu();
  }

  updateAllComplete() {
    this.allItems = this.itemList != null && this.itemList.every((item: { selected: boolean; }) => item.selected);
  }

  someComplete(): boolean {
    return this.itemList.filter((item: { selected: boolean; }) => item.selected).length > 0 && !this.allItems;
  }

  setAll(selected: boolean) {
    this.allItems = selected;
    this.itemList.forEach((item: { selected: boolean; }) => (item.selected = selected));
  }

  deleteItem(itemID: string)
  {
    this.commonService.deleteItem(itemID).subscribe();
    this.itemList.splice(this.itemList.findIndex((item: { pid: string; })=> item.pid == itemID), 1)
  }

  editItem(itemID: string)
  {
    // for getting details for the selected item and then passing it to the Behaviour Subject
    this.commonService.getItemDetails(itemID).subscribe(response =>{
      this.commonService.itemUpdated(response[0]);
      this.errorFlag = false;
      this.router.navigate(['/modify-item'], {queryParams: {mode: 'edit'}});
    }, error =>{
      this.itemList = [];
      this.isLoading = false;
      this.statusMessage = 'An error occurred!';
      this.errorFlag = true;
    })
  }

  sortProcductsBy(category: string, order: string)
  {
    if(category == 'product_id')
    {
      this.sortByProduct_id = !this.sortByProduct_id;
      this.itemList = _.sortBy(this.itemList, 'product_id');
      if(order == 'desc')
      {
        this.itemList = this.itemList.reverse();
      }
    }
    else if(category == 'product_name')
    {
      this.sortByProduct_name = !this.sortByProduct_name;
      this.itemList = _.sortBy(this.itemList, 'product_name');
      if(order == 'desc')
      {
        this.itemList = this.itemList.reverse();
      }
    }
    else if(category == 'retail_price')
    {
      this.sortByRetail_price = !this.sortByRetail_price;
      this.itemList = _.sortBy(this.itemList, 'retail_price');
      if(order == 'desc')
      {
        this.itemList = this.itemList.reverse();
      }
    }
    else if(category == 'discounted_price')
    {
      this.sortByDiscounted_price = !this.sortByDiscounted_price;
      this.itemList = _.sortBy(this.itemList, 'discounted_price');
      if(order == 'desc')
      {
        this.itemList = this.itemList.reverse();
      }
    }
    else if(category == 'in_stock')
    {
      this.sortByIn_stock = !this.sortByIn_stock;
      this.itemList = _.sortBy(this.itemList, 'in_stock');
      if(order == 'desc')
      {
        this.itemList = this.itemList.reverse();
      }
    }
    else if(category == 'requested')
    {
      this.sortByRequested = !this.sortByRequested;
      this.itemList = _.sortBy(this.itemList, 'requested');
      if(order == 'desc')
      {
        this.itemList = this.itemList.reverse();
      }
    }
  }
}
