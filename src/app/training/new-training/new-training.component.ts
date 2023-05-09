
import { NgForm } from '@angular/forms';
import { TrainingService } from './../training.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Exercise } from '../exercise.model';

 import { map, Observable, Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  exercises!: Exercise[];
  private exerciseSubscription!: Subscription;
  isLoading = true;
  private loadingSubscription!: Subscription;


  constructor(private trainingService: TrainingService, private uiService: UIService) { }
  // , private db: AngularFirestore
  ngOnInit() {
    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(
      isLoading =>{
        this.isLoading = isLoading;
      }
    );
    // this.exercises = this.trainingService.getAvailableExercises();
    this.exerciseSubscription= this.trainingService.exercisesChanged.subscribe(
      exercises => {
        this.exercises = exercises;
      }
      );
      this.fetchExercises();
  }

  fetchExercises(){
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm){
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy() {
    this.exerciseSubscription.unsubscribe();
    this.loadingSubscription.unsubscribe();
  }

}
