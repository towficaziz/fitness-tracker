import { TrainingService } from './training.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {

  ongoingTraining = false;
  exerciseSbuscription!: Subscription;

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.exerciseSbuscription = this.trainingService.exerciseChanged.subscribe(
      exercise =>{
        if(exercise){
          this.ongoingTraining = true;
        } else{
          this.ongoingTraining = false;
        }
    })
  }

  ngOnDestroy() {
    if(this.exerciseSbuscription){
      this.exerciseSbuscription.unsubscribe();
    }
  }

}
