import { Component, OnInit } from '@angular/core';
// DataService for the data comming from database/api
import { DataService } from 'src/app/data.service';


// Declare Firebase component. Make it global scope
declare var firebase: any;


@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.scss']
})
export class DirectoryComponent implements OnInit {
  // Notes - area for placing lists of note
  notes: any = [];
  bool = null;
  showSpinner = true;
  // set up service in component. Make it private for component use.
  constructor(private dataService: DataService) { }

  ngOnInit() {
    // This will retreive data from database
    // this.dataService.fetchData().subscribe(data => this.notes = data);
    this.fbGetData();
  }

  // To generate random id numbers for data
  genID(serverNum) {
    return (serverNum + '' + (new Date).getTime());
  }

  // Get Data from Firebase
  fbGetData() {
    firebase.database().ref('/').on('child_added', (snapshot) => {
      // if data is has been retrieved, turn spinner off
      this.showSpinner = false;
      this.notes.push(snapshot.val());
    });
  }

  fbPostData(item, color) {
    firebase.database().ref('/').push({ item: item, color: color, id: this.genID(10) });
  }

  // Delete Item
  fbDeleteData(n) {
    let idkey;
    firebase.database().ref('/').on('child_added', (snapshot) => {
      if (n.id === snapshot.val().id) {
        this.notes.forEach((note, index) => {
          if (note.id === n.id) {
            this.notes.splice(index, 1);
          }
        });
        idkey = snapshot.key;
        return idkey;
      }
    });
    firebase.database().ref('/' + idkey).remove();
  }

}
