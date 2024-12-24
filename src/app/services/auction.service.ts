import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Auction } from '../models/auction';
import { environment } from 'environments/environment.prod';

const baseUrl=environment.backendUrl+"/auction"
@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  constructor(private http:HttpClient) { }

  saveAuction(auction: any): Observable<any> {
    return this.http.post(`${baseUrl}/saveAuction`, auction).pipe(
        catchError((error: HttpErrorResponse) => {
            console.error('Error in auction service:', error);
            return throwError(() => error); // Re-throw the error to propagate it
        })
    );
}

  auctionList():Observable<Auction[]>{
    return this.http.get<Auction[]>(`${baseUrl}/auctionList`)
  }

  getAuctionById(id:any):Observable<Auction>{
    return this.http.get<Auction>(`${baseUrl}/getAuctionById/${id}`)
  }
  updateAuction(auction:Auction):Observable<Auction>{
    return this.http.put<Auction>(`${baseUrl}/updateAuction/${auction.id}`,auction)
  }
  
  getAuctionsByCompanyId(id:any):Observable<Auction[]>{
    return this.http.get<Auction[]>(`${baseUrl}/getAuctionsByCompanyId/${id}`)
  }

  // getUpcomingAuctions(): Observable<any[]> {
  //   return this.http.get<any[]>(`${baseUrl}/notification`);
  // }
}