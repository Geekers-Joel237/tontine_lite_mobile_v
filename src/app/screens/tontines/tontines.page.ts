/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, ViewChild } from '@angular/core';
import { TontinesService } from 'src/app/services/tontines.service';
import { ActionSheetController, IonModal } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { OverlayEventDetail } from '@ionic/core/components';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';

@Component({
  selector: 'app-tontines',
  templateUrl: './tontines.page.html',
  styleUrls: ['./tontines.page.scss'],
})
export class TontinesPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;

  autorisations = null;
  demandes = null;
  tontines = null;
  currentUser = null;
  user = null;
  mesTontines = null;
  adminTontines = null;
  formGroup: FormGroup;
  searchInput = '';

  constructor(
    private tontineService: TontinesService,
    public actionSheetController: ActionSheetController,
    private alertController: AlertController,
    private toastController: ToastController,
    private router: Router,
    private fb: FormBuilder,
    private socialSharing: SocialSharing



  ) { }

  get nomT(){return this.formGroup.get('nomT');}
  get membreMax(){return this.formGroup.get('membreMax');}
  get montantMax(){return this.formGroup.get('montantMax');}
  get ouverte(){return this.formGroup.get('ouverte');}
  get fermee(){return this.formGroup.get('fermee');}



  ngOnInit() {
    registerLocaleData(localeFr,'fr');
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    if(!this.currentUser)
      {this.router.navigate(['/login']);
      return;
    }else{
      this.user = this.currentUser.user;
      this.syncForm();
      this.getTontines();
      this.getTontinesDemandesUser(this.currentUser.user.id,false);
      this.getTontinesDemandesUser(this.currentUser.user.id,true);
      this.getTontinesUser(this.currentUser.user.id);
      this.getListDemandes(this.currentUser.user.id,'Ouverte');
    }
  }

  ionViewWillEnter(){
    this.getTontines();
  }

  pinFormatter(value: number) {
    return `${value}`;
  }

  syncForm(){
    this.formGroup = this.fb.group({
      // nomT:[''],
      membreMax:[100,Validators.required],
      montantMax:[100000,Validators.required],
      ouverte:[true,Validators.required],
      fermee:[true,Validators.required]
    });
  }

  getTontines(){
      this.tontineService.getAllTontines().subscribe(
        (data)=>{
          this.tontines = data.data;
          console.log(this.tontines);
        },
        (err)=>{
          console.log(err);
        }
      );
  }


  async presentActionSheet(item: any) {
    if(this.mesTontines && this.mesTontines.includes(item.id)){
      this.presentToast('top','Tentative d\'integration deja faite','warning');
    }else if(this.demandes && this.demandes.includes(item.id)){
      this.presentToast('top','Tentative d\'integration deja faite','warning');
    }
    else{
      if(item.user_id === this.currentUser.user.id){
        console.log('on partage plutot');
      }else{
        const actionSheet = await this.actionSheetController.create({
          header:item.nomT,
          cssClass: 'my-custom-class',
          buttons: [{
            text: 'Reglement',
            icon: 'document',

            handler: () => {
                this.presentAlert2(item);
            }
          }, {
            text: item.user_id === this.currentUser.user.id ? 'Partager' : 'Integrer' ,
            icon: 'share',
            handler: () => {
              if(item.type === 'Fermee'){

                const len = item.membres.length;
                console.log('Fermee');
                if( len <= item.maxT){
                  console.log('on peut integrer');
                  this.presentAlert(item);
                }else{
                  console.log('effectif atteint', item.membres.length);
                  this.presentToast('top','Tontine Deja Pleine','warning');
                }
              }else{
                console.log('Ouverte');
                if(item.user_id !== this.currentUser.user.id){
                  this.postDemande({user_id:this.currentUser.user.id,tontine_id:item.id,exercice_id:null});
                  this.getTontinesDemandesUser(this.currentUser.user.id,true);
                } else{
                  this.presentToast('top','Vous etes deja membre','warning');
                }

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

  }

  async presentAlert(item: any) {
    const alert = await this.alertController.create({
      header: 'Entrer le code tontine',
      inputs: [
        {
          name: 'code',
          placeholder: 'Code Tontine ( 10 characters)',
          attributes: {
            maxlength: 10,
          },
        }
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'destroy',
          cssClass: 'secondary',
          handler: () => {
              console.log('Confirm Cancel');
          }
      },
      {
          text: 'Envoyer',
          handler: (alertData) => { //takes the data
            if(alertData.code === item.codeAdhesion){
              this.tontineService.postMembre({user_id:this.user.id,tontine_id:item.id,exercice_id:null})
              .subscribe((data)=>{
                  console.log(data);
                  this.getTontinesUser(this.user.id);
              },(err)=>{
                console.log(err);
              this.presentToast('top','Erreur Survenue','danger');

              });
            }else{
              this.presentToast('top','Code Errone','danger');
            }
              console.log(alertData.code);
          }
      }
      ]
    });

    await alert.present();
    console.log(alert);
  }

  async presentAlert2(item) {
    const alert = await this.alertController.create({
      header: 'Reglement',
      buttons: ['OK'],
      inputs: [
        {
          type:'textarea',
          value: item.reglement,
          disabled:true,
        }
      ],
    });

    await alert.present();
    console.log(alert);
  }

  async presentToast(position: 'top' | 'middle' | 'bottom',msg: string,color: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      color,
      position
    });

    await toast.present();
  }

  postDemande(params: any){
    this.tontineService.postDemende(params).subscribe(data=>{
      console.log(data);
      this.presentToast('top','Demande Envoyee','success');
      this.getTontinesDemandesUser(this.currentUser.user.id,true);


            });
  }


  refreshFilter(){
    this.getTontines();
    this.getTontinesDemandesUser(this.currentUser.user.id,false);
    this.getTontinesDemandesUser(this.currentUser.user.id,true);
  }

  getTontinesDemandesUser(userId: number,bool: boolean){
    if(!bool){
      console.log(bool);
      this.tontineService.getDemandeTontineByUserId(userId,false).subscribe((data)=>{
        console.log('ici',data);
        this.autorisations =[...new Set(data.data)].filter((demande: any)=> demande.validation === 1 && demande.etat === 0)
        .map((demande: any) => demande.tontine_id) ;
        console.log('autorisations',this.autorisations);
      },(err)=>{
        console.log(err);
      });


  }
  else{
    console.log(bool);
    this.tontineService.getDemandeTontineByUserId(userId,true).subscribe((data)=>{
      console.log('la',data);
      this.demandes =[...new Set(data.data)]
      .filter((demande: any)=> demande.validation === 0 && demande.etat === 0)
      .map((demande: any) => demande.tontine_id) ;
      console.log('demandes',this.demandes);
    },(err)=>{
      console.log(err);
    });
  }

}

getTontinesUser(userId: number){
  this.tontineService.getTontineByUserId(userId).subscribe((data)=>{
    this.mesTontines = [...new Set(data.data)].map((tontine: any)=>tontine.tontine_id);
    console.log(this.mesTontines);
  },(err)=>{
    console.log(err);
  });
}

getListDemandes(userId: number,type: string){
  this.tontineService.postSearch({
    user_id:userId,
    type
  }).subscribe(data => this.adminTontines = data.data);
}

handleDetail(item: any)
{
  if(this.currentUser.user.role === 'admin'){
    this.router.navigate(['/tontine-detail/'+item.id]);
  }
}

cancel() {
  this.modal.dismiss(null, 'cancel');
}

confirm() {
  console.log(this.formGroup.value);
  if(this.formGroup.invalid){
    this.presentToast('top','Recherche non valide','warning');
  }else{
    if(!this.formGroup.value.fermee){
      this.formGroup.value.fermee = null;
    }
    if(!this.formGroup.value.ouverte){
      this.formGroup.value.ouverte = null;
    }
    this.tontineService.tontineFilter(this.formGroup.value).subscribe(
      (data)=>{
        console.log(data.data);
        this.tontines = data.data;
      },(err)=> console.log(err)
    );
  }
  this.modal.dismiss( 'confirm');
}

onWillDismiss(event: Event) {
  const ev = event as CustomEvent<OverlayEventDetail<string>>;
  if (ev.detail.role === 'confirm') {
    console.log(ev.detail.data);
  }
}

shareOnWhatsapp(){
  this.socialSharing.shareViaWhatsApp('Telecharge l\'appli',null,'https://www.youtube.com/watch?v=gtUcJLyz5nY')
  .then((data)=>console.log(data))
  .catch(err => console.log(err));
}

shareOnFacebook(){
  this.socialSharing.shareViaFacebook('Telecharge l\'appli',null,'https://www.youtube.com/watch?v=gtUcJLyz5nY')
  .then((data)=>console.log(data))
  .catch(err => console.log(err));
}

shareOnTwitter(){
  this.socialSharing.shareViaTwitter('Telecharge l\'appli',null,'https://www.youtube.com/watch?v=gtUcJLyz5nY')
  .then((data)=>console.log(data))
  .catch(err => console.log(err));
}

share(item: any){

}

}
