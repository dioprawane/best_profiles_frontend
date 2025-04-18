import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';  // Import HttpClientModule and HttpClient
import { HttpService } from '../../services/http.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  // providers: [
  //   HttpClient,  // Provide HttpClient
  //   HttpService  // Provide HttpService
  // ],
  providers: [HttpService],
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
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
  cvFiles: File[] = [];

  constructor(private httpService: HttpService, private router: Router) {}

  ngOnInit(): void {
    this.loadJobs(); // Charger les jobs dès l’arrivée sur la page
  }

  async loadJobs() {
    try {
      const jobsFromBackend = await firstValueFrom(this.httpService.getAllJobs()); // adapte si ton service a un autre nom
      this.jobs = jobsFromBackend.map((job: any) => ({
        id: job._id,
        title: job.title,
        description: job.description,
        showEdit: false
      }));
    } catch (error) {
      console.error('Erreur lors du chargement des postes :', error);
      alert('Impossible de charger les postes.');
    }
  }

  handleFileUpload(event: any) {
    this.cvFiles = Array.from(event.target.files);
  }

  showSuccessPopup: boolean = false;
  uploadedCount: number = 0;

  showUploadSuccess(count: number) {
    this.uploadedCount = count;
    this.showSuccessPopup = true;
    setTimeout(() => this.showSuccessPopup = false, 3000); // Auto-close after 3s
  }

  closeSuccessPopup() {
    this.showSuccessPopup = false;
    this.uploadedCount = 0;
  }

  resetForm() {
    this.addingJob = false;
    this.newJobTitle = '';
    this.newJobDescription = '';
    this.cvFiles = [];
  }
  
  async createJob() {
    console.log("Create job button clicked!"); // Debug log

    if (this.newJobTitle.trim() && this.newJobDescription.trim()) {
      try {
        const formData = new FormData();
        formData.append('title', this.newJobTitle);
        formData.append('description', this.newJobDescription);

        // Ensure CV files are added
        if (this.cvFiles.length > 0) {
          this.cvFiles.forEach(file => formData.append('cv_files', file));
        } else {
          console.warn("No CV files selected!"); // Debug log
          alert("Veuillez sélectionner au moins un CV.");
          return;
        }

        const response = await firstValueFrom(
          this.httpService.uploadCVs(this.newJobTitle, this.newJobDescription, this.cvFiles)
        );

        console.log("Response from backend:", response); // Debug log

        // Ensure the response contains a valid '_id' field
        if (!response || typeof response._id !== 'string') {
          throw new Error("Réponse invalide du serveur");
        }

        this.jobs.push({
          id: response._id,  // Use '_id' instead of 'id'
          title: response.title,
          description: response.description,
          showEdit: false
        });

        this.showUploadSuccess(this.cvFiles.length);
        this.resetForm();
        await this.loadJobs();
      } catch (error) {
        console.error("Error creating job:", error); // Debug log
        if (error instanceof HttpErrorResponse) {
          const errorMessage = 
            error.error?.detail || 
            error.message || 
            'Erreur inconnue';
          alert('Erreur lors de la création : ' + errorMessage);
        } else {
          alert('Erreur inconnue');
        }
      }
    } else {
      console.warn("Fields are empty!"); // Debug log
      alert('Veuillez remplir tous les champs.');
    }
}
  
  async saveJob(index: number) {
    const job = this.jobs[index];
    const currentId = job.id; // Current ID (before edit)

    console.log("Updating job:", job); // Debug log
    console.log("New title:", job.title); // Debug log
    console.log("New description:", job.description); // Debug log

    if (job.title.trim() && job.description.trim()) {
        try {
            const response = await firstValueFrom(
                this.httpService.updateCollectionById(currentId, job.title, job.description)
            );

            console.log("Updated job response:", response); // Debug log

            if (!response || typeof response.id !== 'string') {
                throw new Error("Réponse invalide du serveur");
            }

            job.showEdit = false;
        } catch (error) {
            const httpError = error as HttpErrorResponse;
            const errorMessage =
                (httpError.error && httpError.error.detail) ||
                (httpError.message && httpError.message) ||
                'Erreur inconnue';

            console.error("Error updating job:", error); // Debug log
            alert('Erreur lors de la mise à jour : ' + errorMessage);
        }
    } else {
        alert('Veuillez remplir tous les champs.');
    }
}

  // Delete Job Section
  async deleteJob(index: number) {
    const job = this.jobs[index];
    if (confirm(`Êtes-vous sûr de vouloir supprimer le poste "${job.title}" ?`)) {
      try {
        await firstValueFrom(
          this.httpService.deleteCollection(job.title)
        );
        this.jobs.splice(index, 1);
        alert(`Poste "${job.title}" a été supprimé avec succès.`);
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
    if (!jobId) {
      console.log("Job ID received:", jobId);
      // console.error("Invalid jobId:", jobId); // Debug log
      alert("ID du poste non valide.");
      return;
    }
  
    const url = this.router.createUrlTree(['jobs-detail', jobId]).toString();
    console.log("Opening job details at URL:", url); // Debug log
    window.open(url, '_blank');
  }
}