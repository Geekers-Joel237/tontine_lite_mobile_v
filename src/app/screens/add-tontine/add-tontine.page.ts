/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
      console.log('invalid form');
    }else{
      console.log(this.formGroup.value);
      this.tontineService.createNewTontine(this.formGroup.value).subscribe((data)=>{
        console.log(data);
        if(this.files.length > 0){
          this.tontineService.sendFiles({
            file:this.files[0][0],
            tontine_id: data.data.id
          }).subscribe(
            (val)=>console.log(val),
            (err)=>console.log(err)
          );
        }
      },(err)=>{
        console.log(err);
      });
    }
  }

  getFiles($ev){
      this.files.push($ev.target.files);
      console.log(this.files[0][0]);
  }
}
