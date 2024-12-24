import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { ActivatedRoute, Router } from '@angular/router';
import { Cpo } from 'app/models/cpo';
import { CpoService } from 'app/services/cpo.service';


@Component({
  selector: 'app-cpo-list',
  templateUrl: './cpo-list.component.html',
  styleUrls: ['./cpo-list.component.css']
})
export class CpoListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'companyName','amount','bank','date','issuing_payment','update','delete'];
  dataSource!: MatTableDataSource<Cpo>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private cpoService: CpoService,
    private router: Router,
    private route: ActivatedRoute

  ) { }

  ngOnInit(): void {
    // this.spinner.show();

    // setTimeout(() => {
    //   this.spinner.hide();
    // }, 2000);

    // Fetch CPO list
    this.cpoList();
  }

  cpoList() {         console.log("i am traying outside");

    this.cpoService.cpoList().subscribe((data: Cpo[]) => {
        console.log(JSON.stringify(data, null, 2))
        console.log("i am traying1");

        this.dataSource = new MatTableDataSource(data); // Assign data to MatTableDataSource
        this.dataSource.paginator = this.paginator;    // Initialize paginator
        this.dataSource.sort = this.sort;              // Initialize sort
    }, error => {
        console.error("Error fetching data:", error); // Log any error that occurs during the request
    });
}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteItem(): void {
    if (window.confirm('Are you sure you want to delete this item?')) {
    }
  }
  deleteElement(id: number, cpo: any) { // Adjusted to include cpo object

    if (window.confirm('Are you sure you want to delete this item?')) {
    
    this.cpoService.deleteCpo(id, cpo).subscribe((data: any) => {
        console.log("Deleted CPO with ID:", id);
        // Update the data source to remove the deleted item
        this.dataSource.data = this.dataSource.data.filter(item => item.id !== id);
    }, error => {
        console.error("Error deleting CPO:", error);
    });
  }
}

updateElement(cpoId: number) {
  console.log("cpo id of update element"+ cpoId)
  this.router.navigate(['/add-cpo', cpoId]);
}
}
