import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Roles } from 'app/models/roles';
import { Users } from 'app/models/users';
import { environment } from 'environments/environment.prod';
import { Observable } from 'rxjs';
const baseUrl = environment.backendUrl + "/auth/user"
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }
  register(user: Users, roleId: any): Observable<any> {
    return this.http.post(`${baseUrl}/register?roleId=${roleId}`, user);
  }
  getUserById(id: any): Observable<Users> {
    return this.http.get<Users>(`${baseUrl}/findUserById/${id}`);
  }
  changePassword(userId: number, oldPassword: string, newPassword: string): Observable<any> {
    const body = { oldPassword, newPassword };
    return this.http.put<any>(`${baseUrl}/change-password/${userId}`, body);
  }
  

  changeProfilePic(userId: number, profileImage: File): Observable<any> {
    const formData = new FormData();
    formData.append('profileImage', profileImage);
    return this.http.post(`${baseUrl}/changeProfilePic/${userId}`, formData);
  }
  

  getAllRoles(): Observable<Roles[]> {
    return this.http.get<Roles[]>(`${baseUrl}/roles`)
  }
  userExists(): Observable<String[]> {
    return this.http.get<String[]>(`${baseUrl}/userExists`)
  }
}
