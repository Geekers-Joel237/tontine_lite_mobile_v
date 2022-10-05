import { Component, OnChanges, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ExercicesService } from 'src/app/services/exercices.service';
import { ActivatedRoute, Router } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { ModalController } from '@ionic/angular';
import { AddExercicePage } from 'src/app/modalsPages/add-exercice/add-exercice.page';
import { UpdateExrcicePage } from 'src/app/modalsPages/update-exrcice/update-exrcice.page';

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
  
  constructor(
    private location: Location,
    private exercicesService: ExercicesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modalCtrl: ModalController,



  ) { }



  ngOnInit() {
    registerLocaleData(localeFr,'fr');
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    this.currentTontine = JSON.parse(localStorage.getItem('currentTontine'));
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
      },(err)=>{
        console.log(err);
      }
    );
  }

  goToSeance(item: any,numero: number){
    localStorage.setItem('currentExercice',JSON.stringify(this.currentExercice));
    this.router.navigate(['/seance-detail/'+item.id+'/'+(numero+1)]);
  }

  annulerExercice(id: number){
    this.exercicesService.annulerExercice(id).subscribe(
      (data)=>{
        console.log(data);
      window.location.reload();
      },(err)=>{
        console.log(err);
      }
    );
  }

  deleteExercice(id: number){
    this.exercicesService.deleteExercice(id).subscribe(
      (data)=>{
        console.log(data);
      this.location.back();
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
}
