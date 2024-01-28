import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from '../../shared/assignments.service';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css']
})
export class EditAssignmentComponent implements OnInit {
  assignment!: Assignment | undefined;
  nomAssignment!: string;
  dateDeRendu!: Date;
  auteur!: string;
  matiere!: string;
  note!: number;

  constructor(private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.getAssignment();

      //affichage queryParams
      console.log("Query Params :");
      console.log(this.route.snapshot.queryParams);
      console.log("Fragment :");
      console.log(this.route.snapshot.fragment);
  }

  getAssignment() {
    const id = +this.route.snapshot.params['id'];

    this.assignmentsService.getAssignment(id).subscribe(assignment => {
      if (!assignment) return;
      this.assignment = assignment;
      this.nomAssignment = assignment.nom;
      this.dateDeRendu = assignment.dateDeRendu;
    });
  }
  onSaveAssignment() {
    if (!this.assignment) return;
    this.assignment.nom = this.nomAssignment;
    this.assignment.dateDeRendu = this.dateDeRendu;
    this.assignment.auteur = this.auteur;
    this.assignment.matiere = this.matiere;
    this.assignment.note = this.note;
    if(this.assignment.matiere == "Angular"){
      this.assignment.image = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3AAngular_full_color_logo.svg&psig=AOvVaw3WMSo9skC98tQioUCkwjcv&ust=1706542202424000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCMCz65-zgIQDFQAAAAAdAAAAABAE";
    }
    if(this.assignment.matiere == "Java"){
      this.assignment.image = "https://upload.wikimedia.org/wikipedia/fr/thumb/2/2e/Java_Logo.svg/800px-Java_Logo.svg.png";
    }
    if(this.assignment.matiere == "SQL"){
      this.assignment.image = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3ASql_data_base_with_logo.png&psig=AOvVaw33jn7iCs4XCwqwEuBO1haP&ust=1706542299987000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCICFrM6zgIQDFQAAAAAdAAAAABAE";
    }
    if(this.assignment.matiere == "Marketing"){
      this.assignment.image = "https://www.google.com/url?sa=i&url=https%3A%2F%2Ffr.fiverr.com%2Fadam_feil%2Fdesign-greatest-marketing-logo&psig=AOvVaw1Vkd1Vuo00gsr_MIIUE32p&ust=1706542339622000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCIis8OGzgIQDFQAAAAAdAAAAABAK";
    }
    this.assignmentsService.updateAssignment(this.assignment).subscribe(message => {
      console.log(message);
      this.router.navigate(['/home']);
    });
  }
}