import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private apiUrl = 'http://localhost:8080/api';  // Update with your backend URL

  constructor(private http: HttpClient) {}
  // getNotifications(): Observable<any> {
  //   const token = localStorage.getItem('token'); // Adjust based on your token storage
  //   console.log('Token:', token);//is null
  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${token}`
  //   });
  
  //   return this.http.get(`${this.apiUrl}`, { headers });
  // }
  getNotifications(): Observable<any> {
    const token = localStorage.getItem('auth_token'); // Ensure the key matches your storage logic
    
    if (!token) {
      console.error('No token found in localStorage.');
      return throwError(() => new Error('User not authenticated. Please log in.'));
    }else{console.log("token ="+token)//is retirns value
      }
  
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  
  return this.http.get(`${this.apiUrl}/notification`, { headers });}
  

  dismissNotification(notificationId: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/dismisNotification/${notificationId}`, {});
  }oo;o
  markAsRead(notificationId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${notificationId}/mark-as-read`, {});
  }
}
