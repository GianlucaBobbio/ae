import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TextService {
  constructor(private _http: HttpClient) { }
  private mockText = 'A year ago I was in the audience at a gathering of designers in San Francisco. ' +
      'There were four designers on stage, and two of them worked for me. I was there to support them. ' +
      'The topic of design responsibility came up, possibly brought up by one of my designers, I honestly don’t remember the details. ' +
      'What I do remember is that at some point in the discussion I raised my hand and suggested, to this group of designers, ' +
      'that modern design problems were very complex. And we ought to need a license to solve them.';
  public selectedWord = new BehaviorSubject(null);
  public textArray = new BehaviorSubject(null);
  getMockText() {
    this.textArray.next(this.mockText.split(' ').map((word) => {
      return {string: word, bold: false, italic: false, underline: false};
    }));
  }
  setMockText(text) {
    this.textArray.next(text);
  }
  setSelectedWord(word) {
    this.selectedWord.next(word);
  }
  getSynonyms(word) {
    return this._http.get('https://api.datamuse.com/words?rel_syn=' + word);
  }
}
