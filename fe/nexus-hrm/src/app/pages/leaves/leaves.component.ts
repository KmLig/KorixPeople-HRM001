import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-leaves',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-8">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">Leave Management</h1>
        <p class="text-slate-500">Leave management dashboard coming soon...</p>
      </div>
    </div>
  `
})
export class LeavesComponent {
}
