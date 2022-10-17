/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';
import { DemandesService } from 'src/app/services/demandes.service';
import { TontinesService } from 'src/app/services/tontines.service';
import { ModalController, NavParams } from '@ionic/angular';
import { AddExercicePage } from 'src/app/modalsPages/add-exercice/add-exercice.page';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { UpdateTontinePage } from 'src/app/modalsPages/update-tontine/update-tontine.page';

@Component({
  selector: 'app-tontine-detail',
  templateUrl: './tontine-detail.page.html',
  styleUrls: ['./tontine-detail.page.scss'],
})
export class TontineDetailPage implements OnInit {
  currentUser = null;
  user = null;
  id = null;
  currentTontine = null;
  searchInput = '';
  handlerMessage = '';
  roleMessage = '';
  duringExercices = [];
  check = false;
  len = 0;

  constructor(
    private router: Router,
    private demandeService: DemandesService,
    private alertController: AlertController,
    private activatedRoute: ActivatedRoute,
    private tontineService: TontinesService,
    private toastController: ToastController,
    private modalCtrl: ModalController,


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
      this.id = this.activatedRoute.snapshot.params.id;
      console.log(this.id);

      this.getTontineInfo(this.id);
    }
  }

  getTontineInfo(id: number){
    this.tontineService.allTontinesInfo(this.id).subscribe(
      (data)=>{
        console.log(data);
        this.currentTontine = data.data;
        this.duringExercices = this.currentTontine.exercices.data.filter((exercice) => {
          return exercice.statusE === 1;
        });
        console.log(this.duringExercices);
        this.check = !this.check;
        this.len = this.duringExercices.length;
      },(err)=>console.log(err)
    );
  }

  async showActionSheet(){
    const alert = await this.alertController.create({
      header: 'Nouvel Exercice',
      inputs: [
        {
          name: 'nomE',
          placeholder: 'Nom',
        },
        {
          name: 'dateD',
          type: 'date',
          placeholder: 'Date Debut',

        }
        ,{
          name: 'dateF',
          type: 'date',
          placeholder: 'Date Fin',

        },
        {
          name: 'frequence',
          type:'number',
          min:1,
          placeholder: 'Frequence en Jours',

        },
        {
         name: 'heure',
          type:'time',
          placeholder: 'Heure Tontine',

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
            // if(alertData.code === item.codeAdhesion){
            //   this.tontineService.postMembre({user_id:this.user.id,tontine_id:item.id,exercice_id:null})
            //   .subscribe((data)=>{
            //       console.log(data);
            //       this.getTontinesUser(this.user.id);
            //   },(err)=>{
            //     console.log(err);
            //   });
            //   // this.presentToast('top','Bienvenue','success');
            //   // this.router.navigate(['/tabs-menu/demandes']);
            // }else{
            //   this.presentToast('top','Code Errone','danger');
            // }
              console.log(alertData);
          }
      }
      ]
    });

    await alert.present();
    console.log(alert);

  }

  refuseDemande(idDem: number,idUser: number){
    console.log(this.duringExercices);
    this.demandeService.cancelDemande(idDem,idUser).subscribe((data)=>{
      console.log(data);
      this.getTontineInfo(this.id);
    },(err)=>{
      console.log(err);
    });
  }

  acceptDemande(idDem: number,idUser: number){
    const len = this.currentTontine.membres.length;
    if(len <= this.currentTontine.maxT){

      this.demandeService.acceptDemande(idDem,idUser).subscribe((data)=>{
        console.log(data);
        this.presentToast('top','Demande Acceptee','success');
        this.tontineService.postMembre({
          user_id:idUser,
          tontine_id:this.currentTontine.id,
          exercice_id:this.duringExercices[this.duringExercices.length -1].id}
          )
                .subscribe((value)=>{
                    console.log(value);
                    this.getTontineInfo(this.id);
                    // this.presentToast('top','Demande Acceptee','success');

                },(err)=>{
                  console.log(err);

                });

      },(err)=>{
        console.log(err);
      });

    }else{
      this.presentToast('top','Tontine Deja Pleine','success');

    }

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

  async presentExerciceModal(){
    this.duringExercices = this.currentTontine.exercices.data.filter((exercice) => exercice.statusE);
    if(this.duringExercices.length < 1) {
      const exerciceModal = await this.modalCtrl.create({
        component:AddExercicePage,
        breakpoints:[0,0.75],
        initialBreakpoint:0.75,
        animated:true,
        handle:true,
        componentProps:{
          id:this.id,
        }
      });
      console.log(this.id);
      await exerciceModal.present();
    } else {
      this.presentToast('top','Vous avez deja un exercice en cours','warning');
    }
  }

  async presentUpdateTontineModal(){
    const updateTontineModal = await this.modalCtrl.create({
      component:UpdateTontinePage,
      breakpoints:[0,0.75,0.95],
      initialBreakpoint:0.75,
      animated:true,
      handle:true,
      componentProps:{
        currentTontine:this.currentTontine,
        id:this.id
      }


    });
    await updateTontineModal.present();
    await console.log('ici',this.id);
  }

  goToExercice(id: number,i: number){
    localStorage.setItem('currentTontine',JSON.stringify(this.currentTontine));
    this.router.navigate(['/exercice-detail/'+id+'/'+(i+1)]);
  }

  deleteTontine(id: number){
    this.presentAlert(id);
  }

  updateTontine(id: number){
    this.presentUpdateTontineModal();
  }

  async presentAlert(id: number) {
    const alert = await this.alertController.create({
      header: 'Vous etes sur le point de supprimer votre tontine!',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          handler: () => {
            this.handlerMessage = 'Alert canceled';
          },
        },
        {
          text: 'Supprimer',
          role: 'confirm',
          handler: () => {
            this.tontineService.deleteTontine(id).subscribe(
              (data)=>{
                console.log(data);
                this.router.navigate(['/tabs-menu/tontines']);
              },(err)=>console.log(err)
            );
            this.handlerMessage = 'Alert confirmed';
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    this.roleMessage = `Dismissed with role: ${role}`;
  }

}
