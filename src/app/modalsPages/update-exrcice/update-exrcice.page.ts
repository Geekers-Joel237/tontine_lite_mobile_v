import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavParams } from '@ionic/angular';
import { TontinesService } from 'src/app/services/tontines.service';

@Component({
  selector: 'app-update-exrcice',
  templateUrl: './update-exrcice.page.html',
  styleUrls: ['./update-exrcice.page.scss'],
})
export class UpdateExrcicePage implements OnInit {
  @Input() params;
  formGroup: FormGroup;
  cycle = 'Mois';
  currentTontine = null;
  nbreSeances = null;
  periodeExercice = '';
  dureeExercice;
  frequenceExercice;
  facteur: number;
  dateDebutExercice: Date;
  test: any;


  constructor(
    private fb: FormBuilder,
    private tontineService: TontinesService,
    private activatedRoute: ActivatedRoute,
    private navParams: NavParams,



  ) { }

  get dateDebutE(){ return this.formGroup.get('dateDebutE');}
  get duree(){ return this.formGroup.get('duree');}
  get periodicite(){ return this.formGroup.get('periodicite');}
  get frequence(){ return this.formGroup.get('frequence');}
  get heureTontine(){ return this.formGroup.get('heureTontine');}
  get lieuTontine(){ return this.formGroup.get('lieuTontine');}
  get nbreBenef(){ return this.formGroup.get('nbreBenef');}


  ngOnInit() {
    console.table(this.navParams);
    this.currentTontine = JSON.parse(localStorage.getItem('currentTontine'));
    console.log(this.params);
    this.syncForm();
  }

  syncForm(){
    this.formGroup = this.fb.group({
      dateDebutE:[this.params.dateDebutE,Validators.required],
      duree:[this.params.duree,Validators.required],
      periodicite:[this.params.periodicite,Validators.required],
      frequence:[this.params.frequence,Validators.required],
      heureTontine:[this.params.heureTontine,Validators.required],
      lieuTontine:[this.params.lieuTontine,Validators.required],
      nbreBenef:[this.params.nbreBenef,Validators.required],
      // eslint-disable-next-line @typescript-eslint/naming-convention
      // tontine_id:[this.id]
    });
  }

  setCycle($event: any){
    this.cycle = $event.target.value;
  }


  onSubmit(){
    if(this.formGroup.invalid){
      // this.presentToast('top','Champs Requis','danger');
    console.log(this.formGroup.value);
    }else{
      this.tontineService.updateExercice(
        this.formGroup.value,this.params.id
      ).subscribe((data)=>{
        console.log(data);
        this.generateSeances(data.data);


      },(err)=>{
        console.log(err);
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

    if(this.periodeExercice === 'Jour'){
      this.facteur = 1;
    }else if(this.periodeExercice === 'Semaine'){
      this.facteur = 7;
    }else if(this.periodeExercice === 'Mois'){
      this.facteur = 30;
    }else if(this.periodeExercice === 'Annee'){
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
    // for(let date of dateArr){
    //   this.tontineService.createNewSeance({
    //     dateS: date,
    //     exercice_id: data.id
    //   }).subscribe(
    //     (val)=>console.log(val),
    //     (err)=>console.log(err)
    //   );
    // }

    dateArr.splice(0,dateArr.length);
    // setTimeout(() => {
    //   window.location.reload();
    // }, 2000);

  }

}
