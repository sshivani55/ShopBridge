import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonService } from '../common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SearchModalComponent } from '../search-modal/search-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  pageTitle: string = '';

  constructor(private commonService: CommonService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.commonService.pageTitle.subscribe(title => this.pageTitle = title);
  }

  openSearchModal(e: any){
    const modalRef = this.modalService.open(SearchModalComponent);
  }

}
