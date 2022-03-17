import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {
  item: any;
  isLoading: boolean = false;
  errorFlag: boolean = false;
  statusMessage: string = '';
  successFlag: boolean = false;

  constructor(private route: ActivatedRoute, private commonService: CommonService, private router: Router) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.commonService.pageTitleUpdated('Item Details')
    this.route.queryParams.subscribe(params=>{
      this.commonService.getItemDetails(params.itemID).subscribe(response =>{
        this.isLoading = false;
        if(response[0] && !response.reason)
        {        
          console.log('this res: ', response)
        this.errorFlag = false;  
        this.item = response[0];
        this.commonService.itemUpdated(this.item);
        }
        else{
          this.errorFlag = true;
          this.statusMessage = 'Error Connecting to Database. Please try again in sometime';
        }
      }, error =>{
        this.isLoading = false;
        this.errorFlag = true;
        this.statusMessage = 'Error Connecting to Database. Please try again in sometime';
      });
    })
  }

  deleteItem()
  {
    this.commonService.deleteItem(this.item.pid).subscribe(data =>{
      this.successFlag = true;
      this.errorFlag = false;
      this.router.navigate(['/item-list']);
    }, error =>{
      this.successFlag = false;
      this.errorFlag = true;
      this.statusMessage = 'Error Connecting to Database. Please try again in sometime';
    });
    // this.router.navigate(['/modify-item']);
  }

}
