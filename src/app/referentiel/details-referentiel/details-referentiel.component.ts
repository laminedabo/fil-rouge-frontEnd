import { ReferentielService } from './../../Services/referentiel.service';
import { ActivatedRoute } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Competence } from '../referentiel';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-details-referentiel',
  templateUrl: './details-referentiel.component.html',
  styleUrls: ['./details-referentiel.component.css']
})
export class DetailsReferentielComponent implements OnInit {

  constructor(private route: ActivatedRoute, private referentielService: ReferentielService) { }
  referentiel = {
    "libelle" : "",
    "presentation" : "",
    "programme": File,
    "critereAdmission" : "",
    "critereEvaluation" : "",
    "promos": [{
      titre: "",
      description: "",
      etat: "",
      fabrique: ""
    }],
    "competences": []
  };


  color='primary'

  @ViewChild("program") showProg: ElementRef;

  ngOnInit(): void {
    this.referentielService.getReferentiel(this.route.snapshot.params['id']).subscribe(
      data => {
        this.referentiel = data;
        this.showProgram();
        console.log(this.referentiel)
      },
      error => {
        console.log(error);
      }
    )
  }

  generatePdf(){
    const documentDefinition = this.getDocument();
    pdfMake.createPdf(documentDefinition).open();
  }

  showProgram() {
    const file = this.referentiel.programme
    var obj = document.createElement('object');
    obj.style.width = '100%';
    obj.style.height = '842pt';
    obj.type = 'application/pdf';
    obj.data = 'data:application/pdf;base64,' + file;
    this.showProg.nativeElement.appendChild(obj);
  }

  getDocument(){
    return {
      info: {
        title: 'récap. referentiel',
        author: 'ldab_dev',
        subject: 'Referentiel',
      },
      pageSize: 'A3',
      watermark: { text: 'Sonatel Academy', angle: 60, color: 'blue', opacity: 0.08, bold: true, italics: true },
      content: [
        {
          text: this.referentiel.libelle,
          bold: true,
          fontSize: 25,
          alignment: 'center',
          decoration: 'underline',
          margin: [0, 0, 0, 20]
        },
        {
          columns: [
            {
              text: 'Présentation',
              bold: true,
              fontSize: 20,
              background: 'yellow',
              margin: [0, 0, 0, 5],
            },
          ]
        },
        {
          columns: [
            [
              {
                text: this.referentiel.presentation,
                fontSize: 15,
              }
            ]
          ]
        },
        {
          columns: [
            {
              text: 'Critères d\'admission',
              bold: true,
              fontSize: 20,
              background: 'yellow',
              margin: [0, 15, 0, 5],
            },
          ]
        },
        {
          columns: [
            [
              {
                text: this.referentiel.critereAdmission,
                fontSize: 15,
              }
            ]
          ]
        },
        {
          columns: [
            {
              text: 'Critères d\'évaluation',
              bold: true,
              fontSize: 20,
              background: 'yellow',
              margin: [0, 15, 0, 5],
            },
          ]
        },
        {
          columns: [
            [
              {
                text: this.referentiel.critereEvaluation,
                fontSize: 15,
              }
            ]
          ]
        },
        {
          columns: [
            {
              text: 'Compétences évaluées',
              bold: true,
              fontSize: 20,
              background: 'yellow',
              margin: [0, 15, 0, 10],
            }
          ]
        },
        this.getCompetences(this.referentiel.competences),
        {
          columns: [
            {
              text: 'Promos associées',
              bold: true,
              fontSize: 20,
              background: 'yellow',
              margin: [0, 15, 0, 10],
            },
          ]
        },
        {
          table:{
            widths: ['*','auto','*','*'],
            body:[
              [
                {
                  text: 'Titre',
                  bold: true,
                },
                {
                  text: 'Description',
                  bold: true,
                },
                {
                  text: 'Fabrique',
                  bold: true,
                },
                {
                  text: 'Etat',
                  bold: true,
                }
              ],
              ...this.getPromos()
            ]
          }
        }
      ]
    }
  }

  getCompetences(competences: Competence[]) {
    const cmps: any = [];
    competences.forEach(cmp => {
      cmps.push(
        [
          {
            text: cmp.libelle,
            color: 'blue',
            bold: true
          },
          {
            columns: [
              [
                {
                  text: 'Critère d\'évaluation',
                  color: 'indigo',
                },
                {
                  text: cmp.niveau[0].critereEvaluation,
                  fontSize: 10,
                  
                }
              ],
              [
                {
                  text: 'Groupe d\'actions',
                  color: 'indigo',
                },
                {
                  text: cmp.niveau[0].groupeAction,
                  fontSize: 10,
                }
              ]
            ],
          },
          {
            columns: [
              [
                {
                  text: 'Critère d\'évaluation',
                  color: 'indigo',
                },
                {
                  text: cmp.niveau[1].critereEvaluation,
                  fontSize: 10,
                }
              ],
              [
                {
                  text: 'Groupe d\'actions',
                  color: 'indigo',
                },
                {
                  text: cmp.niveau[1].groupeAction,
                  fontSize: 10,
                }
              ]
            ],
          },
          {
            columns: [
              [
                {
                  text: 'Critère d\'évaluation',
                  color: 'indigo',
                },
                {
                  text: cmp.niveau[2].critereEvaluation,
                  fontSize: 10,
                }
              ],
              [
                {
                  text: 'Groupe d\'actions',
                  color: 'indigo',
                },
                {
                  text: cmp.niveau[2].groupeAction,
                  fontSize: 10,
                }
              ]
            ],
          },
        ]
      )
    })
    return {
      table: {
        widths: ['auto','*','*','*'],
        body: [
          [
            {
              text: 'Libellé',
              style: 'tableHeader',
              bold: true
            },
            {
              text: 'Niveau 1',
              style: 'tableHeader',
              bold: true
            },
            {
              text: 'Niveau 2',
              style: 'tableHeader',
              bold: true
            },
            {
              text: 'Niveau 3',
              style: 'tableHeader',
              bold: true
            },
          ],
          ...cmps
        ]
      }
    }
  }

  getPromos(): any{
    const promos = [];
    this.referentiel.promos.forEach(
      promo => {
        promos.push(
          [
            {
              text: promo.titre
            },
            {
              text: promo.description
            },
            {
              text: promo.fabrique
            },
            {
              text: promo.etat
            } 
          ]
        )
      }
    );
    return promos
  }

}
