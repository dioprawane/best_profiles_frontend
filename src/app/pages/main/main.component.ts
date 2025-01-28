import { Component, AfterViewInit } from '@angular/core';
import { CanvasBoxComponent } from '../../components/canvas-box/canvas-box.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CanvasBoxComponent,
    MatButtonModule,
    MatIconModule,
    NgbModule,
  ],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'] // Correction de styleUrl en styleUrls
})
export class MainComponent implements AfterViewInit {
  ngAfterViewInit(): void {

  }
}