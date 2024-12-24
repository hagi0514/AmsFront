import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Auction } from 'app/models/auction';
import { AuctionService } from 'app/services/auction.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-auction-list',
  templateUrl: './auction-list.component.html',
  styleUrls: ['./auction-list.component.css']
})
export class AuctionListComponent {
dispalayedColumn:string[]=['id','companyName','auctionCode','startDate','endDate','sampleStatus','update']
dataSource!:MatTableDataSource<Auction>;
@ViewChild(MatPaginator)paginator!:MatPaginator;
@ViewChild(MatSort)Sort!:MatSort;
startSpinning:any;
endSpinning:any;
totalSpinning:any;
constructor(
  private auctionService:AuctionService,
  private router:Router,
  private spinner:NgxSpinnerService
  
){}
  ngOnInit():void{
  this.auctionList();
}
auctionList(){
  this.startSpinning=Date.now();
  this.spinner.show();

   
    this.auctionService.auctionList().subscribe((data)=>{
      console.log("i am called auctionList")
    this.dataSource=new MatTableDataSource(data)
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort=this.Sort
    this.endSpinning=Date.now();
    this.totalSpinning=this.endSpinning-this.startSpinning;
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, this.totalSpinning);
    
  })

}

sampleStatusToString(status: number): string {
  switch (status) {
    case 0: return 'No sample';
    case 1: return 'Returned';
    case 2: return 'Half Returned';
    case 3: return 'Not Returned';
    default: return 'Unknown';
  }
}
updateElement(id:any){
  this.router.navigate(['/add-auction',id])
    
}
}
