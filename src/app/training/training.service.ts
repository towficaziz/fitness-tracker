
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from "@angular/core";
import { map, Subject, Subscription } from "rxjs";

import { Exercise } from "./exercise.model";
import { UIService } from '../shared/ui.service';
import * as UI from '../shared/ui.actions';
import * as fromTraining from './training.reducer';
import * as Training from './training.actions'
import { Store } from '@ngrx/store';


@Injectable()
export class TrainingService{
exerciseChanged = new Subject<Exercise>();

exercisesChanged = new Subject<Exercise[]>();
finishedExercisesChanged = new Subject<Exercise[]>();
private availableExercises: Exercise[] = [];
private fbSubs: Subscription[] = [];

  private runningExercise: Exercise ;

  constructor(private db: AngularFirestore, private uiService: UIService,
    private store: Store<fromTraining.State>){}

  fetchAvailableExercises(){
    this.store.dispatch(new UI.StartLoading());
    // this.uiService.loadingStateChanged.next(true);
    this.fbSubs.push( this.db
    .collection('availableExercises')
    .snapshotChanges()
    .pipe(map((docArray: any) => {
      // throw(new Error());
      return docArray.map((doc: any) => {
        return {
          id: doc.payload.doc.id,
          name: doc.payload.doc.data().name,
          duration: doc.payload.doc.data().duration,
          calories: doc.payload.doc.data().calories
        };
      });
    }))
    .subscribe((exercises: Exercise[]) =>{
      this.store.dispatch(new UI.StopLoading());
      this.store.dispatch(new Training.SetAvailableTrainings(exercises));
    }, error =>{
      this.store.dispatch(new UI.StopLoading());
      this.uiService.showSnackbar(
        'Fetching Exercises Failed!, Please try again later', null!, 300);
        this.exercisesChanged.next(null!);
    }));
  }

  startExercise(selectedId: string){

  this.store.dispatch(new Training.StartActiveTraining(selectedId));
  }

  completeExercise(){
    this.addDataToDatabase({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    });
    this.store.dispatch(new Training.StopActiveTraining());
  }

  cancelExercise(progress: number){
    this.addDataToDatabase({
    ...this.runningExercise,
    duration: this.runningExercise!.duration! * (progress / 100),
    calories: this.runningExercise!.calories! * (progress / 100),
    date: new Date(),
    state:'cancelled'
  });
  this.store.dispatch(new Training.StopActiveTraining());
  }

  getRunningExercise(){
    return { ...this.runningExercise};
  }

  fetchCompletedOrCancelledExercises(){
    this.fbSubs.push( this.db
    .collection('finishedExercises')
    .valueChanges()
    .subscribe((exercises: Exercise[])=>{
      // this.finishedExercisesChanged.next(exercises);
      this.store.dispatch(new Training.SetFinishedTrainings(exercises));
    }));
  }

  cancelSubscriptions(){
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }

  private addDataToDatabase(exercise: Exercise){
    this.db.collection('finishedExercises').add(exercise);
  }
}
