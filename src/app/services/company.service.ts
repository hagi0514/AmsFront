import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Company } from '../models/company';
import { environment } from 'environments/environment';


const baseUrl=environment.backendUrl +"/company";
@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private  http:HttpClient) { }

  getCompanyById(id:number):Observable<Company>{
    return this.http.get<Company>(`${baseUrl}/getCompanyById/${id}`)
  }
  saveCompany(company: Company):Observable<Company>{
    return this.http.post<Company>(`${baseUrl}/saveCompany`,company)
  }
  updateCompany(company:Company):Observable<Company>{
    return this.http.put<Company>(`${baseUrl}/updateCompany/${company.id}`,company)
  }
  companyList():Observable<Company[]>{
    return this.http.get<Company[]>(`${baseUrl}`+"/companyList")
  }
  deleteCompany(id:any):Observable<any>{
    return this.http.put<any>(`${baseUrl}/deleteCompany/${id}`,id)
  }
}
