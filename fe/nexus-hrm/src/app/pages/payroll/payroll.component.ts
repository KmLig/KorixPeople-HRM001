import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { PayrollRecord } from '../../models/employee.model';

@Component({
  selector: 'app-payroll',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payroll.component.html',
  styleUrl: './payroll.component.scss'
})
export class PayrollComponent {
  constructor(public dataService: DataService) {}

  payrollRecords = computed(() => this.dataService.payrollRecords());

  // Calculate stats
  totalPayroll = computed(() => {
    return this.payrollRecords().reduce((sum, record) => sum + record.baseSalary, 0);
  });

  netSalariesPaid = computed(() => {
    return this.payrollRecords().reduce((sum, record) => sum + record.netPay, 0);
  });

  taxAndDeductions = computed(() => {
    return this.payrollRecords().reduce((sum, record) => sum + record.deductions, 0);
  });

  processingProgress = computed(() => {
    const total = this.payrollRecords().length;
    const processed = this.payrollRecords().filter(r => r.status === 'processed' || r.status === 'paid').length;
    return total > 0 ? Math.round((processed / total) * 100) : 0;
  });

  getStatusClass(status: string): string {
    const classes: Record<string, string> = {
      'pending': 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
      'processed': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      'paid': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
    };
    return classes[status] || '';
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  }
}
