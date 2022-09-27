import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TontinesService } from 'src/app/services/tontines.service';

@Component({
  selector: 'app-add-exercice',
  templateUrl: './add-exercice.page.html',
  styleUrls: ['./add-exercice.page.scss'],
})
export class AddExercicePage implements OnInit {
  formGroup: FormGroup;
  cycle = 'Mois';
  currentTontine = null;

  constructor(
    private fb: FormBuilder,
    private tontineService: TontinesService,

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
      tontine_id:[101]
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
      this.tontineService.createNewExercice(
        this.formGroup.value
      ).subscribe((data)=>{
        console.log(data);
        window.location.reload();
      },(err)=>{
        console.log(err);
      });

    }
  }
}
