import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Cpo } from '../models/cpo';
import { environment } from 'environments/environment.prod';
const baseUrl = environment.backendUrl + "/cpo";


@Injectable({
  providedIn: 'root'
})
export class CpoService {

  constructor(private http: HttpClient) { }
  addCpo(cpo: Cpo): Observable<object> {
    return this.http.post(`${baseUrl}`+"/addCpo", cpo)
  }
  cpoList():Observable<Cpo[]>{
    return this .http.get<Cpo[]>(`${baseUrl}`+"/cpoList")
  }

  deleteCpo(id: number, cpo: any): Observable<Object> {
    return this.http.put(`${baseUrl}/deleteCpo/${id}`, cpo); // Empty body or pass any needed data
}
updateCpo( cpo: any): Observable<Object> {
  return this.http.put(`${baseUrl}/updateCpo/${cpo.id}`, cpo); 
 }
 getCpoById(id:number):Observable<Cpo>{
  return this.http.get(`${baseUrl}/getCpoById/${id}`)
 }
}
