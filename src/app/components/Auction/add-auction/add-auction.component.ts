import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Auction } from 'app/models/auction';
import { Company } from 'app/models/company';
import { AuctionService } from 'app/services/auction.service';
import { CompanyService } from 'app/services/company.service';
import {jwtDecode}from 'jwt-decode';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-add-auction',
  templateUrl: './add-auction.component.html',
  styleUrls: ['./add-auction.component.css']
})
export class AddAuctionComponent {
  auction: Auction = new Auction();
  options = [
    { label: 'No sample', value: 0 },
    { label: 'Returned', value: 1 },
    { label: 'Half Returned', value: 2 },
    { label: 'Not Returned', value: 3 }
  ];  
  companies: Company[] = [];
  submitted = false;
  isUpdateMode: boolean = false;
  constructor(
    private auctionService: AuctionService,
    private route: ActivatedRoute,
    private router: Router,
    private companyService:CompanyService,
    private spinner:NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();

   setTimeout(() => {
     /** spinner ends after 5 seconds */
     this.spinner.hide();
   }, 2000);
 
    this.companyService.companyList().subscribe((data)=>{
      this.companies=data;
      console.log(data);
    });


    const auctionId = this.route.snapshot.paramMap.get('id');
    if (auctionId) {
      this.isUpdateMode = true;
      this.loadAuctionData(auctionId);
      console.log( this.loadAuctionData(auctionId));
    
    }
  }

  
  loadAuctionData(id: any) {
this.auctionService.getAuctionById(id).subscribe((data)=>{
  this.auction=data;
        console.log(JSON.stringify(data, null, 2))
      })
  }

  saveAuction() {
    this.submitted = true;
    if (!this.auction.companyId || !this.auction.auctionCode || !this.auction.startDate || !this.auction.endDate || this.auction.sampleStatus === undefined) {
        return; // Prevent submission if any field is invalid
    }

    // Extract the token from localStorage
    const token = localStorage.getItem('auth_token');
    if (!token) {
        alert('User not authenticated');
        return;
    }

    // Decode the token to get the userId
    let userId: number;
    try {
        const decodedToken: any = jwtDecode(token);
        userId = decodedToken.userId; // Assuming the userId is in the token payload
    } catch (error) {
        alert('Invalid token or unable to decode token');
        return;
    }

    // Add userId to auction object
    this.auction.userId = userId;

    if (this.isUpdateMode) {
        if (confirm('Are you sure you want to update this item?')) {
            this.auctionService.updateAuction(this.auction).subscribe(
                () => {
                    this.router.navigate(['/auction-list']);
                },
                (error) => {
                    const errorMessage = error.error?.message || 'Error updating auction';
                    alert(errorMessage); // Display the error message directly
                    console.error('Error updating auction:', error);
                }
            );
        }
    } else {
        this.auctionService.saveAuction(this.auction).subscribe(
            () => {
              alert("Auction saved sucessfully")
                this.router.navigate(['/auction-list']);
            },
            (error) => {
                const errorMessage = error.error?.message || 'Error saving auction';
                alert(errorMessage); // Display the error message directly
                console.error('Error saving auction:', error);
            }
        );
    }
}






}  
