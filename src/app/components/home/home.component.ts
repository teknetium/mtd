import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';



// const timer$ = interval(1000);

@Component({
  selector: 'mtd-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  cellArray = [
    {
      cellId: 'who',
      nonFocusImage: '../../assets/who-grad-fg.png',
      focusImage: '../../assets/who-grad-bg.png',
      image: '../../assets/who-grad-fg.png',
      heroImage: '../../assets/who-grad-fg.png',
      problem: `Is <span class="appname3">my</span><span class="appname4">Training</span><span class="appname3">docs</span>
      right for <span class="easy-as-pie">YOU?</span>`,
      solution: `<li><span class="q1">&nbsp;?&nbsp;</span>&nbsp;&nbsp;Is your training content disorganized, out of 
      date, or just plain missing?</li>
        <li><span class="q1">&nbsp;?&nbsp;</span>&nbsp;&nbsp;Do you need to track training status for employees?</li>
        <li><span class="q1">&nbsp;?&nbsp;</span>&nbsp;&nbsp;Does your team have training compliance requirements?</li><br>
        If you answered yes to any of these questions then you are exactly for whom
        <span class="appname3">my</span><span class="appname4">Training</span><span class="appname3">docs</span>
          was built.  Click through the remaining icons to learn more about the feature set.`,
      proSolution: ``,
      more: ``,
      planLabel: false
    },
    {
      cellId: 'easyAsPie',
      nonFocusImage: '../../assets/pie-grad-fg.png',
      focusImage: '../../assets/pie-grad-bg.png',
      image: '../../assets/pie-grad-fg.png',
      heroImage: '../../assets/pie-grad-fg.png',
      problem: `Getting started with <span class="appname3">my</span><span class="appname4">Training</span><span class="appname3">docs</span>  is as <span class="easy-as-pie">EASY AS PIE!</span>`,
      solution: `<ol><li>Upload your training content to our private, secure, cloud based training repository.</li>
        <li>Invite your direct reports to join your team in <span class="appname3">my</span><span class="appname4">Training</span><span class="appname3">docs</span>.</li>
        <li>Assign trainings to team members.</li>
        <li>Set training due dates.</li>
        </ol><br>
        You're done!`,
      proSolution: ``,
      planLabel: false,
      more: ``
    },
    {
      cellId: 'team',
      nonFocusImage: '../../assets/team-grad-fg.png',
      focusImage: '../../assets/team-grad-bg-black.png',
      image: '../../assets/team-grad-fg.png',
      heroImage: '../../assets/team-grad-fg.png',
      problem: 'Deploy to a single team or to your entire organization.',
      solution: `<span class="easy-as-pie">Single Team</span> - MyTrainingdocs does
      what no other Training Management System
      can do, lets you subscribe and deploy to your team and your team alone.  All in
      less than a day, giving you complete control over every aspect of your team's
      training content.<br><br>
      <span class="easy-as-pie">Entire Organization</span>
      - Deploying to your entire organization is a snap too.
      Simply check the box indicating that supervisors
      should deploy to their teams is all it takes.  Easy peasy!`,
      proSolution: ``,
      planLabel: true,
      more: ``
    },
    {
      cellId: 'stepWizard',
      focusImage: '../../assets/wizard-grad-bg.png',
      nonFocusImage: '../../assets/wizard-grad-fg.png',
      image: '../../assets/wizard-grad-fg.png',
      heroImage: '../../assets/wizard-grad-fg.png',
      problem: 'Step wizard driven.',
      solution: `With myTrainingdocs, getting things done is as easy as pie.
        Step wizards guide you effortlessly through application tasks.`,
      proSolution: ``,
      planLabel: true,
      more: ``
    },
    {
      cellId: 'fileTypes',
      nonFocusImage: '../../assets/files.png',
      focusImage: '../../assets/files.png',
      image: '../../assets/files.png',
      heroImage: '../../assets/files.png',
      problem: `Supports the native viewing of 17 file formats`,
      solution: `MyTrainingdocs supports the viewing of the following 17 file formats without the use of the application
      that created the document.  For example: you can upload an Adobe Photoshop file into myTrainingdocs and you can view
      it without using Adobe Photoshop!<br><br>`,
      proSolution: ``,
      planLabel: true,
      more: ``
    },
    {
      cellId: 'messages',
      nonFocusImage: '../../assets/message-grad-fg.png',
      focusImage: '../../assets/message-grad-fg.png',
      image: '../../assets/message-grad-fg.png',
      heroImage: '../../assets/message-grad-fg.png',
      problem: 'Email notifications ensure critical dates are not missed!',
      solution: `This plan includes a simple set of notifications sent to
        the student on a fixed schedule.<br><br>  `,
      proSolution: `This plan allows you to create custom
        notification schedules which gives you control over the trigger dates,
        recipients, and message content.`,
      planLabel: true,
      more: ``
    },
    {
      cellId: 'roles',
      nonFocusImage: '../../assets/roles-grad-fg.png',
      focusImage: '../../assets/roles-grad-fg.png',
      image: '../../assets/roles-grad-fg.png',
      heroImage: '../../assets/team-grad-bg-black.png',
      problem: 'Roles let you manage access to your training resources.',
      solution: `This plan provides the following fixed roles: <br>
        <br><b><i class="fas fa-fw fa-user"></i>&nbsp;&nbsp;&nbsp;basic user</b> : access is limited to only those trainings assigned to them
        <br><b><i class="fas fa-fw fa-user-tie"></i>&nbsp;&nbsp;&nbsp;supervisor</b> : access to each direct report's user and training data
        <br><b><i class="fas fa-fw fa-user-crown"></i>&nbsp;&nbsp;&nbsp;admin</b> :
        access to organization wide configuration data<br><br>`,
      proSolution: `In addition to the fixed roles from the Basic plan, you can create new roles that provide access
        to custom selected resources.`,
      planLabel: true,
      more: ''
    },
    {
      cellId: 'reports',
      nonFocusImage: '../../assets/report-grad-fg.png',
      focusImage: '../../assets/report-grad-fg.png',
      image: '../../assets/report-grad-fg.png',
      heroImage: '../../assets/report-grad-fg.png',
      problem: `Status and Usage Reports`,
      solution: `This plan provides a basic set of training
        status and usage reports.<br><br>`,
      proSolution: `This plan lets you create reports with
        custom content, recipients, and delivery schedules.`,
      planLabel: true,
      more: ''
    },
    {
      cellId: 'advTrainingWizard',
      nonFocusImage: '../../assets/adv-training-grad-fg.png',
      focusImage: '../../assets/adv-training-grad-bg.png',
      image: '../../assets/adv-training-grad-fg.png',
      heroImage: '../../assets/adv-training-grad-fg.png',
      problem: `Advanced Training Wizard`,
      solution: '',
      proSolution: `The Advanced Training Wizard gives you the ability
        to create a world class learning experience regardless of the content.
        The Advanced Training Wizard guides you through the integration of the
        following features:  <ul><li>Assessments</li><li>Inline
        feedback</li><li>Video content</li><li>Audio content
        </li><li>Synchronization of audio/video content with other content</li></ul>`,
      planLabel: true,
      more: ``
    }
  ];

  index = 0;
  visible = false;
  placement = 'left';
  currentCellIndex = 0;
  currentCell = this.cellArray[this.currentCellIndex];
  numCells = this.cellArray.length;

  isAuthenticated$: Observable<boolean>;

  showAppAlert = false;
  email = '';
  success = '';
  message = '';
  emailVerified = false;
  processSucceeded = false;


  tabs: any[] = [];
  nzTabPosition = 'left';
  nzTabSize = 'small';
  selectedIndex = 0;
  tabTimerPaused = false;


  constructor(private route: ActivatedRoute, private auth: AuthService, private cd: ChangeDetectorRef) {
    this.route.queryParams.subscribe(params => {
      this.email = params.email;
      this.success = params.success;
      this.message = params.message;
    });
    if (this.success === 'true') {
      this.processSucceeded = true;
    }

    if (this.email && this.email.length > 0) {
      this.showAppAlert = true;
    }

//    this.docUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://cdn.filestackcontent.com/preview/hHZe20z5RtObSfzUVAgQ');
  }

  tabIndexChanged(index) {
    console.log(index);
    this.currentCellIndex = index;
  }

  next() {
    if (this.selectedIndex === this.cellArray.length-1) {
      return;
    }
    this.selectedIndex++;
  }

  prev() {
    if (this.selectedIndex === 0) {
      return;
    }
    this.selectedIndex--;
  }

  ngOnInit() {
    this.isAuthenticated$ = this.auth.getIsAuthenticatedStream();

  }

}
