import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../models/user.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,

  ) { }

  login(credentials: any): Observable<boolean>{
    return this.http.post<boolean>(environment.apiUrl+'/auth/login2',credentials);
  }

  register(user: IUser): Observable<boolean>{
    return this.http.post<boolean>(environment.apiUrl+'/auth/register',user);
  }

  sendEmail(email: string): Observable<IUser>{
    return this.http.get<IUser>(environment.apiUrl+'/auth/sendEmail');
  }
}
