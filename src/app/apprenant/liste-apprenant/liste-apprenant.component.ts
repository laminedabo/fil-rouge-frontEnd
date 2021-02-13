import { Apprenant } from './../Apprenants';
import { Component, Input, OnInit } from '@angular/core';
import { ListeUsersComponent } from 'src/app/user/liste-users/liste-users.component';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-liste-apprenant',
  templateUrl: './liste-apprenant.component.html',
  styleUrls: ['./liste-apprenant.component.css']
})
export class ListeApprenantComponent implements OnInit {

  @Input('apprenants') apprenants: Apprenant[];
  constructor(public userDetails: ListeUsersComponent) { }

  ngOnInit(): void {
    this.apprClicked(this.apprenants[0])
  }

  idAppr: number
  apprClicked(appr:any){
    this.idAppr = appr.id;
  }

  showCard(appr: any){
    const documentDefinition = this.getInfos(appr);
    pdfMake.createPdf(documentDefinition).open();
  }

  getProfilePicObject(appr: any) {
    if (appr.avatar) {
      return {
        image: 'data:image/jpg;base64,'+appr.avatar ,
        width: 100,
        alignment : 'right'
      };
    }
    return null;
  }

  getInfos(appr: any){
    return {
      info: {
        title: 'carte_de_'+appr.prenom,
        author: 'ldab_dev',
        subject: 'Apprenant',
      },
      pageSize: 'A5',
      pageOrientation: 'landscape',
      watermark: { text: 'Sonatel Academy', angle: 60, color: 'red', opacity: 0.08, bold: true, italics: true },
      footer:  {text: '_______________________________________________________________________\nCohorte 3 sonatel academy', alignment: 'center' },
      content: [
        {
          text: 'Carte Apprenant',
          bold: true,
          fontSize: 25,
          alignment: 'center',
          decoration: 'underline',
          margin: [0, 0, 0, 20]
        },
        {
          text: 'Developpement Web/Mobile',
          fontSize: 20,
          color: 'red',
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        {
          columns:[
            [
              {
                text: 'Nom : '+appr.nom,
                fontSize: 15,
              },
              {
                text: 'Prénom : '+appr.prenom,
                fontSize: 15,
              },
              {
                text: 'Email : '+appr.email,
                fontSize: 15,
              },
              {
                text: 'Adresse : '+appr.adresse,
                fontSize: 15,
              }
            ],
            [
              this.getProfilePicObject(appr)
            ]
          ]
        },
        {
          columns:[
          {
            text: 'Sonatel Academy',
            fontSize: 20,
            color: 'green',
            alignment: 'left',
            margin: [0, 20, 0, 0]
          },
          { qr: 'apprenat à odc cohorte 3', fit: '50', alignment: 'right',margin: [0, 20, 0, 0]},
        ],
      },
      ]
    }
  }
}
