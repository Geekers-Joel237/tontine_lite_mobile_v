/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { SeancesService } from 'src/app/services/seances.service';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-seance-detail',
  templateUrl: './seance-detail.page.html',
  styleUrls: ['./seance-detail.page.scss'],
})
export class SeanceDetailPage implements OnInit {
  id = null;
  currentUser = null;
  currentSeance = null;
  currentSegment = 'cotisations';
  currentExercice = null;
  currentTontine = null;
  rank: number;
  handlerMessage = '';
  cotisation: boolean ;
  retard: boolean;
  echec: boolean;
  cotisationsArr = [];
  canBeCotiser = [];
  echecsIdArr = [];


  constructor(
    private router: Router,
    private seancesService: SeancesService,
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private alertController: AlertController,



  ) { }



  ngOnInit() {
    registerLocaleData(localeFr,'fr');
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    this.currentExercice =  JSON.parse(localStorage.getItem('currentExercice'));
    this.currentTontine = JSON.parse(localStorage.getItem('currentTontine'));
    console.log(this.currentUser);
    if(!this.currentUser && !this.currentExercice && !this.currentTontine)
      {this.router.navigate(['/login']);
      return;
    }else{
      this.id = this.activatedRoute.snapshot.params.id;
      this.rank = this.activatedRoute.snapshot.params.rank;
      this.getSeanceInfo(this.id);
      console.log(this.currentExercice);
      console.log(this.currentTontine);
    }
  }

  getSeanceInfo(id: number){
    this.seancesService.getSeanceInfo(id).subscribe(
      (data)=>{
        console.log(data);
        this.currentSeance = data.data;
       this.canBeCotiser = data.data.cotisations;
       this.canBeCotiser = this.canBeCotiser.map((cotisation)=> cotisation.membre_id);
       this.echecsIdArr = data.data.echecs.map((echec)=> echec.membre_id);
       this.canBeCotiser = this.canBeCotiser.concat(this.echecsIdArr);
       console.log(this.canBeCotiser);
      //  console.log(this.echecsIdArr);
        // this.canBeCotiser =  this.currentSeance.cotisations;
      },(err)=>{
        console.log(err);
      }
    );
  }

  onSubmit(item: any){
    this.presentAlert2(item);
    // if(this.cotisation && !this.retard && !this.echec){
    //   this.seancesService.postCotisation({
    //     exercice_id:this.currentExercice.id,
    //     tontine_id:this.currentTontine.id,
    //     echec_id:null,
    //     retard_id:null,
    //     membre_id:item.id,
    //     seance_id:this.currentSeance.id,
    //     montant:this.currentTontine.montantT,
    //     intitule:'cotisation ',
    //     motif:'cotisation',
    //     modePaiement:'XAF',
    //     etat:true
    //   }).subscribe(
    //     (data)=>{
    //       console.log(data);
    //   this.getSeanceInfo(this.id);

    //     },(err)=>{
    //       console.log(err);
    //     }
    //   );
    // }else if(this.cotisation && this.retard && !this.echec){
    //   this.seancesService.postRetard({
    //     statut:false,
    //     membre_id:item.id,
    //     seance_id:this.currentSeance.id,
    //     exercice_id:this.currentExercice.id,
    //     tontine_id:this.currentTontine.id
    //   }).subscribe(
    //     (data)=>{
    //       console.log(data);
    //       this.seancesService.postCotisation({
    //         exercice_id:this.currentExercice.id,
    //         tontine_id:this.currentTontine.id,
    //         echec_id:null,
    //         retard_id:data.data.id,
    //         membre_id:item.id,
    //         seance_id:this.currentSeance.id,
    //         montant:this.currentTontine.montantT,
    //         intitule:'cotisation ',
    //         motif:'cotisation',
    //         modePaiement:'XAF',
    //         etat:true
    //       }).subscribe(
    //         (value)=>{
    //           console.log(value);
    //   this.getSeanceInfo(this.id);

    //         },(err)=>{
    //           console.log(err);
    //         }
    //       );
    //     },(err)=>{
    //       console.log(err);
    //     });

    // }else if(!this.cotisation && !this.retard && this.echec){
    //   this.seancesService.postEchec({
    //     statut:false,
    //     membre_id:item.id,
    //     seance_id:this.currentSeance.id,
    //     exercice_id:this.currentExercice.id,
    //     tontine_id:this.currentTontine.id
    //   }).subscribe(
    //     (data)=>{
    //       console.log(data);
    //       this.seancesService.postCotisation({
    //         exercice_id:this.currentExercice.id,
    //         tontine_id:this.currentTontine.id,
    //         echec_id:null,
    //         retard_id:data.data.id,
    //         membre_id:item.id,
    //         seance_id:this.currentSeance.id,
    //         montant:this.currentTontine.montantT,
    //         intitule:'cotisation ',
    //         motif:'cotisation',
    //         modePaiement:'XAF',
    //         etat:true
    //       }).subscribe(
    //         (value)=>{
    //           console.log(value);
    //   this.getSeanceInfo(this.id);

    //         },(err)=>{
    //           console.log(err);
    //         }
    //       );
    //     },(err)=>{
    //       console.log(err);
    //     });
    // }
  }


  deleteSeance(id: number){
    this.presentAlert(id);
  }

