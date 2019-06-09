import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import {throwError as ObservableThrowError, Observable, AsyncSubject, BehaviorSubject} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ENV } from './env.config';
import { UserModel } from '../models/user.model';
import { Auth0ProfileModel } from '../models/auth0Profile.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _allUsers: UserModel[] = [];
  private newUser$: Observable<UserModel>;
  private authenticatedUser: UserModel;
  private authenticatedUser$ = new AsyncSubject<UserModel>();
  private authenticatedUserProfile$: Observable<Auth0ProfileModel>;
  private allUsers$ = new BehaviorSubject<UserModel[]>([]);
  private myTeam$ = new BehaviorSubject<UserModel[]>([]);
  private allUserCnt$ = new BehaviorSubject<number>(0);
  private myTeamCnt$ = new BehaviorSubject<number>(0);

  foo: string;

  constructor(private http: HttpClient, private auth: AuthService) {
    this.authenticatedUserProfile$ = this.auth.getAuthenticatedUserProfileStream();
    this.authenticatedUserProfile$.subscribe((profile) => {
      this.authenticatedUser = new UserModel(
        profile.uid,
        'regular',
        profile.firstName,
        profile.lastName,
        profile.email,
        profile.email.substring(profile.email.indexOf('@') + 1),
        'active',
        'uptodate',
        [profile.role],
        [],
        []
      );
      this.newUser$ = this.postUser$(this.authenticatedUser);
      this.newUser$.subscribe((data) => {
        this.authenticatedUser$.next(data);
        this.authenticatedUser$.complete();
      });
      this.getAllUsers$(profile.email.substring(profile.email.indexOf('@') + 1)).subscribe( (userList) => {
        console.log(profile.email.substring(profile.email.indexOf('@') + 1), userList);
        this._allUsers = userList;
        this.allUsers$.next(this._allUsers);
        this.allUserCnt$.next(this._allUsers.length);
      });
    });

  }

  getMyTeamObservable(): Observable<UserModel[]> {
    return this.myTeam$.asObservable();
  }
  getAllUsersObservable(): Observable<UserModel[]> {
    return this.allUsers$.asObservable();
  }
  getMyTeamCntObservable(): Observable<number> {
    return this.myTeamCnt$.asObservable();
  }
  getAllUserCntObservable(): Observable<number> {
    return this.allUserCnt$.asObservable();
  }
  getAuthenticatedUserStream() {
    return this.authenticatedUser$.asObservable();
  }

  private get _authHeader(): string {
    return `Bearer ${this.auth.accessToken}`;
  }
  // POST new User (login required)
  postUser$(User: UserModel): Observable<UserModel> {
    return this.http
      .post<UserModel>(`${ENV.BASE_API}user/new`, User, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }

  //
  getUser$(userId: string): Observable<UserModel> {
    return this.http
      .get<UserModel>(`${ENV.BASE_API}user/${userId}`, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }

  getAllUsers$(org: string): Observable<UserModel[]> {
    this.foo = encodeURI(org);
    return this.http
      .get<UserModel>(`${ENV.BASE_API}users/${org}`, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }

  // PUT existing User (login required)
  editUser$(id: string, User: UserModel): Observable<UserModel> {
    return this.http
      .put(`${ENV.BASE_API}User/${id}`, User, {
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
