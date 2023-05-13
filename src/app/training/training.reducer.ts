
import { Exercise } from "./exercise.model";
import { SET_AVAILABLE_TRAININGS, SET_FINISHED_TRAININGS, START_ACTIVE_TRAINING, STOP_ACTIVE_TRAINING, TrainingActions } from "./training.actions";
import * as fromRoot from '../app.reducer';
import { createFeatureSelector, createSelector } from "@ngrx/store";


export interface TrainingState{
  availableExercises: Exercise[];
  finishedExercises: Exercise[];
  activeTraining: Exercise | null;
}

export interface State extends fromRoot.State{
  training: TrainingState;

}

const initialState: TrainingState ={
  availableExercises:[],
  finishedExercises:[],
  activeTraining: null
};

export function trainingReducer(state = initialState, action: TrainingActions){
  switch(action.type){
    case SET_AVAILABLE_TRAININGS:
      return {
        ...state,
        availableExercises: action.payload
      };

    case SET_FINISHED_TRAININGS:
      return {
        ...state,
        finishedExercises: action.payload
      };
      case START_ACTIVE_TRAINING:
        return {
          ...state,
          activeTraining: state.availableExercises.find(ex => ex.id === action.payload)
        };

      case STOP_ACTIVE_TRAINING:
        return {
          ...state,
          activeTraining: null
        };


    default:
      return state;
  }
};

export const getTrainingState = createFeatureSelector<TrainingState>('training');

export const getAvailableTrainings = createSelector(getTrainingState, (state: TrainingState) => state.availableExercises);
export const getfinishedExercises = createSelector(getTrainingState, (state: TrainingState) => state.finishedExercises);
export const getactiveTraining = createSelector(getTrainingState, (state: TrainingState) => state.activeTraining);


