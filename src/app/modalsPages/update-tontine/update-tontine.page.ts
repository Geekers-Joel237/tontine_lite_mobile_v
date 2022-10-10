import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, NavParams, ToastController } from '@ionic/angular';
import { TontinesService } from 'src/app/services/tontines.service';

@Component({
  selector: 'app-update-tontine',
  templateUrl: './update-tontine.page.html',
  styleUrls: ['./update-tontine.page.scss'],
})
export class UpdateTontinePage implements OnInit {
  formGroup: FormGroup;
  currentTontine = null;
  id = null;

  constructor(
    private fb: FormBuilder,
    private tontineService: TontinesService,
    private router: Router,
    private toastController: ToastController,
    private navParams: NavParams,
    private loadingCtrl: LoadingController,


  ) { }


  get nomT(){return this.formGroup.get('nomT');}

  get type(){return this.formGroup.get('type');}
  get montantT(){return this.formGroup.get('montantT');}

  get maxT(){return this.formGroup.get('maxT');}
  get slogan(){return this.formGroup.get('slogan');}

  get retard(){return this.formGroup.get('retard');}

  get echec(){return this.formGroup.get('echec');}
  get sanction(){return this.formGroup.get('sanction');}

  get reglement(){return this.formGroup.get('reglement');}
  get file(){return this.formGroup.get('file');}

  get check(){return this.formGroup.get('check');}

  ngOnInit() {
    this.currentTontine = this.navParams.data.currentTontine;
    this.id = this.navParams.data.id;
    this.syncForm();
  }


  syncForm(){
    this.formGroup = this.fb.group({
      nomT:[this.currentTontine.nomT,Validators.compose([
        Validators.required,Validators.minLength(3)
      ])

      ],
      type:[this.currentTontine.type,Validators.required],
      montantT:[this.currentTontine.montantT,Validators.compose([
        Validators.required
      ])],
      reglement:[this.currentTontine.reglement,Validators.compose([
        Validators.required,Validators.minLength(25)
      ])],
      maxT:[this.currentTontine.maxT,Validators.required],
      slogan:[this.currentTontine.slogan,Validators.required],
      retard:[this.currentTontine.retard,Validators.required],
      echec:[this.currentTontine.echec,Validators.required],
      sanction:[this.currentTontine.sanction,Validators.required],
    });

  }


  async onSubmit(){
    const loading = await this.loadingCtrl.create({
      message: 'En Cours...',
      // duration: 3000,
      spinner: 'circles',
    });

    loading.present();
  this.tontineService.updateTontine(this.formGroup.value,this.id).subscribe(
    (data)=>{
      console.log(data);
      loading.dismiss();
      window.location.reload();
    },(err)=>console.log(err)
  );
  }
}
