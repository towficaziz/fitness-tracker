
import { NgForm } from '@angular/forms';
import { TrainingService } from './../training.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Exercise } from '../exercise.model';
import { map, Observable, Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';
import * as formRoot from '../../app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  exercises!: Exercise[];
  private exerciseSubscription!: Subscription;
  isLoading$!: Observable<boolean>;


  constructor(private trainingService: TrainingService, private uiService: UIService,
    private store: Store<formRoot.State>) { }
  // , private db: AngularFirestore
  ngOnInit() {

    this.isLoading$ = this.store.select(formRoot.getIsLoading);
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
    if(this.exerciseSubscription){
      this.exerciseSubscription.unsubscribe();
    }

  }

}
