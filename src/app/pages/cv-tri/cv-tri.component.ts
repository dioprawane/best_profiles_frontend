import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { CvBoxComponent } from '../../components/cv-box/cv-box.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cv-tri',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    HttpClientModule,
    CvBoxComponent,
    MatProgressSpinnerModule,
    MatIconModule
  ],
  templateUrl: './cv-tri.component.html',
  styleUrls: ['./cv-tri.component.scss']
})

export class CvTriComponent implements OnInit {
  selectedFiles: File[] = [];
  profiles: any[] = [];
  sortDescending: boolean = true;
  isLoading: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  onFileSelected(event: any) {
    this.selectedFiles = Array.from(event.target.files);
  }

  async uploadAndCompare() {
    this.isLoading = true;

    const formData = new FormData();
    console.log('Fichiers envoyés :', this.selectedFiles);
    for (const file of this.selectedFiles) {
      formData.append('files', file);
    }

    try {
      const res: any = await this.http.post('http://localhost:8005/compare', formData).toPromise();
      this.profiles = res.sorted;
    } catch (err: any) {
      console.error('Erreur API :', err);
      alert("Échec de communication avec le serveur de tri. Vérifie que l'API est bien lancée sur http://localhost:8005");
    } finally {
      this.isLoading = false; // Masquer le loading même en cas d'erreur
    }
  }

  toggleSort() {
    this.sortDescending = !this.sortDescending;
    this.profiles.sort((a, b) =>
      this.sortDescending
        ? b.scores.score_global - a.scores.score_global
        : a.scores.score_global - b.scores.score_global
    );
  }
}