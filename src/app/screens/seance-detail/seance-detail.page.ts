import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SeancesService } from 'src/app/services/seances.service';

@Component({
  selector: 'app-seance-detail',
  templateUrl: './seance-detail.page.html',
  styleUrls: ['./seance-detail.page.scss'],
})
export class SeanceDetailPage implements OnInit {
  id = null;
  currentUser = null;
  currentSeance = null;
  currentSegment = 'cotisations';

  constructor(
    private router: Router,
    private seancesService: SeancesService,
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
      this.getSeanceInfo(this.id);
    }
  }

  getSeanceInfo(id: number){
    this.seancesService.getSeanceInfo(id).subscribe(
      (data)=>{
        console.log(data);
        this.currentSeance = data.data;
      },(err)=>{
        console.log(err);
      }
    )
  }


  deleteSeance(id: number){
    this.seancesService.deleteSeance(id).subscribe(
      (data)=> {
        console.log(data);
      },(err)=>{
        console.warn(err);
      }
    );
  }

  updateSeance(id: number){
    this.router.navigate(['/seance-update/'+id]);
  }

  segmentChanged($event){
    this.currentSegment = $event.target.value;
  }
}
