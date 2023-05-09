import { NgModule } from "@angular/core";
import { CurrentTrainingComponent } from "./current-training/current-training.component";
import { StopTrainingComponent } from "./current-training/stop-training.component";
import { NewTrainingComponent } from "./new-training/new-training.component";
import { PastTrainingsComponent } from "./past-trainings/past-trainings.component";
import { TrainingComponent } from "./training.component";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations:[
    TrainingComponent,
    CurrentTrainingComponent,
    PastTrainingsComponent,
    NewTrainingComponent,
    StopTrainingComponent
  ],
  imports:[
    SharedModule,
    AngularFireAuthModule,
  ],
  exports:[],
  entryComponents: [StopTrainingComponent]
})
export class TrainingModule{}
