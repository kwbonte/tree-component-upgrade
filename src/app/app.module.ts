import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TreeWithAutoExpandComponent } from './tree-with-auto-expand/tree-with-auto-expand.component';
import { TreeModule } from 'angular-tree-component';

@NgModule({
  declarations: [
    AppComponent,
    TreeWithAutoExpandComponent
  ],
  imports: [
    BrowserModule, TreeModule.forRoot(),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
