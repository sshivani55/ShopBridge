import { Inject, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable(
  {
  providedIn: 'root'
})

export class CommonService {
  baseURL = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  private title = new BehaviorSubject<any>(null);
  pageTitle = this.title.asObservable();

  private item = new BehaviorSubject<any>(null);
  itemDetails = this.item.asObservable();

  private itemList = new BehaviorSubject<any>(null);
  listOfItems = this.itemList.asObservable();

  pageTitleUpdated(newTitle: string){
    this.title.next(newTitle);  
  }

  itemUpdated(newItem: any){
    this.item.next(newItem);
  }

  itemListUpdated(newItemList: any){
    this.itemList.next(newItemList);
  }

  getItems(): Observable<any> {
    return this.http.get(`${this.baseURL + '/getItems'}`);
  }

  getItemDetails(id: string): Observable<any>{
    return this.http.get(`${this.baseURL + '/getItemDetails'}/${id}`);
  }

  deleteItem(id: string): Observable<any> {
    return this.http.delete(`${this.baseURL + '/deleteItem'}/${id}`);
  }

  modifyData(id: string, updatedItem: {}): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body = JSON.stringify(updatedItem)
    return this.http.post(`${this.baseURL + '/modifyData'}/${id}`, body, {'headers': headers})
  }

  addData(newItem: {}): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body = JSON.stringify(newItem)
    return this.http.post(`${this.baseURL + '/addData'}`, body, {'headers': headers})
  }

  getProductId(): Observable<any> {
    return this.http.get(`${this.baseURL + '/getProductId'}`);
  }
}
