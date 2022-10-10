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

  valideSeance(idSeance: number): Observable<boolean> {
    return this.http.put<boolean>(`${environment.apiUrl}/seances/${idSeance}`,{
      statutS:false
    });
  }

  annulerSeance(idSeance: number): Observable<boolean> {
    return this.http.put<boolean>(`${environment.apiUrl}/seances/${idSeance}`,{
      etatS:true
    });
  }

  getSeanceInfo(id: number): Observable<any>{
    return this.http.get<any>(environment.apiUrl+'/seances-info/'+id);
  }

  postRetard(params: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/retards`,params);
  }

  postCotisation(params: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/cotisations`,params);
  }
  postEchec(params: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/echecs`,params);
  }

  // getAllCotisations(seanceId: number): Observable<any>{
  //   return this.http.get<any>(environment.apiUrl+'/seances-info/'+id);
  // }

  payedRetard(id: number): Observable<boolean> {
    return this.http.put<boolean>(`${environment.apiUrl}/retards/${id}`,{
      statut:true
    });
  }

  payedEchec(id: number): Observable<boolean> {
    return this.http.put<boolean>(`${environment.apiUrl}/echecs/${id}`,{
      statut:true
    });
  }

}
