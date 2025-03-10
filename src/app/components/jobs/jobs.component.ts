import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { HttpClientModule, HttpClient } from '@angular/common/http';  // Import HttpClientModule and HttpClient
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],  // Add HttpClientModule to imports
  providers: [
    HttpClient,  // Provide HttpClient
    HttpService  // Provide HttpService
  ],
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent {
  jobs: { 
    id: string;
    title: string;
    description: string;
    showEdit: boolean;
  }[] = [];

  addingJob: boolean = false;
  newJobTitle: string = '';
  newJobDescription: string = '';
  showPopup: boolean = false;
  selectedJob: { title: string; description: string } | null = null;

  constructor(private httpService: HttpService, private router: Router) {}

  // Create Job Section
  async createJob() {
    if (this.newJobTitle.trim() && this.newJobDescription.trim()) {
      try {
        const response = await firstValueFrom(
          this.httpService.createCollection(
            this.newJobTitle,
            this.newJobDescription
          )
        );
        this.jobs.push({
          id: response.id,
          title: response.title,
          description: response.description,
          showEdit: false
        });
        this.cancelAddingJob();
      } catch (error) {
        alert('Erreur lors de la création : ' + error);
      }
    } else {
      alert('Veuillez remplir tous les champs.');
    }
  }

  // Update Job Section
async saveJob(index: number) {
  const job = this.jobs[index];
  if (job.title.trim() && job.description.trim()) {
    try {
      // Pass current title (before edit) to the URL
      const currentTitle = this.jobs[index].title; 
      await firstValueFrom(
        this.httpService.updateCollection(
          currentTitle, // Current title (used in endpoint URL)
          job.title,    // New title (could be same if not changed)
          job.description // New description
        )
      );
      job.showEdit = false;
    } catch (error) {
      alert('Erreur lors de la mise à jour : ' + error);
    }
  } else {
    alert('Veuillez remplir tous les champs.');
  }
}

  // Delete Job Section
  async deleteJob(index: number) {
    const job = this.jobs[index];
    if (confirm('Êtes-vous sûr de vouloir supprimer ce poste ?')) {
      try {
        await firstValueFrom(
          this.httpService.deleteCollection(job.title)
        );
        this.jobs.splice(index, 1);
      } catch (error) {
        alert('Erreur lors de la suppression : ' + error);
      }
    }
  }

  // Toggle Add Job Form
  startAddingJob() {
    this.addingJob = true;
  }

  // Cancel Adding Job
  cancelAddingJob() {
    this.addingJob = false;
    this.newJobTitle = '';
    this.newJobDescription = '';
  }

  // Edit Job Section
  editJob(index: number) {
    this.jobs[index].showEdit = true;
  }

  // Cancel Editing Job
  cancelEdit(index: number) {
    this.jobs[index].showEdit = false;
  }

  // Show Job Description in Popup
  showDescription(index: number) {
    const job = this.jobs[index];
    this.selectedJob = { title: job.title, description: job.description };
    this.showPopup = true;
  }

  // Close Description Popup
  closePopup() {
    this.showPopup = false;
    this.selectedJob = null;
  }

  // Open Job Details in New Tab
  viewJobDetails(jobId: string) {
    const url = this.router.createUrlTree(['jobs-detail', jobId]).toString();
    window.open(url, '_blank');
  }
}