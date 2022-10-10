import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TontinesService {

  constructor(
    private http: HttpClient,

  ) { }

getAllTontines(): Observable<any>{
  return this.http.get<any>(environment.apiUrl+'/tontines');
}
getUserTontines(userId: number): Observable<any>{
  return this.http.post<any>(environment.apiUrl+'/tontines/search?user_id='+userId,userId);
}
postDemende(params: any): Observable<boolean>{
  return this.http.post<boolean>(environment.apiUrl+'/demandes',params);
}

getDemandeTontineByUserId(userId: number,bool: boolean): Observable<any>{
  return this.http.post(`${environment.apiUrl}/demandes/search?user_id=${userId}&validation=${bool}`,{
    // eslint-disable-next-line @typescript-eslint/naming-convention
    user_id:userId,
    validation:bool
  },
  {responseType: 'json'});
}

getTontineByUserId(userId: number): Observable<any>{
  return this.http.post(`${environment.apiUrl}/membres/search?user_id=${userId}`,{
    // eslint-disable-next-line @typescript-eslint/naming-convention
    user_id:userId
  },
  {responseType: 'json'});
}

postMembre(params: any): Observable<boolean> {
  return this.http.post<boolean>(environment.apiUrl+'/membres',params);
}

postSearch(params: any): Observable<any>{
  return this.http.post<boolean>(environment.apiUrl+'/tontines/search',params);

}

createNewTontine(params: any): Observable<any>{
  return this.http.post<any>(environment.apiUrl+'/tontines',params);
}

sendFiles(params: any): Observable<any>{
  return this.http.post<any>(environment.apiUrl+'/upload-file',params);
}

allTontinesInfo(id: number): Observable<any>{
  return this.http.get(environment.apiUrl+'/tontines-info/'+id);
}

createNewExercice(params: any): Observable<any>{
  return this.http.post<any>(environment.apiUrl+'/exercices',params);
}

deleteTontine(id: number): Observable<any>{
  return this.http.delete<any>(environment.apiUrl+'/tontines/'+id);
}

createNewSeance(params: any): Observable<any>{
  return this.http.post<any>(environment.apiUrl+'/seances',params);
}

tontineFilter(params: any): Observable<any>{
  return this.http.post<any>(environment.apiUrl+'/tontines/filter',params);
}

updateTontine(params: any,id: number): Observable<any>{
  return this.http.put<any>(environment.apiUrl+'/tontines/'+id,params);
}
}
