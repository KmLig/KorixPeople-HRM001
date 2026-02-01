import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { LeaveRequest } from '../../models/employee.model';

interface Approval {
  id: string;
  type: 'leave' | 'overtime' | 'shift-swap' | 'expense';
  employee: any;
  title: string;
  description: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  metadata?: any;
}

@Component({
  selector: 'app-approvals',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './approvals.component.html',
  styleUrl: './approvals.component.scss'
})
export class ApprovalsComponent {
  selectedFilter = signal<'all' | 'leave' | 'overtime' | 'shift-swap'>('all');
  searchQuery = signal('');

  constructor(public dataService: DataService) {}

  leaveRequests = computed(() => this.dataService.leaveRequests());

  // Combine all approval types
  allApprovals = computed(() => {
    const approvals: Approval[] = [];
    
    // Leave requests
    this.leaveRequests().forEach(lr => {
      approvals.push({
        id: lr.id,
        type: 'leave',
        employee: lr.employee,
        title: `${lr.type} Request`,
        description: `${lr.employee.name} - ${lr.days} days (${lr.startDate} to ${lr.endDate})`,
        date: lr.startDate,
        status: lr.status,
        metadata: lr
      });
    });

    // Mock overtime requests
    approvals.push({
      id: 'ot1',
      type: 'overtime',
      employee: this.dataService.employees()[0],
      title: 'Overtime Request',
      description: 'Requested 2 hours overtime on Oct 25, 2023',
      date: '2023-10-25',
      status: 'pending'
    });

    // Mock shift swap requests
    approvals.push({
      id: 'ss1',
      type: 'shift-swap',
      employee: this.dataService.employees()[1],
      title: 'Shift Swap Request',
      description: 'Swap shift on Oct 26 with Michael Chen',
      date: '2023-10-26',
      status: 'pending'
    });

    return approvals;
  });

  filteredApprovals = computed(() => {
    let approvals = this.allApprovals();
    const filter = this.selectedFilter();
    const query = this.searchQuery().toLowerCase();

    if (filter !== 'all') {
      approvals = approvals.filter(a => a.type === filter);
    }

    if (query) {
      approvals = approvals.filter(a => 
        a.employee.name.toLowerCase().includes(query) ||
        a.title.toLowerCase().includes(query) ||
        a.description.toLowerCase().includes(query)
      );
    }

    return approvals;
  });

  pendingApprovals = computed(() => this.filteredApprovals().filter(a => a.status === 'pending'));
  approvedCount = computed(() => this.filteredApprovals().filter(a => a.status === 'approved').length);
  rejectedCount = computed(() => this.filteredApprovals().filter(a => a.status === 'rejected').length);

  approve(id: string): void {
    console.log('Approve:', id);
    // In real app, call API
  }

  reject(id: string): void {
    console.log('Reject:', id);
    // In real app, call API
  }

  bulkApprove(): void {
    const pending = this.pendingApprovals();
    console.log('Bulk approve:', pending.map(a => a.id));
  }

  getTypeIcon(type: string): string {
    const icons: Record<string, string> = {
      'leave': 'event_available',
      'overtime': 'schedule',
      'shift-swap': 'swap_horiz',
      'expense': 'receipt'
    };
    return icons[type] || 'help';
  }

  getTypeColor(type: string): string {
    const colors: Record<string, string> = {
      'leave': 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
      'overtime': 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400',
      'shift-swap': 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
      'expense': 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400'
    };
    return colors[type] || '';
  }
}
