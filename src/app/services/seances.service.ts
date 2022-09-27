import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeancesService {

  constructor(
    private http: HttpClient,

  ) { }

  deleteSeance(id: number): Observable<boolean>{
    return this.http.delete<boolean>(environment.apiUrl + '/seances/' + id);
  }

  getSeanceInfo(id: number): Observable<any>{
    return this.http.get<any>(environment.apiUrl+'/seances-info/'+id);
  }
}
