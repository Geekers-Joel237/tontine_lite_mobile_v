import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forget-pwd',
  templateUrl: './forget-pwd.page.html',
  styleUrls: ['./forget-pwd.page.scss'],
})
export class ForgetPwdPage implements OnInit {
  formGroup: FormGroup;
  formGroup2: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController,
  ) { }

  get telephone(){return this.formGroup.get('telephone');}
  get email(){return this.formGroup2.get('email');}

  ngOnInit() {
    this.formGroup = this.fb.group({
      telephone:['',Validators.required],
    });
    this.formGroup2 = this.fb.group({
      email:['',Validators.required],
    });
  }

  onSubmit(){
    if (this.formGroup.invalid) {
        console.log('missing fields');
        this.presentToast('top','missing fields');

    } else {
      this.authService.sendEmail(this.formGroup.value)
      .subscribe((data)=>{
        console.log('Success');
        //en attente
        // this.router.navigate(['/login']);

      },(err)=>{
        console.log('Error');
      });
    }
  }
  goTo(){
    this.router.navigate(['/login']);
  }

  async presentToast(position: 'top' | 'middle' | 'bottom',msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position
    });

    await toast.present();
  }
}
