import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-approvals',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-8">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">Approvals</h1>
        <p class="text-slate-500">Approvals dashboard coming soon...</p>
      </div>
    </div>
  `
})
export class ApprovalsComponent {
}
