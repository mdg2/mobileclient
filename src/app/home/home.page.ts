import { Component, ViewChild } from '@angular/core';
import { ResultsComponent } from './results.component';
import { ResultService } from './results.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  constructor(private resultsService: ResultService){};

  resultsComponent = new ResultsComponent(this.resultsService);
  
  searchTerm: string = "";

  onInput(event: any){
    this.resultsComponent.setQuery(this.searchTerm);
    this.resultsComponent.getResults();
  }

  @ViewChild(ResultsComponent) r;
}
