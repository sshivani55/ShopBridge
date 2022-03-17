import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(itemList: any[], searchText: any): any[] {
    if (!itemList) {
      return [];
    }
    if (!searchText) {
      return [];
    }
    searchText = searchText.toLocaleLowerCase();
    return itemList.filter(it => {
      if(it.product_name)
      {
        return it.product_name.toString().toLowerCase().includes(searchText);
      }
    });  
  }
}