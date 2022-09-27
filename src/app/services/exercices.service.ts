import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExercicesService {

  constructor(
    private http: HttpClient,

  ) { }

  deleteExercice(id: number): Observable<boolean>{
    return this.http.delete<boolean>(environment.apiUrl + '/exercices/' + id);
  }

  getExerciceInfo(id: number): Observable<any>{
    return this.http.get<any>(environment.apiUrl+'/exercices-info/'+id);
  }
}
