import { Component, Input } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import {ActivatedRoute, Router} from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent {
  /*@Input()*/
  assignmentTransmis?:Assignment;

  constructor(private assignmentsService:AssignmentsService,
              private route: ActivatedRoute,
              private router:Router,
              private authService:AuthService) { }

  ngOnInit(): void {
    this.getAssignment();
  }

  getAssignment() {
      const id = +this.route.snapshot.params['id'];
      console.log(id);
      this.assignmentsService.getAssignment(id)
        .subscribe(a => {
          if (a) {
            this.assignmentTransmis = a;
          }
        });
  }

  onAssignmentRendu() {
    if(this.assignmentTransmis){
      if (this.assignmentTransmis.rendu == false && this.assignmentTransmis.note == null){
      this.router.navigate(['/home']);
      }
      this.assignmentTransmis.rendu = true;
      this.assignmentsService.updateAssignment(this.assignmentTransmis).subscribe(message => console.log(message));
      this.router.navigate(['/home']);
    }
  }
  onDelete() {
    this.assignmentsService.deleteAssignment(this.assignmentTransmis!).subscribe(message => console.log(message));
    this.router.navigate(['/home']);
  }
  onClickEdit() {
    this.router.navigate(["/assignment", this.assignmentTransmis?.id, "edit"], {queryParams: {nom: this.assignmentTransmis?.nom}, fragment: "edition"});
  }
  isAdmin() {
    return this.authService.isadmin();
  }
  isLog(){
    return this.authService.loggedIn;
  }
}
