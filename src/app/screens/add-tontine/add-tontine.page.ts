/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { TontinesService } from 'src/app/services/tontines.service';

@Component({
  selector: 'app-add-tontine',
  templateUrl: './add-tontine.page.html',
  styleUrls: ['./add-tontine.page.scss'],
})
export class AddTontinePage implements OnInit {
  formGroup: FormGroup;
  files = [];
  currentUser = null;
  user = null;

  constructor(
    private fb: FormBuilder,
    private tontineService: TontinesService,
    private router: Router,
    private toastController: ToastController,


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
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    console.log(this.currentUser);
    if(!this.currentUser)
      {this.router.navigate(['/login']);
      return;
    }else{
      this.user = this.currentUser.user;
      this.syncForm();
    }


      // check:[false,Validators.required]




  }

  syncForm(){
    this.formGroup = this.fb.group({
      nomT:['',Validators.compose([
        Validators.required,Validators.minLength(3)
      ])

      ],
      type:['',Validators.required],
      montantT:['',Validators.compose([
        Validators.required
      ])],
      reglement:['',Validators.compose([
        Validators.required,Validators.minLength(25)
      ])],
      maxT:['',Validators.required],
      slogan:['',Validators.required],
      retard:['',Validators.required],
      echec:['',Validators.required],
      sanction:['',Validators.required],
      file:[''],
      user_id:this.user.id,
    });

  }


  onSubmit(){
    if(this.formGroup.invalid){
      this.presentToast('top','Champs Requis','danger');
      console.log('invalid form');
    }else{
      console.log(this.formGroup.value);
      this.tontineService.createNewTontine(this.formGroup.value).subscribe((data)=>{
        console.log(data);
        if(this.files.length > 0){
          const formData = new FormData();
          formData.append('file',this.files[this.files.length - 1][0]);
          formData.append('tontine_id',data.data.id);
          formData.append('type','reglement');
          console.log(formData);
          this.tontineService.sendFiles(formData).subscribe(
            (val)=>{
              console.log(val);
              this.presentToast('top','Tontine Cree','success');
              this.router.navigate(['/tabs-menu/tontines']);
            },
            (err)=>{console.log(err);
            this.presentToast('top','Erreur Veuillez Recommencer','danger');
            }
          );
        }
        this.tontineService.postMembre({user_id:this.user.id,tontine_id:data.data.id,exercice_id:null})
          .subscribe((value)=>{
              console.log(value);
              this.presentToast('top','Tontine Cree','success');
              this.router.navigate(['/tabs-menu/tontines']);
          },(err)=>{
            console.log(err);

          });
      },(err)=>{
        console.log(err);
      });
    }
  }

  getFiles($ev){
      this.files.push($ev.target.files);
      console.log(this.files[this.files.length - 1]);
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
