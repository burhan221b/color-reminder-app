import { Component, OnInit } from '@angular/core';
// DataService for the data comming from database/api
import { DataService } from 'src/app/data.service';


// Declare Firebase component. Make it global scope

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.scss']
})
export class DirectoryComponent implements OnInit {
  // Notes - area for placing lists of note
  notes: any = [];
  bool = null;

  // set up service in component. Make it private for component use.
  constructor(private dataService: DataService) { }

  ngOnInit() {
    // This will retreive data from database
    this.dataService.fetchData().subscribe(data => this.notes = data);
  }

  // To generate random id numbers for data
  genID(serverNum) {
    return (serverNum + '' + (new Date).getTime());
  }

}
