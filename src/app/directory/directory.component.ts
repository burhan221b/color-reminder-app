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
  term: any;
  notes: any = [];
  color: any = undefined;
  item: any = undefined;
  bool = null;
  showSpinner = true;
  // showSpinner = false;
  errorhandle = false;

  // set up service in component. Make it private for component use.
  constructor(private dataService: DataService) { }

  ngOnInit() {
    // This will retreive data from database
    // this.dataService.fetchData().subscribe(data => this.notes = data);
    this.fbGetData();
    this.errorhandle = false;
  }

  // To generate random id numbers for data
  genID(serverNum) {
    return (serverNum + '' + (new Date).getTime());
  }

  // Get Data from Firebase
  fbGetData() {
    firebase.database().ref('/').on('child_added', (snapshot) => {
      // if data is has been retrieved, turn spinner off
      //
      // firebase.database().child("/").once('value', function (snapshot) {
      //   if (snapshot.exists()) {
      //     alert('exists');
      //   }
      // });
      //

      // if (this.isEmpty(snapshot)) {
      //   this.showSpinner = false;
      //   return console.log('nothing here');
      // } else {


      console.log(snapshot);
      this.showSpinner = false;
      this.notes.push(snapshot.val());
      // }
    });
  }

  fbPostData(item, color) {
    if (item === undefined || color === undefined) {
      this.errorhandle = true;
      throw new Error('Can not be blank');
    }
    firebase.database().ref('/').push({ item: item, color: color, id: this.genID(10) });
    this.item = undefined;
    this.color = undefined;
    this.errorhandle = false;

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

  // isEmpty(obj) {
  //   for (let key in obj) {
  //     if (obj.hasOwnProperty(key)) {
  //       return false;
  //     }
  //   }
  //   return true;
  // }
}
