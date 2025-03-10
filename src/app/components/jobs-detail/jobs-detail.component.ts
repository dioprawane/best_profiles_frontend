import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-jobs-detail',
  standalone: true,
  imports: [],
  templateUrl: './jobs-detail.component.html',
  styleUrl: './jobs-detail.component.scss'
})
export class JobsDetailComponent implements OnInit {
  jobId: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.jobId = this.route.snapshot.paramMap.get('id'); // Get the job ID from the URL
    // Use this.jobId to fetch job details from your service or database
    console.log('Job ID:', this.jobId);
  }

}
