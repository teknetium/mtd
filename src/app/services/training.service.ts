import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import {throwError as ObservableThrowError, Observable, BehaviorSubject} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ENV } from './env.config';
import { TrainingModel } from '../models/training.model';


@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  url = 'http://localhost:3000';

  fakeTraining: TrainingModel;
  trainingObj: TrainingModel;

  private _allTrainings: TrainingModel[] = [];
  private _myTrainings: TrainingModel[] = [];

  private _allTrainings$: BehaviorSubject<TrainingModel[]>;
  private _myTrainings$: BehaviorSubject<TrainingModel[]>;
  private _allTrainingCnt$: BehaviorSubject<number>;
  private _myTrainingCnt$: BehaviorSubject<number>;

  // Using Angular DI we use the HTTP service
  constructor(private http: HttpClient, private auth: AuthService) {
    this._allTrainings$ = new BehaviorSubject<TrainingModel[]>(this._allTrainings);
    this._allTrainingCnt$ = new BehaviorSubject<number>(this._allTrainings.length);
    this._myTrainings$ = new BehaviorSubject<TrainingModel[]>(this._myTrainings);
    this._myTrainingCnt$ = new BehaviorSubject<number>(this._myTrainings.length);

    this._myTrainingCnt$.next(0);
    this._allTrainingCnt$.next(0);
    this.loadData();
  }

  loadData() {
    this._myTrainings = [];
    this._allTrainings = [];

    this._myTrainingCnt$.next(0);
    this._allTrainingCnt$.next(0);
  }

  addTrainings() {
    this.fakeTraining = new TrainingModel(
      'online',
      'fake1',
      'tmp',
      'tmp',
      'fake',
      'greg',
      Date.now(),
      []
    );
    this._allTrainings.push(this.fakeTraining);
    this._myTrainings.push(this.fakeTraining);
    this._myTrainings$.next(this._myTrainings);
    this._allTrainings$.next(this._allTrainings);
    this._myTrainingCnt$.next(this._myTrainings.length);
    this._allTrainingCnt$.next(this._allTrainings.length);
  }

  getMyTrainingsObservable(): Observable<TrainingModel[]> {
    return this._myTrainings$.asObservable();
  }

  getAllTrainingsObservable(): Observable<TrainingModel[]> {
    return this._allTrainings$.asObservable();
  }
  getMyTrainingCntObservable(): Observable<number> {
    return this._myTrainingCnt$.asObservable();
  }

  getAllTrainingCntObservable(): Observable<number> {
    return this._allTrainingCnt$.asObservable();
  }

  createTraining(type, title, cat, subCat, desc, owner, dateCreated,fileHandles) {
    this.trainingObj = new TrainingModel(type, title, cat, subCat, desc, owner, dateCreated, fileHandles);
    this._allTrainings.push(this.trainingObj);
    this._allTrainings$.next(this._allTrainings);
    this._allTrainingCnt$.next(this._allTrainings.length);
  }

//  getAll(): Observable<any> {
//    return this.http.get(this.url + '?_sort=id&_order=desc')
//      .map(response => response.json());
//  }

  private get _authHeader(): string {
    return `Bearer ${this.auth.accessToken}`;
  }

  getTrainings$(): Observable<TrainingModel[]> {
    return this.http
      .get<TrainingModel[]>(`${ENV.BASE_API}trainings`)
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }

  // GET all trainings - private and public (admin only)
  getAdminTrainings$(): Observable<TrainingModel[]> {
    return this.http
      .get<TrainingModel[]>(`${ENV.BASE_API}trainings/admin`, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }

  // GET an training by ID (login required)
  getTrainingById$(id: string): Observable<TrainingModel> {
    return this.http
      .get<TrainingModel>(`${ENV.BASE_API}training/${id}`, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }

  // GET Users by training ID (login required)
  /*
  getUsersBytrainingId$(trainingId: string): Observable<UserModel[]> {
    return this.http
      .get<UserModel[]>(`${ENV.BASE_API}training/${trainingId}/Users`, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }
  */

  // POST new training (admin only)
  postTraining$(training: TrainingModel): Observable<TrainingModel> {
    return this.http
      .post<TrainingModel>(`${ENV.BASE_API}training/new`, training, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }

  // PUT existing training (admin only)
  editTraining$(id: string, training: TrainingModel): Observable<TrainingModel> {
    return this.http
      .put<TrainingModel>(`${ENV.BASE_API}training/${id}`, training, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }

  // DELETE existing training and all associated Users (admin only)
  deleteTraining$(id: string): Observable<any> {
    return this.http
      .delete(`${ENV.BASE_API}training/${id}`, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }

  // GET all trainings for a specific user
  getUserTrainings$(userId: string): Observable<TrainingModel[]> {
    return this.http
      .get<TrainingModel[]>(`${ENV.BASE_API}trainings/${userId}`, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }
  private _handleError(err: HttpErrorResponse | any): Observable<any> {
    const errorMsg = err.message || 'Error: Unable to complete request.';
    if (err.message && err.message.indexOf('No JWT present') > -1) {
      this.auth.login();
    }
    return ObservableThrowError(errorMsg);
  }
}
