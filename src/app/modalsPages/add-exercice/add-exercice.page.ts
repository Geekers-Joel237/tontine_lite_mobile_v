/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { TontinesService } from 'src/app/services/tontines.service';

@Component({
  selector: 'app-add-exercice',
  templateUrl: './add-exercice.page.html',
  styleUrls: ['./add-exercice.page.scss'],
})
export class AddExercicePage implements OnInit {
  @Input() id: number ;
  formGroup: FormGroup;
  cycle = 'Mois';
  currentTontine = null;
  nbreSeances = null;
  periodeExercice = '';
  dureeExercice;
  frequenceExercice;
  facteur: number;
  dateDebutExercice: Date;
  user = null;



  constructor(
    private fb: FormBuilder,
    private tontineService: TontinesService,
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController,
    public loadingController: LoadingController

  ) { }




  get dateDebutE(){ return this.formGroup.get('dateDebutE');}
  get duree(){ return this.formGroup.get('duree');}
  get periodicite(){ return this.formGroup.get('periodicite');}
  get frequence(){ return this.formGroup.get('frequence');}
  get heureTontine(){ return this.formGroup.get('heureTontine');}
  get lieuTontine(){ return this.formGroup.get('lieuTontine');}
  get nbreBenef(){ return this.formGroup.get('nbreBenef');}


  ngOnInit() {
    this.currentTontine = JSON.parse(localStorage.getItem('currentTontine'));
    this.user = JSON.parse(localStorage.getItem('user'));
    this.syncForm();
  }



  syncForm(){
    this.formGroup = this.fb.group({
      dateDebutE:[new Date(),Validators.required],
      duree:['',Validators.required],
      periodicite:['mois',Validators.required],
      frequence:[1,Validators.required],
      heureTontine:[,Validators.required],
      lieuTontine:['',Validators.required],
      nbreBenef:['',Validators.required],
      // eslint-disable-next-line @typescript-eslint/naming-convention
      tontine_id:[this.id]
    });
  }

  setCycle($event: any){
    this.cycle = $event.target.value;
  }

  async onSubmit(){
    if(this.formGroup.invalid){
      this.presentToast('top','Champs Requis','danger');
    console.log(this.formGroup.value);
    }else{
       const loading =  this.loadingController.create({
        message: 'Traitement en Cours'

      });

      await (await loading).present();

      this.tontineService.createNewExercice(
        this.formGroup.value
      ).subscribe((data)=>{
        console.log(data);
        this.tontineService.postMembre({
          user_id:this.user.user.id,
          tontine_id:this.currentTontine.id,
          exercice_id:data.data.id
        })
          .subscribe(async (value)=>{
              console.log(value);
              (await loading).dismiss();
          },(err)=>{
            console.log(err);

          });
        this.generateSeances(data.data);


      },(err)=>{
        console.log(err);
        this.presentToast('top','Une erreur est survenue, Veuillez reessayer plus tard','danger');
      });

    }
  }

   addDays(numOfDays: number, date = new Date('dd/MM/yyyy')) {
    date.setDate(date.getDate() + numOfDays);

    return date.toISOString().split('T')[0] + ' '
    + date.toTimeString().split(' ')[0];;
  }

  generateSeances(data: any){
    const dateArr = [];
    this.dateDebutExercice = new Date(data.dateDebutE);
    this.periodeExercice = data.periodicite;
    this.dureeExercice = Number(data.duree);
    this.frequenceExercice = Number(data.frequence);

    if(this.periodeExercice === 'Jours'){
      this.facteur = 1;
    }else if(this.periodeExercice === 'Semaines'){
      this.facteur = 7;
    }else if(this.periodeExercice === 'Mois'){
      this.facteur = 30;
    }else if(this.periodeExercice === 'Annees'){
      this.facteur = 365;
    }
    this.dureeExercice *= this.facteur;
    this.nbreSeances = this.dureeExercice / (this.frequenceExercice * this.facteur);
    console.log(this.dateDebutExercice,
      this.periodeExercice,this.dureeExercice,this.frequenceExercice,this.nbreSeances);
    for(let i=0;i<this.nbreSeances;++i){
      dateArr.push(this.addDays(this.facteur,this.dateDebutExercice));
      console.log(dateArr);
    }
    for(const date of dateArr){
      this.tontineService.createNewSeance({
        dateS: date,
        exercice_id: data.id
      }).subscribe(
        (val)=>console.log(val),
        (err)=>console.log(err)
      );
    }
    this.presentToast('top','Exercice Cree avec Success','success');
    // window.location.reload();

    dateArr.splice(0,dateArr.length);
    // setTimeout(() => {
    //   window.location.reload();
    // }, 2000);

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
