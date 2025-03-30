import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { CvBoxComponent } from '../../components/cv-box/cv-box.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CvMatchBoxComponent } from '../../components/cv-match-box/cv-match-box.component';
import { MatDialog } from '@angular/material/dialog';
import { CvViewerDialogComponent } from '../../cv-viewer-dialog/cv-viewer-dialog.component';

@Component({
  selector: 'app-cv-matching',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    HttpClientModule,
    CvBoxComponent,
    CvMatchBoxComponent,
    CvViewerDialogComponent,
    MatProgressSpinnerModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './cv-matching.component.html',
  styleUrl: './cv-matching.component.scss'
})
export class CvMatchingComponent implements OnInit {
  selectedFiles: File[] = [];
  profiles: any[] = [];
  sortDescending: boolean = true;
  isLoading: boolean = false;

  jobTitle: string = '';

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  ngOnInit() {}

  /*onFileSelected(event: any) {
    this.selectedFiles = Array.from(event.target.files);
  }*/

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFiles = Array.from(input.files);
    }
  }

  async uploadAndCompare() {
    this.isLoading = true;

    if (!this.jobTitle || this.selectedFiles.length === 0) {
      alert("Veuillez saisir une description de poste et sélectionner au moins un fichier.");
      return;
    }

    const formData = new FormData();
    console.log('Fichiers envoyés :', this.selectedFiles);
    for (const file of this.selectedFiles) {
      formData.append('files', file);
      formData.append('job_title', this.jobTitle);
    }

    this.http.post<any>('http://localhost:8005/filter-by-job/', formData).subscribe({
      next: (res) => {
        this.profiles = res.filtered_sorted;
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Erreur API:", err);
        alert("Erreur lors du matching des CVs.");
        this.isLoading = false;
      }
    });
  }

  toggleSort() {
    this.sortDescending = !this.sortDescending;
    this.profiles.sort((a, b) =>
      this.sortDescending
        ? b.scores.score_global - a.scores.score_global
        : a.scores.score_global - b.scores.score_global
    );
  }

  showCv(profile: any) {
    this.dialog.open(CvViewerDialogComponent, {
      width: '90vw',
      height: '90vh',
      maxWidth: '98vw',
      data: {
        base64: profile.file_base64,
        type: profile.file_type
      }
    });    
  }
  
  
}
