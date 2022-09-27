import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ExercicesService } from 'src/app/services/exercices.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-exercice-detail',
  templateUrl: './exercice-detail.page.html',
  styleUrls: ['./exercice-detail.page.scss'],
})
export class ExerciceDetailPage implements OnInit {
  currentUser = null;
  id = null;
  currentExercice = null;
  constructor(
    private location: Location,
    private exercicesService: ExercicesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,


  ) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    console.log(this.currentUser);
    if(!this.currentUser)
      {this.router.navigate(['/login']);
      return;
    }else{
      this.id = this.activatedRoute.snapshot.params.id;
      console.log(this.id);

      this.getExerciceInfo(this.id);
    }
  }

  myBackButton(){
    this.location.back();
  }

  getExerciceInfo(id: number){
    this.exercicesService.getExerciceInfo(this.id).subscribe(
      (data)=>{
        console.log(data);
        this.currentExercice = data.data;
      },(err)=>{
        console.log(err);
      }
    );
  }
}
