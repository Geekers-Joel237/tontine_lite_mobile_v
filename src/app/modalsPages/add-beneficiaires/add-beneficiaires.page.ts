/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { NavParams, ToastController } from '@ionic/angular';
import { ExercicesService } from 'src/app/services/exercices.service';

@Component({
  selector: 'app-add-beneficiaires',
  templateUrl: './add-beneficiaires.page.html',
  styleUrls: ['./add-beneficiaires.page.scss'],
})
export class AddBeneficiairesPage implements OnInit {

  montant = null;
  seance = null;
  membresArr = [];
  currentTontine = null;
  currentExercice = null;
  canBeBenefArr = [];
  searchInput = '';
  constructor(
    private navParams: NavParams,
    private exercicesService: ExercicesService,
    private toastController: ToastController,

  ) { }

  ngOnInit() {
    this.currentTontine = this.navParams.data.currentTontine;
    this.seance = this.navParams.data.seance;
    this.membresArr = this.navParams.data.membresArr;
    this.currentExercice = this.navParams.data.currentExercice;
    this.canBeBenefArr = this.navParams.data.canBeBenefArr;
    // console.log(this.currentTontine,this.seance, this.membresArr);
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
        this.presentToast('top','Beneficiaire Ajoute','success');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        // this.getBeneficiairesBySeanceId(seance.id);
        // window.location.reload();
      },
      (err)=> console.log(err )
    );
  }

  getBeneficiairesBySeanceId(seanceId: number,membreId: number){

        if(this.canBeBenefArr.length < this.currentExercice.nbreBenef){
          this.createBeneficiaire(this.seance,this.currentTontine.montantT,membreId);
        } else{
          console.log('on ne peut plus beneficier');
        this.presentToast('top','On ne peut plus beneficier','warning');

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
}
