/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { TontinesService } from 'src/app/services/tontines.service';
import { ActionSheetController } from '@ionic/angular';
import { AlertController,ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tontines',
  templateUrl: './tontines.page.html',
  styleUrls: ['./tontines.page.scss'],
})
export class TontinesPage implements OnInit {
  autorisations = null;
  demandes = null;
  tontines = null;
  currentUser = null;
  user = null;
  mesTontines = null;
  adminTontines = null;

  constructor(
    private tontineService: TontinesService,
    public actionSheetController: ActionSheetController,
    private alertController: AlertController,
    private toastController: ToastController,
    private router: Router,
    private modalCtrl: ModalController,



  ) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    console.log(this.currentUser);
    if(!this.currentUser)
      {this.router.navigate(['/login']);
      return;
    }else{
      this.user = this.currentUser.user;
      this.getTontines();
      this.getTontinesDemandesUser(this.currentUser.user.id,false);
      this.getTontinesDemandesUser(this.currentUser.user.id,true);
      this.getTontinesUser(this.currentUser.user.id);
      this.getListDemandes(this.currentUser.user.id,'Ouverte');
    }
  }

  getTontines(){
    if(this.user.role === 'membre'){
      this.tontineService.getAllTontines().subscribe(
        (data)=>{
          this.tontines = data.data;
          console.log(this.tontines);
        },
        (err)=>{
          console.log(err);
        }
      );
    }else{
      this.tontineService.getUserTontines(this.user.id).subscribe(
        (data)=>{
          this.tontines = data.data;
          console.log(this.tontines);
        },
        (err)=>{
          console.log(err);
        }
      );
    }
  }


  async presentActionSheet(item: any) {
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
        text: this.currentUser.user.role === 'membre' ? 'Integrer' : 'Partager',
        icon: 'share',
        handler: () => {
          if(item.type === 'Fermee'){
            console.log('Fermee');
            this.presentAlert(item);
          }else{
            console.log('Ouverte');
            this.postDemande({user_id:this.currentUser.user.id,tontine_id:item.id,exercice_id:null});
            this.getTontinesDemandesUser(this.currentUser.user.id,true);
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
              });
              // this.presentToast('top','Bienvenue','success');
              // this.router.navigate(['/tabs-menu/demandes']);
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

            });
  }


  public async openModal(){
    const modal = await this.modalCtrl.create({
      component:'ModalCategoryPage',
      componentProps:{
        // selectedCategory:this.selectedCategory
      },
      breakpoints:[0,0.65],
      initialBreakpoint:0.65,
      animated:true,
      handle:true
    });
    // modal.present();
    // const {data,role } = await modal.onWillDismiss();
    // if(role ==='confirm'){
    //   this.selectedCategory=data;
    // }
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
}
