import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AuthService } from './services/auth.service';
import { TrainingService } from './services/training.service';
import { UserService } from './services/user.service';
import {AsyncSubject, BehaviorSubject, Observable} from 'rxjs';
import { UserModel } from './models/user.model';
import { TrainingModel } from './models/training.model';
import { Router } from '@angular/router';
import { FileModel } from './models/file.model';
import { CmsService } from './services/cms.service';
import {Auth0ProfileModel} from './models/auth0Profile.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isCollapsed = false;
  triggerTemplate: TemplateRef<void> | null = null;
  @ViewChild('trigger') customTrigger: TemplateRef<void>;

  sideMenuItems = [
    {
      label: 'Welcome!',
      icon: 'home',
      route: '/home',
      requiresLogin: false
    },
    {
      label: 'Get Started!',
      icon: 'thunderbolt',
      route: '/getstarted',
      requiresLogin: true
    },
    {
      label: 'Roles',
      icon: 'crown',
      route: '/roles',
      requiresLogin: true
    },
    {
      label: 'Trainings',
      icon: 'solution',
      route: '/trainings',
      requiresLogin: true
    },
    {
      label: 'Users',
      icon: 'user',
      route: '/users',
      requiresLogin: true
    },
    {
      label: 'Pricing',
      icon: 'dollar',
      route: '/plans',
      requiresLogin: false
    }
  ];

  listData$ = new BehaviorSubject<any[]>([]);
//  nuggets: Object;

  authenticatedUser: Auth0ProfileModel;
  authenticatedUser$: Observable<Auth0ProfileModel>;
  isAuthenticated$: Observable<boolean>;
  myTrainings$: Observable<TrainingModel[]>;
  allTrainings$: Observable<TrainingModel[]>;
  myTrainingCnt$: Observable<number>;
  allTrainingCnt$: Observable<number>;
  myTeam$: Observable<UserModel[]>;
  allUsers$: Observable<UserModel[]>;
  myTeamCnt$: Observable<number>;
  allUserCnt$: Observable<number>;
  filesUploaded$: Observable<FileModel[]>;
  filesUploadedCnt$: Observable<number>;


  list = new Array<any>([]);
  currentNugget = '';
  showListFlag = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private trainingService: TrainingService,
    private router: Router,
    private cmsService: CmsService
  ) {}

  ngOnInit(): void {
    this.authenticatedUser$ = this.authService.getAuthenticatedUserProfileStream();
    this.authenticatedUser$.subscribe((userProfile) => {
      this.authenticatedUser = userProfile;
      console.log('AppComponent  ', this.authenticatedUser);
    });
    this.isAuthenticated$ = this.authService.getIsAuthenticatedStream();
    this.myTeam$ = this.userService.getMyTeamObservable();
    this.myTeamCnt$ = this.userService.getMyTeamCntObservable();
    this.allUsers$ = this.userService.getAllUsersObservable();
    this.allUserCnt$ = this.userService.getAllUserCntObservable();
    this.allTrainings$ = this.trainingService.getAllTrainingsObservable();
    this.myTrainings$ = this.trainingService.getMyTrainingsObservable();
    this.allTrainingCnt$ = this.trainingService.getAllTrainingCntObservable();
    this.myTrainingCnt$ = this.trainingService.getMyTrainingCntObservable();
    this.filesUploadedCnt$ = this.cmsService.getUploadedFileCntStream();

/*
    this.nuggets = {
      mytrainings: {
        data: this.myTrainings$,
        title: 'My Trainings',
        fields: ['title']
      },
      myTeam: {
        data: this.myTeam$,
        title: 'My Team',
        fields: ['firstName', 'lastName']
      },
      trainings: {
        data: this.allTrainings$,
        title: 'Trainings',
        fields: ['title']
      },
      users: {
        data: this.allUsers$,
        title: 'Users',
        fields: ['firstName', 'lastName']
      },
      files: {
        data: this.filesUploaded$,
        title: 'Files Uploaded',
        fields: ['fileName']
      }
    };
    */
  }

  addTraining() {
    this.trainingService.addTrainings();
  }

  showList(name: string) {
    this.currentNugget = name;
    /*
    console.log('name...', name)
    this.showListFlag = true;
    this.list = this.nuggets[name].data.subscribe(x => x);
    console.log('list...', this.list)
    this.listData$.next(this.list);
    */
  }

  signup() {
    this.authService.signup();
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }

}
