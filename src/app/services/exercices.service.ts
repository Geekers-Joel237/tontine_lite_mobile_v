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

  updateExercice(id: number,params: any): Observable<any>{
    return this.http.put<any>(environment.apiUrl+'/exercices/'+id,params);
  }

  validerExercice(idExercice: number): Observable<boolean> {
    return this.http.put<boolean>(`${environment.apiUrl}/exercices/${idExercice}`,{
      statusE:false
    });
  }

  annulerExercice(idExercice: number): Observable<boolean> {
    return this.http.put<boolean>(`${environment.apiUrl}/exercices/${idExercice}`,{
      etatE:true
    });
  }

  setMemberToExercice(idMembre: any,idExercice: number){
    return this.http.put<any>(environment.apiUrl+'/membres/'+idMembre,{
      // eslint-disable-next-line @typescript-eslint/naming-convention
      exercice_id: idExercice});
  }

  createBeneficiaire(params: any){
    return this.http.post<any>(environment.apiUrl+'/beneficiaires',params);
  }

  getBeneficiairesBySeanceId(seanceId: number){
    return this.http.post<any>(environment.apiUrl+'/beneficiaires/search',{seance_id:seanceId});

  }
}
