import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Sample } from 'app/models/sample';
import { SampleService } from 'app/services/sample.service';



@Component({
  selector: 'app-sample-list',
  templateUrl: './sample-list.component.html',
  styleUrls: ['./sample-list.component.css']
})
export class SampleListComponent {
  displayedColumn:string[]=['id','sampleType','companyName','auctionCode','price','docPrice','date','merchantReturnable','returnStatus','update']
  dataSource!:MatTableDataSource<Sample>;
  @ViewChild(MatPaginator)paginator!:MatPaginator;
  @ViewChild(MatSort)sort!:MatSort;

  constructor(
    private sampleService:SampleService,
    private router:Router  
  ){}

  ngOnInit():void{
    this.sampleList();
  }
  sampleList(){
    this.sampleService.sampleList().subscribe((data)=>{
      // console.log(JSON.stringify(data,null,2))
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    })
  }

  updateSample(id:any){
    this.router.navigate(['/add-sample',id])
  }

  merchantReturnableToString(status:number):string {
    switch(status){
      case 2: return 'not creadit';
      case 1: return 'creadit';
      default: return 'Unknown';
    }
  }
 returnStatusToString(status:number):string{
  switch(status){
    case 2:return 'not returned';
    case 1:return 'returned';
    default:return 'unknown';
  }
 }
}