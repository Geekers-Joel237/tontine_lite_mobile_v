import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { SeancesService } from 'src/app/services/seances.service';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { AlertController } from '@ionic/angular';

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


  constructor(
    private router: Router,
    private seancesService: SeancesService,
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
      },(err)=>{
        console.log(err);
      }
    );
  }


  deleteSeance(id: number){
    this.presentAlert(id);
  }

  updateSeance(id: number){
    this.seancesService.annulerSeance(id).subscribe(
      (data)=>{
        console.log(data);
      window.location.reload();
      },(err)=>{
        console.log(err);
      }
    );
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
