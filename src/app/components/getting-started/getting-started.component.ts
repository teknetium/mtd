import {Component, Input, OnInit} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { FormTrainingModel } from '../../models/training.model';
import { TrainingFormModule } from '../training-form/training-form.module';
import { TrainingService } from '../../services/training.service';
import { UserService } from '../../services/user.service';



@Component({
  selector: 'mtd-getting-started',
  templateUrl: './getting-started.component.html',
  styleUrls: ['./getting-started.component.css']
})
export class GettingStartedComponent implements OnInit {


  @Input() showTitle: boolean;

  isAuthenticated$: Observable<boolean>;
  current = 0;
  index = 0;

  constructor(private auth: AuthService, private userService: UserService, private trainingService: TrainingService) {
  }


  pre(): void {
    this.current -= 1;
  }

  next(): void {
    this.current += 1;
  }

  done(): void {
    console.log('done');
  }

  ngOnInit() {
    this.isAuthenticated$ = this.auth.getIsAuthenticatedStream();
    this.current = 0;
    this.index = 0;
  }

}
