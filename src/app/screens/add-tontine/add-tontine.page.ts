import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-tontine',
  templateUrl: './add-tontine.page.html',
  styleUrls: ['./add-tontine.page.scss'],
})
export class AddTontinePage implements OnInit {
formGroup: FormGroup;
  constructor(
    private fb: FormBuilder,

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
}
