import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formGroup: FormGroup;
  password_input_type = 'password';


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController,

  ) { }

  get telephone(){return this.formGroup.get('telephone');}

  get password(){return this.formGroup.get('password');}


  ngOnInit() {
    this.formGroup = this.fb.group({
      telephone:['',Validators.required],
      password:['',Validators.required]
    });
  }

  changePassInputType(){
    this.password_input_type === 'password'? this.password_input_type='text':this.password_input_type='password';
  }

  onSubmit(){
    if (this.formGroup.invalid) {
        console.log('missing fields');
        this.presentToast('top','missing fields','warning');
    } else {
      this.authService.login(this.formGroup.value)
      .subscribe((data)=>{
        localStorage.setItem('user',JSON.stringify(data));
        console.log('Success');
        this.presentToast('top','Login Success','success');

        this.router.navigate(['/tabs-menu/tontines']);


      },(err)=>{
        console.log(this.formGroup.value);
        console.log('Error',err);
        this.presentToast('top','Informations Incorrectes','danger');
  });
    }}


  async presentToast(position: 'top' | 'middle' | 'bottom',msg: string,color:string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      color:color,
      position
    });

    await toast.present();
  }



}
