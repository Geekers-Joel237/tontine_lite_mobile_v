/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnChanges, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ExercicesService } from 'src/app/services/exercices.service';
import { ActivatedRoute, Router } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { AlertController, ModalController } from '@ionic/angular';
import { AddExercicePage } from 'src/app/modalsPages/add-exercice/add-exercice.page';
import { UpdateExrcicePage } from 'src/app/modalsPages/update-exrcice/update-exrcice.page';
import { AddBeneficiairesPage } from 'src/app/modalsPages/add-beneficiaires/add-beneficiaires.page';

@Component({
  selector: 'app-exercice-detail',
  templateUrl: './exercice-detail.page.html',
  styleUrls: ['./exercice-detail.page.scss'],
})
export class ExerciceDetailPage implements OnInit {
  currentUser = null;
  id = null;
  currentExercice = null;
  currentTontine = null;
  rank: number;
  searchInput = '';
  dataReturned;
  memberArr = null;
  nbreBenef = null;
  currentSeance = null;
  canBeBenefArr = [];

  constructor(
    private location: Location,
    private exercicesService: ExercicesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modalCtrl: ModalController,
    private alertController: AlertController,




  ) { }



  ngOnInit() {
    registerLocaleData(localeFr,'fr');
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    this.currentTontine = JSON.parse(localStorage.getItem('currentTontine'));
    this.memberArr = this.currentTontine.membres.filter((tontine) => tontine.exercice_id !== null);
    console.log(this.memberArr);
    console.log(this.currentUser);
    if(!this.currentUser)
      {this.router.navigate(['/login']);
      return;
    }else{
      this.id = this.activatedRoute.snapshot.params.id;
      this.rank = this.activatedRoute.snapshot.params.rank;
      console.log(this.id);
      console.log(this.currentTontine);

      this.getExerciceInfo(this.id);
    }
  }



  myBackButton(){
    this.location.back();
  }

  getExerciceInfo(id: number){
    this.exercicesService.getExerciceInfo(this.id).subscribe(
      (data)=>{
        console.log(data);
        this.currentExercice = data.data;
        this.nbreBenef = this.currentExercice.nbreBenef;
        this.canBeBenefArr =  this.currentExercice.membres.filter((membre) => !membre.isSeanceBenef);
        console.log('here',this.canBeBenefArr);
      },(err)=>{
        console.log(err);
      }
    );
  }

  goToSeance(item: any,numero: number){
    localStorage.setItem('currentExercice',JSON.stringify(this.currentExercice));
    this.router.navigate(['/seance-detail/'+item.id+'/'+(numero+1)]);
  }

  async annulerExercice(id: number){
    const alert = await this.alertController.create({
      header: 'Vous etes sur le point d\'annuler cet exercice!',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          handler: () => {
            // this.handlerMessage = 'Alert canceled';
          },
        },
        {
          text: 'Supprimer',
          role: 'confirm',
          handler: () => {
            this.exercicesService.annulerExercice(id).subscribe(
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

  async deleteExercice(id: number){

    const alert = await this.alertController.create({
      header: 'Vous etes sur le point de supprimer cet exercice!',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          handler: () => {
            // this.handlerMessage = 'Alert canceled';
          },
        },
        {
          text: 'Supprimer',
          role: 'confirm',
          handler: () => {
            this.exercicesService.deleteExercice(id).subscribe(
              (data)=>{
                console.log(data);
              this.location.back();
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

  getBeneficiairesBySeanceId(seanceId: number){
    this.exercicesService.getBeneficiairesBySeanceId(seanceId).subscribe(
      (data)=>{
        console.log(data);
        this.canBeBenefArr = data.data;;
      },(err)=>{
        console.log(err);
      }
    );
  }

  updateExercice(id: number,params: any){
    this.presentExerciceModal(id,params);

  }

  async presentExerciceModal(id: number,params: any){
    const exerciceModal = await this.modalCtrl.create({
      component:UpdateExrcicePage,
      breakpoints:[0,0.75],
      initialBreakpoint:0.75,
      animated:true,
      handle:true,
      componentProps:{
        id,
        params
      }
    });

    exerciceModal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
        //alert('Modal Sent Data :'+ dataReturned);
      }
    });
    await exerciceModal.present();
  }

  validerExercice(id: number){

    this.exercicesService.validerExercice(id).subscribe(
      (data)=>{
        console.log(data);
      window.location.reload();
      },(err)=>{
        console.log(err);
      }
    );
  }

  setMemberToExercice(item: any) {
    this.exercicesService.setMemberToExercice(item.id,this.id).subscribe(
      (data)=>{
        console.log(data);
        this.memberArr = this.currentTontine.membres.filter((tontine) => {tontine.exercice_id != null;});
        window.location.reload();
      },(err) => console.log(err)
    );
    console.log(item);
  }

  async setCurrentSeance(item: any){
    this.currentSeance = item;
    this.exercicesService.getBeneficiairesBySeanceId(item.id).subscribe(
      async (data)=>{
        console.log('data',data);
        this.canBeBenefArr = data.data;
        if(this.canBeBenefArr.length === 0){
          this.memberArr = this.currentExercice.membres;
        }else{
          this.memberArr = this.currentExercice.membres.filter((member,i)=>member.id !== this.canBeBenefArr[i].membre_id);

        }

        const listeBenef = await this.modalCtrl.create({
          component:AddBeneficiairesPage,
          breakpoints:[0,0.75,0.95],
          initialBreakpoint:0.75,
          animated:true,
          handle:true,
          componentProps:{
            seance: item,
            membresArr : this.memberArr,
            currentTontine: this.currentTontine,
            currentExercice: this.currentExercice,
            canBeBenefArr: this.canBeBenefArr
          }
        });

        // listeBenef.onDidDismiss().then((dataReturned) => {
        //   if (dataReturned !== null) {
        //     this.dataReturned = dataReturned.data;
        //     //alert('Modal Sent Data :'+ dataReturned);
        //   }
        // });
         setTimeout(async () => {
          await listeBenef.present();
        }, 1500);
      });
    // this.getBeneficiairesBySeanceId(item.id,item.id).

  }

  createBeneficiaire(seance: any,montant: number,membreId: number){
    console.log(seance,montant,membreId);
    this.exercicesService.createBeneficiaire(
      {
        dateSeance:seance.dateS,
        classement:1,
        montant,
        membre_id:membreId,
        seance_id:seance.id,
        isSeanceBenef:true,
        exercice_id:this.currentExercice.id
      }
    ).subscribe(
      (data)=>{
        console.log(data);
        this.getBeneficiairesBySeanceId(seance.id);
        // window.location.reload();
      },
      (err)=> console.log(err )
    );
  }
}
