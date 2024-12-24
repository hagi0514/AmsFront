import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Auction } from 'app/models/auction';
import { Company } from 'app/models/company';
import { Sample } from 'app/models/sample';
import { AuctionService } from 'app/services/auction.service';
import { CompanyService } from 'app/services/company.service';
import { SampleService } from 'app/services/sample.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-add-sample',
  templateUrl: './add-sample.component.html',
  styleUrls: ['./add-sample.component.css']
})
export class AddSampleComponent implements OnInit {
  sampleEntries: Sample[] = [];
  options = [
    { label: 'Yes', value: 1 },
    { label: 'No', value: 2 }
  ];
  returnStatus = [
    { label: 'Returned', value: 1 },
    { label: 'Not Returned', value: 2 }
  ];

  companies: Company[] = [];
  auctions: Auction[] = [];
  selectedCompanyId?: number;
  selectedAuctionId?: number;
  showConfirmationModal = false;
  isUpdateMode: boolean = false;
  filteredAuctions: Auction[] = [];
  isMurchantReturnable = false;
  selectedMerchantStatus?: any;
  sample: Sample = new Sample();
  // 0970001934
  constructor(
    private sampleService: SampleService,
    private router: Router,
    private route: ActivatedRoute,
    private auctionService: AuctionService,
    private spinner: NgxSpinnerService,
    private companyService: CompanyService
  ) { }

  ngOnInit(): void {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 2000);

    const sampleId = this.route.snapshot.paramMap.get('id');
    if (sampleId) {
      this.isUpdateMode = true;
      this.loadSample(sampleId);
    }

    this.companyService.companyList().subscribe((data) => {
      this.companies = data;
    });
    this.auctionService.auctionList().subscribe((data) => {
      this.auctions = data;
    });

    this.addNewSampleEntry();
  }

  loadSample(id: any) {
    this.sampleService.getSampleById(id).subscribe((data) => {
      this.sample = data;
      this.sampleEntries = [data];
      this.selectedCompanyId = data.companyId;
      this.selectedAuctionId = data.auctionId;
    });
  }

  onCompanyChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const companyId = Number(selectElement.value);
    this.selectedCompanyId = companyId;

    if (companyId) {
      this.auctionService.getAuctionsByCompanyId(companyId).subscribe(data => {
        this.filteredAuctions = data;
      });
    } else {
      this.filteredAuctions = [];
    }
  }

  onMerchantReturnableChange(event: Event) {
    const selectMerchantReturnable = event.target as HTMLSelectElement;
    const merchantReturnable = String(selectMerchantReturnable.value);
    this.selectedMerchantStatus = merchantReturnable;
    this.isMurchantReturnable = merchantReturnable === '1';
    if (merchantReturnable === '2') {
      this.sample.returnStatus = 0;
    }
  }

  addNewSampleEntry() {
    const newSample = new Sample();
    newSample.companyId = this.selectedCompanyId;
    newSample.auctionId = this.selectedAuctionId;
    this.sampleEntries.push(newSample);
  }

  removeSampleEntry(index: number) {
    this.sampleEntries.splice(index, 1);
  }

  saveSamples() {
    this.showConfirmationModal = true;
  }

  onConfirmation(result: boolean) {
    this.showConfirmationModal = false;
    if (result) {
      if (this.isUpdateMode) {
        this.sampleService.updateSample(this.sample).subscribe({
          next: () => this.router.navigate(['sample-list']),
          error: error => console.error("Error updating sample:", error)
        });
      } else {
        const saveObservables = this.sampleEntries.map(sample => {
          sample.auctionId = this.selectedAuctionId;
          sample.companyId = this.selectedCompanyId;
          return this.sampleService.addSample(sample);
        });

        forkJoin(saveObservables).subscribe({
          next: () => this.router.navigate(['/sample-list']),
          error: error => console.error("Error saving samples:", error)
        });
      }
    }
  }
}
