import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DemandesService } from 'src/app/services/demandes.service';
import { TontinesService } from 'src/app/services/tontines.service';
import { ActionSheetController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

@Component({
  selector: 'app-demandes',
  templateUrl: './demandes.page.html',
  styleUrls: ['./demandes.page.scss'],
})
export class DemandesPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;

  currentUser = null;
  demandes = null;
  tontines = null;
  user = null;
  current = true;
  mesTontines = null;
  ownerDemandes = null;
  currentSegment = 'tontines';
  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string;

  constructor(
  private router: Router,
  private demandeService: DemandesService,
  private tontineService: TontinesService,
  public actionSheetController: ActionSheetController,


  ) { }

  ngOnInit() {
    registerLocaleData(localeFr,'fr');
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
      this.demandeService.getDemandeTontineByUserId(userId)
      .subscribe((data)=>{
        console.log(data);
        this.demandes =  data.data;
      });
      this.tontineService.getUserTontines(this.user.id).subscribe(
        (data)=>{
          this.tontines =[...new Set(data.data)];
          console.log(this.tontines);
        },
        (err)=>{
          console.log(err);
        }
      );
  }

  segmentChanged(ev: any) {
    this.currentSegment =  ev.detail.value;
    if(this.currentSegment === 'tontines'){
      this.getUserDemandes(this.user.id);
    }else if(this.currentSegment === 'demandes'){
      this.getUserDemandes(this.user.id);
    } else if(this.currentSegment === 'adhesions'){
      this.getTontinesUser(this.user.id);
    }
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

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

goToListDemandes(item: any){
  localStorage.setItem('currentTontine',JSON.stringify(item));
this.router.navigate(['/demandes-detail']);
}

goToDetail(id: number){
  this.router.navigate(['/tontine-detail/'+id]);
}

}
