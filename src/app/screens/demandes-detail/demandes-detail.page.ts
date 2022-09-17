import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DemandesService } from 'src/app/services/demandes.service';

@Component({
  selector: 'app-demandes-detail',
  templateUrl: './demandes-detail.page.html',
  styleUrls: ['./demandes-detail.page.scss'],
})
export class DemandesDetailPage implements OnInit {
  currentTontine = null;
  demandes = null;
  constructor(
    private router: Router,
    private demandeService: DemandesService,
    

  ) { }

  ngOnInit() {
    this.currentTontine = JSON.parse(localStorage.getItem('currentTontine'));
    if(this.currentTontine == null){
      this.router.navigate(['/tabs-menu/demandes']);
    }else{
    this.demandes = this.currentTontine.demandes;
    }

  }

  back(){
    localStorage.removeItem('currentTontine');
    this.router.navigate(['/tabs-menu/demandes']);
  }

  acceptDemande(item: any,index: number){
    this.demandeService.acceptDemande(item.id,item.user_id).subscribe(
      (data)=>{
        console.log(data);
        this.demandes[index].validation = true;
        this.currentTontine.demandes = this.demandes;
        localStorage.setItem('currentTontine', JSON.stringify(this.currentTontine));
      },
      (err)=>console.log(err)
    );
  }

  cancelDemande(item: any){

  }

}
