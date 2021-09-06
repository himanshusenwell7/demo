import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TreeGridModule ,PageService} from '@syncfusion/ej2-angular-treegrid';
import {  SortService, FilterService } from '@syncfusion/ej2-angular-treegrid';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { GroupService, PagerModule ,EditService,ToolbarService} from '@syncfusion/ej2-angular-grids';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TreeGridModule,
    MatToolbarModule,
    PagerModule
  ],
  providers: [
    PageService,
    SortService,
    FilterService,GroupService,
    EditService,ToolbarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
