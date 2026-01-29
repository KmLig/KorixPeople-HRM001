import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { JobApplication } from '../../models/employee.model';

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  applicants: number;
  target: number;
  progress: number;
  status: 'active' | 'closed';
}

@Component({
  selector: 'app-recruitment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recruitment.component.html',
  styleUrl: './recruitment.component.scss'
})
export class RecruitmentComponent {
  selectedJob = signal<string | null>('1');
  searchQuery = signal('');

  constructor(public dataService: DataService) {}

  jobs = signal<Job[]>([
    { id: '1', title: 'Senior UX Designer', department: 'Product', location: 'Remote', applicants: 45, target: 2, progress: 70, status: 'active' },
    { id: '2', title: 'Backend Engineer', department: 'Engineering', location: 'New York', applicants: 12, target: 2, progress: 30, status: 'active' },
    { id: '3', title: 'Marketing Manager', department: 'Marketing', location: 'London', applicants: 28, target: 1, progress: 50, status: 'active' },
    { id: '4', title: 'Sales Representative', department: 'Sales', location: 'Austin', applicants: 18, target: 3, progress: 45, status: 'active' }
  ]);

  jobApplications = computed(() => this.dataService.jobApplications());

  // Stats
  activeJobs = computed(() => this.jobs().filter(j => j.status === 'active').length);
  totalCandidates = computed(() => this.jobApplications().length);
  interviewsToday = computed(() => {
    // Mock: count applications in interview stage
    return this.jobApplications().filter(a => a.status === 'interview').length;
  });
  hiredThisMonth = computed(() => {
    return this.jobApplications().filter(a => a.status === 'hired').length;
  });

  // Kanban columns
  applied = computed(() => this.jobApplications().filter(a => a.status === 'applied'));
  screening = computed(() => this.jobApplications().filter(a => a.status === 'screening'));
  interview = computed(() => this.jobApplications().filter(a => a.status === 'interview'));
  offer = computed(() => this.jobApplications().filter(a => a.status === 'offer'));
  hired = computed(() => this.jobApplications().filter(a => a.status === 'hired'));

  selectedJobData = computed(() => {
    const jobId = this.selectedJob();
    return jobId ? this.jobs().find(j => j.id === jobId) : null;
  });

  selectJob(jobId: string): void {
    this.selectedJob.set(jobId);
  }

  getStatusColor(status: string): string {
    const colors: Record<string, string> = {
      'applied': 'bg-blue-500',
      'screening': 'bg-purple-500',
      'interview': 'bg-orange-500',
      'offer': 'bg-cyan-500',
      'hired': 'bg-green-500',
      'rejected': 'bg-red-500'
    };
    return colors[status] || 'bg-gray-500';
  }

  getProgressColor(progress: number): string {
    if (progress >= 70) return 'bg-primary';
    if (progress >= 50) return 'bg-green-500';
    if (progress >= 30) return 'bg-orange-400';
    return 'bg-purple-500';
  }

  getRatingStars(rating: number): boolean[] {
    return Array(5).fill(false).map((_, i) => i < rating);
  }
}
