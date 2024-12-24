import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Company } from 'app/models/company';
import { CompanyService } from 'app/services/company.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent {

  constructor(
    private companyService:CompanyService,
    private route:ActivatedRoute,
    private router:Router,
    private spinner:NgxSpinnerService
  ){}
  isUpxdateMode:boolean=false;
  company:Company=new Company();

  ngOnInit():void{
    this.spinner.show();

   setTimeout(() => {
     /** spinner ends after 5 seconds */
     this.spinner.hide();
   }, 2000);
 
    const CompanyId=this.route.snapshot.paramMap.get('id');
    

    if (CompanyId){
      this.isUpxdateMode=true;
      this.loadCompanyData(CompanyId);
    }
  }
  loadCompanyData(id:any){
    this.companyService.getCompanyById(id).subscribe((data)=>{
      this.company=data;
    })
  }
saveCompany(){
  if(this.isUpxdateMode){
    if(window.confirm('Are you sure you want to update this item?')) {
      
      this.companyService.updateCompany(this.company).subscribe((data)=>{
        this.router.navigate(['/company-list']);

      })
  }
}else{
  if (window.confirm('Are you sure you want to Add this item?')) {  
  this.companyService.saveCompany(this.company).subscribe((data)=>{
    this.router.navigate(['/company-list'])
  }, error => {
    console.error("Error adding data:", error); // Log errors if any
  }
);
   }
  } 
 }
}