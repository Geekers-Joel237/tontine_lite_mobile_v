import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-tontine-detail',
  templateUrl: './tontine-detail.page.html',
  styleUrls: ['./tontine-detail.page.scss'],
})
export class TontineDetailPage implements OnInit {
  currentUser = null;
  user = null;

  constructor(
    private router: Router,
    private alertController: AlertController,

  ) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    console.log(this.currentUser);
    if(!this.currentUser)
      {this.router.navigate(['/login']);
      return;
    }else{
      this.user = this.currentUser.user;

    }
  }

  async showActionSheet(){
    const alert = await this.alertController.create({
      header: 'Nouvel Exercice',
      inputs: [
        {
          name: 'nomE',
          placeholder: 'Nom',
        },
        {
          name: 'dateD',
          type: 'date',
          placeholder: 'Date Debut',

        }
        ,{
          name: 'dateF',
          type: 'date',
          placeholder: 'Date Fin',

        },
        {
          name: 'frequence',
          type:'number',
          min:1,
          placeholder: 'Frequence en Jours',

        },
        {
         name: 'heure',
          type:'time',
          placeholder: 'Heure Tontine',

        }
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'destroy',
          cssClass: 'secondary',
          handler: () => {
              console.log('Confirm Cancel');
          }
      },
      {
          text: 'Envoyer',
          handler: (alertData) => { //takes the data
            // if(alertData.code === item.codeAdhesion){
            //   this.tontineService.postMembre({user_id:this.user.id,tontine_id:item.id,exercice_id:null})
            //   .subscribe((data)=>{
            //       console.log(data);
            //       this.getTontinesUser(this.user.id);
            //   },(err)=>{
            //     console.log(err);
            //   });
            //   // this.presentToast('top','Bienvenue','success');
            //   // this.router.navigate(['/tabs-menu/demandes']);
            // }else{
            //   this.presentToast('top','Code Errone','danger');
            // }
              console.log(alertData);
          }
      }
      ]
    });

    await alert.present();
    console.log(alert);

  }



}
