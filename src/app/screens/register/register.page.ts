import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { country } from './countries';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  formGroup: FormGroup;
  password_input_type = 'password';
  countries = country.countries;
  code = '';
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController,
  ) { }

  get nom(){return this.formGroup.get('nom');}

  get prenom(){return this.formGroup.get('prenom');}
  get email(){return this.formGroup.get('email');}

  get telephone(){return this.formGroup.get('telephone');}
  get adresse(){return this.formGroup.get('adresse');}

  get ville(){return this.formGroup.get('ville');}

  get pays(){return this.formGroup.get('pays');}
  get cni(){return this.formGroup.get('cni');}

  get password(){return this.formGroup.get('password');}
  get password2(){return this.formGroup.get('password2');}

  get check(){return this.formGroup.get('check');}

  ngOnInit() {
    this.formGroup = this.fb.group({
      nom:['',Validators.compose([
        Validators.required,Validators.minLength(3)
      ])

      ],
      prenom:['',Validators.required],
      email:['',Validators.compose([
        Validators.required,Validators.email
      ])],
      password:['',Validators.compose([
        Validators.required,Validators.minLength(8)
      ])],
      telephone:['',Validators.required],
      adresse:['',Validators.required],
      ville:['',Validators.required],
      pays:['',Validators.required],
      cni:['',Validators.required],
      password2:['',Validators.required],
      check:[false,Validators.required]


    });


  }

  changePassInputType(){
    this.password_input_type === 'password'? this.password_input_type='text':this.password_input_type='password';
  }

 async
   onSubmit(){
    if (this.formGroup.invalid) {
      console.log('missing fields',this.formGroup.value);
      this.presentToast('top','missing fields','warning');

  } else {
    if(this.formGroup.value.password === this.formGroup.value.password2){
      if(this.formGroup.value.check){
        this.formGroup.value.telephone = '+'+this.code + this.formGroup.value.telephone.replace(/\s/g, '');
        this.authService.register(this.formGroup.value)
        .subscribe((data)=>{
          localStorage.setItem('user',JSON.stringify(data));
          console.log('Success', data);
        this.presentToast('top','Register Success','success');
          this.router.navigate(['/tabs-menu']);

        },(err)=>{
          console.log('Error',err);
        });
      } else {
        this.presentToast('top','Veuillez accepter les conditions','warning');
      }
    } else{
      this.presentToast('top','Les mots de passe ne correspondent pas. Veuillez verifier!','danger');




    }
      // console.log('Veuillez confirmer votre mot de passe');

    }
  }

  async presentToast(position: 'top' | 'middle' | 'bottom',msg: string,color:string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      color:color,
      position
    });

    await toast.present();
  }

  setCode($event:any){
    let he= this.countries.filter((country)=>{
      return country.country === $event.target.value;
    })
    this.code = he[0].code;
    console.log(this.code);
  }
}
