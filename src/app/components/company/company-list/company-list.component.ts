import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { ActivatedRoute, Router } from '@angular/router';
import { Company } from 'app/models/company';
import { CompanyService } from 'app/services/company.service';
@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent {
  displayedColumns:string[]=['id','name','update','delete']
  dataSource!:MatTableDataSource<Company>;
  @ViewChild(MatPaginator)paginator!:MatPaginator;
  @ViewChild(MatSort)sort!:MatSort;

  constructor(
    private companyService:CompanyService,
    private router:Router,
    private route:ActivatedRoute,
  ){}
  ngOnInit():void{
    this.companyList();
  }
  companyList(){
    this.companyService.companyList().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;

    })
  }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }

  deleteItem(): void {
    if (window.confirm('Are you sure you want to delete this item?')) {
    }
  }
  deleteElement(id: number, cpo: any) { // Adjusted to include cpo object

    if (window.confirm('Are you sure you want to delete this item?')) {
    
    this.companyService.deleteCompany(id).subscribe((data: any) => {
        console.log("Deleted CPO with ID:", id);
        // Update the data source to remove the deleted item
        this.dataSource.data = this.dataSource.data.filter(item => item.id !== id);
    }, error => {
        console.error("Error deleting CPO:", error);
    });
  }
}

updateElement(companyId: number) {
  console.log("cpo id of update element"+ companyId)
  this.router.navigate(['/add-company', companyId]);
  }
}
