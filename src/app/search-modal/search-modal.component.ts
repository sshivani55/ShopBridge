import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.css']
})
export class SearchModalComponent implements OnInit {

  searchText: string = '';
  itemList: any;

  constructor(private commonService: CommonService, public activeModal: NgbActiveModal, private router: Router) { }

  ngOnInit(): void {
    this.commonService.listOfItems.subscribe(item => this.itemList = item);

  }

  itemClicked(e:any)
  {
    // console.log('click: ', e.target.innerHTML.trim())
    console.log('click: ', e);
    this.router.navigate(['/item-details'], {queryParams: {itemID: e}});
    this.activeModal.close('Close click');
  }
}
