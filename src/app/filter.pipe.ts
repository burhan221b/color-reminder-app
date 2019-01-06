import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(notes: any, term?: any): any {
    // First lets see if serch is undefined
    if (term === undefined) {
      return notes;
    }
    // If notes have values
    return notes.filter((note) => {
      // Re-checking if user left field blank
      if (term === '') {
        return notes;
      } else {
        // Check for both color or item
        return (note.color.toLowerCase().includes(term.toLowerCase()) || note.item.toLowerCase().includes(term.toLowerCase()));
      }
    });
  }
}

