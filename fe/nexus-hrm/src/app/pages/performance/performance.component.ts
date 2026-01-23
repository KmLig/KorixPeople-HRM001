import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { PerformanceReview, ReviewCycle, Goal } from '../../models/employee.model';

@Component({
  selector: 'app-performance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './performance.component.html',
  styleUrl: './performance.component.scss'
})
export class PerformanceComponent {
  constructor(public dataService: DataService) {}

  performanceReviews = computed(() => this.dataService.performanceReviews());
  reviewCycles = computed(() => this.dataService.reviewCycles());
  goals = computed(() => this.dataService.goals());

  // Calculate stats
  reviewsCompleted = computed(() => {
    const total = this.performanceReviews().length;
    const completed = this.performanceReviews().filter(r => r.completed).length;
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  });

  averageRating = computed(() => {
    const reviews = this.performanceReviews().filter(r => r.completed);
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return Math.round((sum / reviews.length) * 10) / 10;
  });

  pendingReviews = computed(() => {
    return this.performanceReviews().filter(r => !r.completed).length;
  });

  goalsOnTrack = computed(() => {
    const allGoals = this.goals();
    if (allGoals.length === 0) return 0;
    const avgProgress = allGoals.reduce((sum, g) => sum + g.progress, 0) / allGoals.length;
    return Math.round(avgProgress);
  });

  topPerformers = computed(() => {
    return this.performanceReviews()
      .filter(r => r.completed)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3);
  });

  upcomingReviews = computed(() => {
    return this.performanceReviews().filter(r => !r.completed).slice(0, 3);
  });

  getIconColor(color: string): string {
    const colors: Record<string, string> = {
      'indigo': 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600',
      'purple': 'bg-purple-50 dark:bg-purple-900/20 text-purple-600'
    };
    return colors[color] || 'bg-gray-50 dark:bg-gray-900/20 text-gray-600';
  }

  getProgressColor(color: string): string {
    const colors: Record<string, string> = {
      'primary': 'bg-primary',
      'orange': 'bg-orange-500',
      'green': 'bg-green-500'
    };
    return colors[color] || 'bg-primary';
  }
}
