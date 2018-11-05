import { Component, OnInit } from '@angular/core';
import { TextService } from '../text-service/text.service';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent implements OnInit {

  selectedWord = {};
  synonyms = [];

  constructor(private textService: TextService) {
  }

  ngOnInit() {
    this.textService.selectedWord.subscribe(word => this.newSelectedWord(word));
  }

  newSelectedWord(word){
    if (word) {
      this.selectedWord = word;
      this.textService.getSynonyms(word.string).subscribe(data => {console.log(data); this.synonyms = data});
    } else {
      this.selectedWord = {};
      this.synonyms = [];
    }
  }

  selectSyn(event) {
    const syn = event.target.value;
    if (this.selectedWord) {
      this.selectedWord.string = syn;
    }
  }

  boldText() {
    if (this.selectedWord) {
      this.selectedWord.bold = !this.selectedWord.bold;
    }
  }

  underlineText() {
    if (this.selectedWord) {
      this.selectedWord.underline = !this.selectedWord.underline;
    }
  }

  italicText() {
    if (this.selectedWord) {
      this.selectedWord.italic = !this.selectedWord.italic;
    }
  }
}
