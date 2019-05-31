import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ResultService } from './results.service';
import { Result } from './result';

@Component({
    templateUrl: './results.component.html',
    selector: 'results',
    providers: [ResultService]
})

export class ResultsComponent {
    results: Result[];
    query: string;

    setQuery(query: string) {
        this.query = query;
        this.resultService.setQuery(query);
    }
    constructor(private resultService: ResultService){}
    
    ngOnInit(){
        this.getResults();
    }
    getResults() {
        this.resultService.getResults()
            .subscribe(results => this.results = results);

        console.log(this.results);

    }
}

