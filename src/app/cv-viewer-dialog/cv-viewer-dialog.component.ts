import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cv-viewer-dialog',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './cv-viewer-dialog.component.html',
  styleUrls: ['./cv-viewer-dialog.component.scss']
})
export class CvViewerDialogComponent {
  fileUrl: string = '';
  sanitizedUrl!: SafeResourceUrl;
  fileType: string = '';
  zoom = 1;

  constructor(
    public dialogRef: MatDialogRef<CvViewerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { base64: string; type: string },
    private sanitizer: DomSanitizer
  ) {
    this.fileType = data.type;

    const byteCharacters = atob(data.base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: this.fileType });
    this.fileUrl = URL.createObjectURL(blob);

    // 🛡️ Angular ne fait pas confiance aux URLs blob => sanitize ici :
    this.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.fileUrl);
  }

  closeDialog() {
    this.dialogRef.close();
  }

  zoomIn() {
    this.zoom = Math.min(this.zoom + 0.2, 3);
  }

  zoomOut() {
    this.zoom = Math.max(this.zoom - 0.2, 0.5);
  }
}
