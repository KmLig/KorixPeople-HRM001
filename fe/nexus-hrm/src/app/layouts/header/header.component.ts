import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  icon: string;
  title: string;
  message: string;
  time: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  searchQuery = signal('');
  showNotifications = signal(false);
  
  notifications = signal<Notification[]>([
    {
      id: '1',
      type: 'info',
      icon: 'info',
      title: 'New Leave Request',
      message: 'Sarah Jenkins submitted a leave request for 3 days',
      time: '2 hours ago'
    },
    {
      id: '2',
      type: 'success',
      icon: 'check_circle',
      title: 'Payroll Processed',
      message: 'October payroll has been successfully processed',
      time: '5 hours ago'
    },
    {
      id: '3',
      type: 'warning',
      icon: 'schedule',
      title: 'Pending Approvals',
      message: 'You have 5 pending approvals waiting for review',
      time: '1 day ago'
    }
  ]);
}