  async updateSeance(id: number){
    const alert = await this.alertController.create({
      header: 'Vous etes sur le point d\'annuler cette seance!',
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
            this.seancesService.annulerSeance(id).subscribe(
              (data)=>{
                console.log(data);
              window.location.reload();
              },(err)=>{
                console.log(err);
              }
            );
          },
        },
      ],
    });

    await alert.present();

  }

setCheck1($event){
  this.cotisation = $event.detail.checked;
}

setCheck3($event){
  this.echec = $event.detail.checked;

}

setCheck2($event){
  this.retard = $event.detail.checked;

}
  segmentChanged($event){
    this.currentSegment = $event.target.value;
  }

  goBack(){
    this.location.back();
  }

  async presentAlert(id: number) {
    const alert = await this.alertController.create({
      header: 'Vous etes sur le point de supprimer cette seance!',
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
            this.seancesService.deleteSeance(id).subscribe(
              (data)=> {
                console.log(data);
                this.location.back();
              },(err)=>{
                console.warn(err);
              }
            );
            this.handlerMessage = 'Alert confirmed';
          },
        },
      ],
    });

    await alert.present();
  }

  valideSeance(id: number){
    const myDate = new Date().toLocaleDateString('en-US');
    console.log(myDate);
    if(myDate < this.currentSeance.dateS){
      this.presentToast('top','Attention , Seance Non Terminee','danger');
    }else if(myDate > this.currentSeance.dateS){
          this.seancesService.valideSeance(id).subscribe(
            (data)=>{
              console.log(data);
            window.location.reload();
            },(err)=>{
              console.log(err);
            }
          );

    }
  }

  async presentAlert2(item) {
    const alert = await this.alertController.create({
      header: 'Parametres de Cotisation: '+item.nom+' '+item.prenom,
      buttons: [
        {
          text:'Annuler',
          role:'cancel'
        },
        {
        text: 'Valider',
        role: 'confirm',
        handler:(alertData)=>{
          console.log(alertData);
          if(alertData === 'Retard'){
            this.seancesService.postRetard({
                  statut:false,
                  membre_id:item.id,
                  seance_id:this.currentSeance.id,
                  exercice_id:this.currentExercice.id,
                  tontine_id:this.currentTontine.id
                }).subscribe(
                  (data)=>{
                    console.log(data);
                    this.seancesService.postCotisation({
                      exercice_id:data.data.exercice_id,
                      tontine_id:data.data.tontine_id,
                      echec_id:null,
                      retard_id:data.data.id,
                      membre_id:data.data.membre_id,
                      seance_id:data.data.seance_id,
                      montant:this.currentTontine.montantT,
                      intitule:'cotisation ',
                      motif:'cotisation',
                      modePaiement:'XAF',
                      etat:true
                    }).subscribe(
                      (value)=>{
                        console.log(value);
                this.getSeanceInfo(this.id);

                      },(err)=>{
                        console.log(err);
                      }
                    );
                  },(err)=>{
                    console.log(err);
                  });
          }else if(alertData === 'Echec'){

            this.seancesService.postEchec({
                  statut:false,
                  membre_id:item.id,
                  seance_id:this.currentSeance.id,
                  exercice_id:this.currentExercice.id,
                  tontine_id:this.currentExercice.tontine_id
                }).subscribe(
                  (data)=>{
                    console.log(data);
                    this.getSeanceInfo(this.id);

                //     this.seancesService.postCotisation({
                //       exercice_id:this.currentExercice.id,
                //       tontine_id:this.currentTontine.id,
                //       echec_id:null,
                //       retard_id:data.data.id,
                //       membre_id:item.id,
                //       seance_id:this.currentSeance.id,
                //       montant:this.currentTontine.montantT,
                //       intitule:'cotisation ',
                //       motif:'cotisation',
                //       modePaiement:'XAF',
                //       etat:true
                //     }).subscribe(
                //       (value)=>{
                //         console.log(value);
                // this.getSeanceInfo(this.id);

                //       },(err)=>{
                //         console.log(err);
                //       }
                //     );
                  },(err)=>{
                    console.log(err);
                  });

          }else if(alertData === 'Ok'){
            this.seancesService.postCotisation({
                  exercice_id:this.currentExercice.id,
                  tontine_id:this.currentTontine.id,
                  echec_id:null,
                  retard_id:null,
                  membre_id:item.id,
                  seance_id:this.currentSeance.id,
                  montant:this.currentTontine.montantT,
                  intitule:'cotisation ',
                  motif:'cotisation',
                  modePaiement:'XAF',
                  etat:true
                }).subscribe(
                  (data)=>{
                    console.log(data);
                this.getSeanceInfo(this.id);

                  },(err)=>{
                    console.log(err);
                  });
          }
        }
      }

    ],
      inputs: [
        {
          label: 'Retard',
          type: 'radio',
          value: 'Retard',
        },
        {
          label: 'Echec',
          type: 'radio',
          value: 'Echec',
        },
        {
          label: 'Ok',
          type: 'radio',
          value: 'Ok',
        },
      ],
    });

    await alert.present();
  }

  payedRetard(item: any){
    console.log(item);
    this.seancesService.payedRetard(item.id).subscribe(
      (data)=>{
        console.log(data);
        this.getSeanceInfo(this.id);
      },(err)=>{
        console.log(err);
      }
    );
  }

  payedEchec(item: any){
    console.log(item);
    this.seancesService.payedEchec(item.id).subscribe(
      (data)=>{
        console.log(data);
        this.getSeanceInfo(this.id);
      },(err)=>{
        console.log(err);
      }
    );
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
}
