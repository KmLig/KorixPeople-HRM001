import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  constructor(public dataService: DataService) {}

  totalEmployees = computed(() => this.dataService.employees().length);
  activeEmployees = computed(() => this.dataService.employees().filter(e => e.status === 'active').length);
}
