import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from 'app/models/company';
import { Cpo } from 'app/models/cpo';
import { CompanyService } from 'app/services/company.service';
import { CpoService } from 'app/services/cpo.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-add-cpo',
  templateUrl: './add-cpo.component.html',
  styleUrls: ['./add-cpo.component.css']
})
export class AddCpoComponent {

  constructor(
    private cpoService: CpoService,
    private route: ActivatedRoute,
    private router:Router,
    private companyService:CompanyService,
    private spinner: NgxSpinnerService
  ) {}
  isUpdateMode: boolean = false; // Flag to check if we are in update mode
  cpo: Cpo = new Cpo();
  options: string[] = ['CBE','Abiciniya', 'Awash', ' Dashen', 
    'Enat','Coop', 'Oromia', ' Dashen', 'Amhara','Buna', 
    'Abay', ' Adis internation', 'Nib','Global', 
    'Geda', ' Sinke', 'Tsehay'];

company:Company[]=[];

  ngOnInit(): void {
   this.companyService.companyList().subscribe((data)=>{
    this.company=data;
   })
   this.spinner.show();

   setTimeout(() => {
     /** spinner ends after 5 seconds */
     this.spinner.hide();
   }, 2000);
 

    //
    const cpoId = this.route.snapshot.paramMap.get('id');

    if (cpoId) {
      this.isUpdateMode = true;
      this.loadCpoData(cpoId); // Load CPO data for update
    }
  
  }

  // Load CPO data based on ID from route or other sources (for update mode)
  loadCpoData(id:any) {
    this.cpoService.getCpoById(id).subscribe((data) => {
      this.cpo = data;
    });
  }

  // Add or Update CPO based on mode
  saveCpo() {
    if (this.isUpdateMode) {
      if (window.confirm('Are you sure you want to update this item?')) {
      
      this.cpoService.updateCpo(this.cpo).subscribe(
        data => {
          this.router.navigate(['/cpo-list']);

          console.log("Updated data::::::::", data); // Check if update is successful
        },
        error => {
          console.error("Error updating data:", error); // Log errors if any
        }
      );
    }
  } else {
      console.log("CPO ID of update on add page element", this.cpo.id); 
      if (window.confirm('Are you sure you want to Add this item?')) {  
      this.cpoService.addCpo(this.cpo).subscribe(
        data => {
          this.router.navigate(['/cpo-list']);

          console.log("Added data::::::::", data); // Check if add is successful
        },
        error => {
          console.error("Error adding data:", error); // Log errors if any
        }
      );
    }
  } 
 }
}
