import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonService } from './common.service';
import { HeaderComponent } from './header/header.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/Material/checkbox';
import { MatMenuModule} from '@angular/material/menu';
import { MatIconModule} from '@angular/material/icon';
import { ModifyItemComponent } from './modify-item/modify-item.component';
import { ToastrModule, ToastNoAnimation, ToastNoAnimationModule } from 'ngx-toastr';
import { SearchFilterPipe } from './shared/search-filter.pipe';
import { FlexLayoutModule } from "@angular/flex-layout";
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchModalComponent } from './search-modal/search-modal.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { TwoDigitDecimaNumberDirective } from './shared/numberCheck.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ItemListComponent,
    ItemDetailsComponent,
    ModifyItemComponent,
    SearchFilterPipe,
    SearchModalComponent,
    LoadingSpinnerComponent,
    TwoDigitDecimaNumberDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MdbCollapseModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatMenuModule,
    MatIconModule,
    FlexLayoutModule,
    ToastNoAnimationModule.forRoot(),
    NgxPaginationModule
  ],
  providers: [CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
