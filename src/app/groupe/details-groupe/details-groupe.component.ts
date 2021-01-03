import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-details-groupe',
  templateUrl: './details-groupe.component.html',
  styleUrls: ['./details-groupe.component.css']
})
export class DetailsGroupeComponent implements OnInit {

  constructor(private userService: UserService) { }

  apprenants:any 

  ngOnInit(): void {
    this.userService.getApprenants().subscribe(
      data => {
        this.apprenants = data;
      },
      error => {
        console.log(error)
      }
    )
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

}
