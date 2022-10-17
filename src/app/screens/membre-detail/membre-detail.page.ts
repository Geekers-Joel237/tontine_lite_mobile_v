import { Component, OnInit } from '@angular/core';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-membre-detail',
  templateUrl: './membre-detail.page.html',
  styleUrls: ['./membre-detail.page.scss'],
})
export class MembreDetailPage implements OnInit {
  currentUser = null;
  currentTontine = null;
  id = null;

  constructor(
    private router: Router,
    private location: Location,

  ) { }

  ngOnInit() {
    registerLocaleData(localeFr,'fr');
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    this.currentTontine = JSON.parse(localStorage.getItem('currentTontine'));

    if(!this.currentUser)
      {this.router.navigate(['/login']);
      return;
    }else{
      this.getMembreInfo(this.id);
    }
  }

  myBackButton(){
    this.location.back();
  }

  getMembreInfo(id: number){

  }

}
