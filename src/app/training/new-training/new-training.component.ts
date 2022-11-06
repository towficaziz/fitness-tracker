
import { NgForm } from '@angular/forms';
import { TrainingService } from './../training.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Exercise } from '../exercise.model';

 import { map, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  exercises!: Exercise[];
  exerciseSubscription!: Subscription;
  constructor(private trainingService: TrainingService) { }
  // , private db: AngularFirestore
  ngOnInit() {
    // this.exercises = this.trainingService.getAvailableExercises();
    this.exerciseSubscription= this.trainingService.exercisesChanged.subscribe(
      exercises => (this.exercises = exercises)
      );
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm){
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy() {
    this.exerciseSubscription.unsubscribe();
  }

}
