import { NgForm } from '@angular/forms';
import { TrainingService } from './../training.service';
import { Component, OnInit } from '@angular/core';
import { Exercise } from '../exercise.model';

 import { AngularFirestore } from '@angular/fire/compat/firestore';
 import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  exercises!: Observable<any>;
  constructor(private trainingService: TrainingService, private db: AngularFirestore) { }
  // , private db: AngularFirestore
  ngOnInit() {
    // this.exercises = this.trainingService.getAvailableExercises();
    this.exercises=this.db
    .collection('availableExercises')
    .valueChanges();
  }

  onStartTraining(form: NgForm){
    this.trainingService.startExercise(form.value.exercise);
  }

}
