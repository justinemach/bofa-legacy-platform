import { Component, OnInit } from '@angular/core';
import { FeatureFlagService } from 'bofa-compliance';

export interface CardProduct {
  name: string;
  apr: string;
  annualFee: number;
  segments: string[];
}

@Component({
  selector: 'app-card-catalog',
  templateUrl: './card-catalog.component.html',
  styleUrls: ['./card-catalog.component.scss'],
})
export class CardCatalogComponent implements OnInit {
  readonly filters = ['All', 'Travel', 'Cash back', 'Student', 'Secured'];
  activeFilter = 'All';
  compareTrayEnabled = false;
  compare: CardProduct[] = [];

  readonly catalogue: CardProduct[] = [
    { name: 'Travel Rewards', apr: '19.99%', annualFee: 0, segments: ['Travel'] },
    { name: 'Premium Rewards', apr: '21.24%', annualFee: 95, segments: ['Travel'] },
    { name: 'Customized Cash Rewards', apr: '17.49%', annualFee: 0, segments: ['Cash back'] },
    { name: 'Unlimited Cash Rewards', apr: '18.24%', annualFee: 0, segments: ['Cash back'] },
    { name: 'Student Cash Rewards', apr: '19.49%', annualFee: 0, segments: ['Student', 'Cash back'] },
    { name: 'Secured Starter', apr: '24.99%', annualFee: 0, segments: ['Secured'] },
  ];

  constructor(private readonly flags: FeatureFlagService) {}

  ngOnInit(): void {
    this.compareTrayEnabled = this.flags.isEnabled('cards.compare-tray');
  }

  get visibleCards(): CardProduct[] {
    if (this.activeFilter === 'All') {
      return this.catalogue;
    }
    return this.catalogue.filter((card) => card.segments.indexOf(this.activeFilter) !== -1);
  }

  onFilter(filter: string): void {
    this.activeFilter = filter;
  }

  toggleCompare(card: CardProduct): void {
    const index = this.compare.indexOf(card);
    if (index === -1) {
      this.compare = this.compare.concat(card);
    } else {
      this.compare = this.compare.filter((c) => c !== card);
    }
  }
}
