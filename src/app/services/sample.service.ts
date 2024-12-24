import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Sample } from '../models/sample';
import { environment } from 'environments/environment.prod';

const baseUrl=environment.backendUrl+"/sample";
@Injectable({
  providedIn: 'root'
})
export class SampleService {

  constructor(private http:HttpClient) { }

  addSample(sample:Sample):Observable<Object>{
    return this.http.post(`${baseUrl}`+"/addSample",sample)
  }
  updateSample(sample:any):Observable<Object>{
    console.log("service called",JSON.stringify(sample,null,2))
    return this.http.put(`${baseUrl}/updateSample/${sample.id}`,sample)
  }

  getSampleById(id:number):Observable<Sample>{
    return this.http.get<Sample>(`${baseUrl}/getSampleById/${id}`)
  }
  sampleList():Observable<Sample[]>{
    return this.http.get<Sample[]>(`${baseUrl}/sampleList`);
  }
}
