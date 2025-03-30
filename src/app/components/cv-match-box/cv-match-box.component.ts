import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cv-match-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cv-match-box.component.html',
  styleUrls: ['./cv-match-box.component.scss']
})

export class CvMatchBoxComponent {
  @Input() profile: any;
  @Output() profileClicked = new EventEmitter<any>();

  onClickProfile() {
    this.profileClicked.emit(this.profile);
  }
}
