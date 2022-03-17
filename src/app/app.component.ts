import { Component, OnInit } from '@angular/core';
import { CommonService } from './common.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ShopBridge';

  constructor(){}

  ngOnInit(): void{
  }
}
