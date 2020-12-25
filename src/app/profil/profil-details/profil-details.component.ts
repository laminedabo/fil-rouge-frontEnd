import { Injectable } from '@angular/core';
import { Component,  OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profil-details',
  templateUrl: './profil-details.component.html',
  styleUrls: ['./profil-details.component.css']
})

@Injectable({
  providedIn: 'root'
})

export class ProfilDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  id: number;
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
  }

}
