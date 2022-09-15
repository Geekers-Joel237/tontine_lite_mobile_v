import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DemandesService } from 'src/app/services/demandes.service';
import { TontinesService } from 'src/app/services/tontines.service';
import { ActionSheetController } from '@ionic/angular';

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
  private tontineService: TontinesService,
  public actionSheetController: ActionSheetController,


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
    }else{
      this.tontineService.getUserTontines(this.user.id).subscribe(
        (data)=>{
          this.tontines =[...new Set(data.data)]
          .filter((tontine: any)=>tontine.type === 'Ouverte');
          console.log(this.tontines);
        },
        (err)=>{
          console.log(err);
        }
      );
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

  async presentActionSheet(item: any) {
    const actionSheet = await this.actionSheetController.create({
      header:item.nomT,
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Reglement',
        icon: 'document',

        handler: () => {
          // this.presentAlert2(item);

        }
      }, {
        text: this.currentUser.user.role === 'membre' ? 'Integrer' : 'Partager',
        icon: 'share',
        handler: () => {
          if(item.type === 'Fermee'){
            console.log('Fermee');
            // this.presentAlert(item);
          }else{
            console.log('Ouverte');
            // this.postDemande({user_id:this.currentUser.user.id,tontine_id:item.id,exercice_id:null});
            // this.getTontinesDemandesUser(this.currentUser.user.id,true);
          }
        }
      }, {
        text: 'Fermer',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role and data', role, data);
  }
}
