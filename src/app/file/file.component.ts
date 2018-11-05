import { Component, OnInit } from '@angular/core';
import { TextService } from '../text-service/text.service';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {
  textArray = [];
  selectedWord;

  constructor(private textService: TextService) {
  }

  ngOnInit() {
    this.textService.getMockText();
    this.textService.textArray.subscribe(text => this.textArray = text);
    document.onclick = () => {
      const selection = window.getSelection();
      if (selection) {
        const selectionWord = selection.toString();
        if (!selectionWord) {
          this.textService.setSelectedWord(null);
        }
      }
    };
  }

  handleClick(word) {
    const selection = window.getSelection();
    if (selection && word) {
      const selectionWord = selection.toString();
      if (selectionWord && selectionWord.length){
        this.textService.setSelectedWord(word);
      } else {
        this.textService.setSelectedWord(null);
      }
    }
  }

  getClassFromWord(word) {
    const cssClass = {
      'bold': word.bold,
      'italic': word.italic,
      'underline': word.underline
    };
    cssClass[word.color] = true;
    return cssClass;
  }
}
