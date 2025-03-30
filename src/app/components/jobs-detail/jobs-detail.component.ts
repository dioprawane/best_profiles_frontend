import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '../../services/http.service';
import { CommonModule } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'; // Import DomSanitizer and SafeResourceUrl

// Define the type for CV files
interface CvFile {
  filename?: string; // Optional property for filename
  fileId?: string | null; // Optional property for fileId
}

@Component({
  selector: 'app-jobs-detail',
  standalone: true,
  imports: [CommonModule], // Import CommonModule for *ngIf and *ngForOf
  schemas: [NO_ERRORS_SCHEMA], // Suppress schema errors
  templateUrl: './jobs-detail.component.html',
  styleUrls: ['./jobs-detail.component.scss']
})
export class JobsDetailComponent implements OnInit {
  @Input() jobId: string | null = null;
  jobName: string = ''; // Job name
  cvList: CvFile[] = []; // List of uploaded CV filenames
  popupMessage: string = '';
  showPopup: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService,
    private sanitizer: DomSanitizer // Inject DomSanitizer
  ) {}

  ngOnInit() {
    this.jobId = this.route.snapshot.paramMap.get('id'); // Get jobId from route params
    if (this.jobId) {
      this.httpService.getCollectionDetails(this.jobId).subscribe({
        next: (data: any) => {
          this.jobName = data.title || 'Nom du poste inconnu'; // Set the job name
  
          // Map the cv_files array to include both filename and fileId
          this.cvList = Array.isArray(data.cv_files)
            ? data.cv_files.map((cv: any) => ({
                filename: cv.filename,
                fileId: cv.file_id ?? null // Ensure fileId is included, or set to null if missing
              }))
            : [];
            console.log('Populated cvList:', this.cvList); 
        },
        error: () => alert('Erreur lors du chargement des CVs')
      });
    }
  }

  openFileInput(): void {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  // Generate a dynamic URL for each PDF file and sanitize it
// getPdfUrl(fileId: string | null): SafeResourceUrl {
//   if (!this.jobId || !fileId) {
//       console.error('Invalid fileId or jobId:', { jobId: this.jobId, fileId }); // Debug log
//       return this.sanitizer.bypassSecurityTrustResourceUrl('about:blank'); // Return an empty string if fileId is missing
//   }

//   // Construct the URL for the backend endpoint
//   // const url = `http://localhost:8003/api/collection/${this.jobId}/cv/${fileId}`;
//   const url = this.httpService.getPdfUrl(this.jobId, fileId);
//   console.log('Generated URL:', url); // Debug log
//   return this.sanitizer.bypassSecurityTrustResourceUrl(url); // Sanitize the URL
// }

getPdfUrl(fileId: string | null | undefined): SafeResourceUrl {
  if (!this.jobId || !fileId) {
    console.error('Invalid fileId or jobId:', { jobId: this.jobId, fileId });
    return this.sanitizer.bypassSecurityTrustResourceUrl('about:blank');
  }

  const url = this.httpService.getPdfUrl(this.jobId, fileId);
  console.log('Generated URL:', url);
  return this.sanitizer.bypassSecurityTrustResourceUrl(url);
}

  closePopup(): void {
    this.showPopup = false; // Close the popup
  }

  async uploadCVs(files: File[]): Promise<void> {
    if (!this.jobId) {
        alert("Job ID is undefined. Cannot upload CVs.");
        return;
    }

    try {
        const response = await firstValueFrom(
            this.httpService.addCVsToCollection(this.jobId, files)
        );

        console.log("Response after adding CVs:", response); // Debug log

        // Ensure the response contains new_files with filename and file_id
        if (response && Array.isArray(response.new_files)) {
            const newCvs = response.new_files.map((cv: any) => ({
                filename: cv.filename || null, // Use explicit typing
                fileId: cv.file_id || null   // Use explicit typing
            }));

            // Avoid duplicates by filtering existing filenames
            this.cvList = [
              ...this.cvList.filter((cv: CvFile) => !newCvs.some((newCv: CvFile) => newCv.filename === cv.filename)),
              ...newCvs
            ];

            console.log("Updated cvList:", this.cvList); // Debug log
        } else {
            throw new Error("Invalid response structure from server");
        }
    } catch (error) {
        console.error("Error uploading CVs:", error); // Debug log
        alert('Erreur lors de l’ajout des CVs');
    }
}

handleAddCVs(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
        const files = Array.from(input.files);

        // Call the backend to upload the files
        this.uploadCVs(files).then(() => {
            // Set the popup message based on the number of files added
            if (files.length === 1) {
                this.popupMessage = `CV "${files[0].name}" a été ajouté.`;
            } else {
                this.popupMessage = `${files.length} CVs ont été ajoutés.`;
            }

            // Show the popup
            this.showPopup = true;
        }).catch(error => {
            console.error("Error uploading CVs:", error);
            alert('Erreur lors de l’ajout des CVs');
        });
    }
}

  async deleteCv(filename: string) {
    if (!this.jobId) {
      alert("Job ID is undefined. Cannot delete CV.");
      return;
    }

    try {
      // Call the backend to delete the CV
      await firstValueFrom(this.httpService.deleteCvFromCollection(this.jobId, filename));
      console.log(`Deleted CV: ${filename}`);

      // Remove the CV from the local list
      this.cvList = this.cvList.filter(cv => cv.filename !== filename);
    } catch (error) {
      console.error(`Error deleting CV (${filename}):`, error);
      alert('Erreur lors de la suppression du CV');
    }
  }
}
