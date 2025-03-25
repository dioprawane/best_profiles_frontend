// import { Component, Input, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { firstValueFrom } from 'rxjs';
// import { HttpService } from '../../services/http.service';
// import { NgFor } from '@angular/common';
// import { CommonModule } from '@angular/common';
// import { HttpClient, provideHttpClient } from '@angular/common/http';
// import { HttpClientModule } from '@angular/common/http';

// @Component({
//   selector: 'app-jobs-detail',
//   // standalone: true,
//   // imports: [CommonModule],
//   templateUrl: './jobs-detail.component.html',
//   styleUrl: './jobs-detail.component.scss',
//   providers: [HttpService]
// })
// export class JobsDetailComponent implements OnInit {
//   @Input() jobId: string | null = null;
//   // cvList: File[] = [];
//   // cvList: string[] = [];
//   cvList: { filename: string }[] = [];

//   constructor(private route: ActivatedRoute, private httpService: HttpService, private httpClient: HttpClient) {}

//   ngOnInit() {
//     this.jobId = this.route.snapshot.paramMap.get('id');
//     if (this.jobId) {
//       this.httpService.getCollectionDetails(this.jobId).subscribe({
//         next: (data: any) => {
//           console.log("Fetched collection details:", data);
//           this.cvList = Array.isArray(data.cv_files) ? data.cv_files : [];
//         },
//         error: () => alert('Erreur lors du chargement des CVs')
//       });
//     }
//   }

//   openFileInput(): void {
//     const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
//     if (fileInput) {
//       fileInput.click();
//     }
//   }

//   // Method to handle adding new CVs
//   handleAddCVs(event: any) {
//     const files = Array.from(event.target.files) as File[];
//     if (files.length > 0) {
//       this.uploadCVs(files);
//     }
//   }

//   // async uploadCVs(files: File[]) {
//   //   try {
//   //     const response = await firstValueFrom(
//   //       this.httpService.addCVsToCollection(this.jobId!, files)
//   //     );
//   //     this.cvList = [...this.cvList, ...response.new_files];
//   //   } catch (error) {
//   //     alert('Erreur lors de l’ajout des CVs');
//   //   }
//   // }

//   async uploadCVs(files: File[]) {
//     if (!this.jobId) {
//       alert("Job ID is undefined. Cannot upload CVs.");
//       return;
//     }
  
//     try {
//       const response = await firstValueFrom(
//         this.httpService.addCVsToCollection(this.jobId, files)
//       );
//       console.log("Response after adding CVs:", response);
//       this.cvList = [...this.cvList, ...response.new_files];
//     } catch (error) {
//       alert('Erreur lors de l’ajout des CVs');
//     }
//   }
  
// }

// import { Component, Input, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { firstValueFrom } from 'rxjs';
// import { HttpService } from '../../services/http.service';
// import { CommonModule } from '@angular/common';
// import { NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

// // Define the type for CV files
// interface CvFile {
//   filename?: string; // Optional property for filename
// }

// @Component({
//   selector: 'app-jobs-detail',
//   imports: [
//     CommonModule,
//   ],
//   schemas: [
//     NO_ERRORS_SCHEMA,
//     // CUSTOM_ELEMENTS_SCHEMA
// ],
//   standalone: true,
//   templateUrl: './jobs-detail.component.html',
//   styleUrls: ['./jobs-detail.component.scss']
// })
// export class JobsDetailComponent implements OnInit {
//   @Input() jobId: string | null = null;
//   cvList: CvFile[] = []; // Use CvFile[] instead of any[]

//   constructor(private route: ActivatedRoute, private httpService: HttpService) {}

//   ngOnInit() {
//     this.jobId = this.route.snapshot.paramMap.get('id');
//     if (this.jobId) {
//       this.httpService.getCollectionDetails(this.jobId).subscribe({
//         next: (data: any) => {
//           console.log("Fetched collection details:", data); // Debug log

//           // Map cv_files with explicit typing
//           this.cvList = Array.isArray(data.cv_files)
//             ? data.cv_files.map((cv: CvFile) => ({ filename: cv.filename || cv })) // Explicitly type cv as CvFile
//             : [];
//         },
//         error: () => alert('Erreur lors du chargement des CVs')
//       });
//     }
//   }

//   openFileInput(): void {
//     const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
//     if (fileInput) {
//       fileInput.click();
//     }
//   }

//   getPdfUrl(filename: string): string {
//     if (!this.jobId) {
//       return '';
//     }
//     return this.httpService.getPdfUrl(this.jobId, filename);
//   }

//   handleAddCVs(event: any) {
//     const files = Array.from(event.target.files) as File[];
//     if (files.length > 0) {
//       this.uploadCVs(files);
//     }
//   }

//   async uploadCVs(files: File[]) {
//     if (!this.jobId) {
//       alert("Job ID is undefined. Cannot upload CVs.");
//       return;
//     }

//     try {
//       const response = await firstValueFrom(
//         this.httpService.addCVsToCollection(this.jobId, files)
//       );

//       console.log("Response after adding CVs:", response); // Debug log

//       // Update the local cvList with new filenames (explicit typing)
//       if (response && Array.isArray(response.new_files)) {
//         this.cvList = [
//           ...this.cvList,
//           ...response.new_files.map((cv: CvFile) => ({ filename: cv.filename || cv }))
//         ];
//       } else {
//         throw new Error("Invalid response structure from server");
//       }
//     } catch (error) {
//       console.error("Error uploading CVs:", error); // Debug log
//       alert('Erreur lors de l’ajout des CVs');
//     }
//   }
// }

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
  cvList: CvFile[] = []; // List of uploaded CV filenames

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
          console.log("Fetched collection details:", data); // Debug log

          // Map cv_files with explicit typing
          this.cvList = Array.isArray(data.cv_files)
            ? data.cv_files.map((cv: CvFile) => ({ filename: cv.filename || cv }))
            : [];
          this.cvList.forEach((cv) => {
            console.log("Generated PDF URL for CV:", this.getPdfUrl(cv.filename || ''));
          });
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
  getPdfUrl(filename: string): SafeResourceUrl {
    if (!this.jobId) {
      return ''; // Return empty string if job ID is undefined
    }

    // Use the backend's actual endpoint for serving PDFs
    const url = this.httpService.getPdfUrl(this.jobId, filename);
    return this.sanitizer.bypassSecurityTrustResourceUrl(url); // Sanitize the URL
  }

  handleAddCVs(event: any) {
    const files = Array.from(event.target.files) as File[];
    if (files.length > 0) {
      this.uploadCVs(files);
    }
  }

  async uploadCVs(files: File[]) {
    if (!this.jobId) {
      alert("Job ID is undefined. Cannot upload CVs.");
      return;
    }

    try {
      const response = await firstValueFrom(
        this.httpService.addCVsToCollection(this.jobId, files)
      );

      console.log("Response after adding CVs:", response); // Debug log

      // Update the local cvList with new filenames (explicit typing)
      if (response && Array.isArray(response.new_files)) {
        this.cvList = [
          ...this.cvList,
          ...response.new_files.map((cv: CvFile) => ({ filename: cv.filename || cv }))
        ];
      } else {
        throw new Error("Invalid response structure from server");
      }
    } catch (error) {
      console.error("Error uploading CVs:", error); // Debug log
      alert('Erreur lors de l’ajout des CVs');
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
