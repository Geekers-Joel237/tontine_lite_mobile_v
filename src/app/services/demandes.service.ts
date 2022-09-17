import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DemandesService {



  constructor(
    private http: HttpClient,

  ) { }


  getDemandeTontineByUserId(userId: number): Observable<any>{
    return this.http.post(`${environment.apiUrl}/demandes/search?user_id=${userId}`,{
      // eslint-disable-next-line @typescript-eslint/naming-convention
      user_id:userId
    });
  }

  cancelDemande(idDem: number, idUser: number): Observable<boolean> {
    return this.http.put<boolean>(`${environment.apiUrl}/demandes/${idDem}`,{
      // eslint-disable-next-line @typescript-eslint/naming-convention
      user_id:idUser,
      etat:true
    });
  }

  getTontineByUserId(userId: number): Observable<any>{
    return this.http.post(`${environment.apiUrl}/membres/search?user_id=${userId}`,{
      // eslint-disable-next-line @typescript-eslint/naming-convention
      user_id:userId
    },
    {responseType: 'json'});
  }

  acceptDemande(idDem: number, idUser: number): Observable<boolean> {
    return this.http.put<boolean>(`${environment.apiUrl}/demandes/${idDem}`,{
      // eslint-disable-next-line @typescript-eslint/naming-convention
      user_id:idUser,
      validation:true
    });
  }
}
