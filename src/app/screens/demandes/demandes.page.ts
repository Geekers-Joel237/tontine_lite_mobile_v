import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DemandesService } from 'src/app/services/demandes.service';

@Component({
  selector: 'app-demandes',
  templateUrl: './demandes.page.html',
  styleUrls: ['./demandes.page.scss'],
})
export class DemandesPage implements OnInit {
  currentUser = null;
  demandes = null;
  tontines = null;
  user = null;
  current = true;
  mesTontines = null;
  ownerDemandes = null;

  constructor(
  private router: Router,
  private demandeService: DemandesService,

  ) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    console.log(this.currentUser);
    if(!this.currentUser)
      {this.router.navigate(['/login']);
      return;
    }else{
      this.user = this.currentUser.user;
      this.getUserDemandes(this.user.id);
      this.getTontinesUser(this.user.id);

    }
  }

  getUserDemandes(userId: number){
    if(this.user.role === 'membre'){
      this.demandeService.getDemandeTontineByUserId(userId)
      .subscribe((data)=>{
        console.log(data);
        this.demandes =  data.data;
      });
    }
  }

  segmentChanged(ev: any) {
    // console.log('Segment changed', ev);
    this.current = !this.current;
    if(this.current) {this.getUserDemandes(this.user.id);}
    else {this.getTontinesUser(this.user.id);}
    console.log(this.current);
  }

  cancelDemande(idDem: number,idUser: number){
    this.demandeService.cancelDemande(idDem,idUser).subscribe((data)=>{
      console.log(data);
    },(err)=>{
      console.log(err);
    });
    this.demandes = this.demandes.filter((demande: any)=>demande.id !== idDem);
  }

  getTontinesUser(userId: number){
    this.demandeService.getTontineByUserId(userId).subscribe((data)=>{
      this.mesTontines = [...new Set(data.data)];
      console.log(this.mesTontines);
    },(err)=>{
      console.log(err);
    });
  }
}
