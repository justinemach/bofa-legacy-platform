import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';

import { Holding, HoldingsService } from './holdings.service';

@Component({
  selector: 'app-holdings-table',
  templateUrl: './holdings-table.component.html',
  styleUrls: ['./holdings-table.component.scss'],
})
export class HoldingsTableComponent implements OnInit, AfterViewInit {
  readonly displayedColumns = ['symbol', 'description', 'quantity', 'marketValue', 'dayChangePercent'];
  dataSource = new MatTableDataSource<Holding>([]);
  loading = true;

  private subscription: Subscription | null = null;

  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  constructor(private readonly holdings: HoldingsService) {}

  ngOnInit(): void {
    // Old-style subscribe with positional next/error/complete callbacks.
    this.subscription = this.holdings.load().subscribe(
      (rows) => {
        this.dataSource.data = rows;
        this.loading = false;
      },
      (error) => console.error('[holdings]', error),
      () => console.log('[holdings] load complete')
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  get totalMarketValue(): number {
    return this.dataSource.data.reduce((sum, row) => sum + row.marketValue, 0);
  }
}
