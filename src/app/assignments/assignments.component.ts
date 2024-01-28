import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignment.model';
import { AuthService } from 'src/app/shared/auth.service';


@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  page: number = 1;
  limit: number = 10;
  totalDocs!: number;
  totalPages!: number;
  nextPage!: number;
  prevPage!: number;
  hasPrevPage!: boolean;
  hasNextPage!: boolean;
  titre = "Formulaire d'ajout de devoir";
  formVisible = false;
  assignementSelectionne?: Assignment;
  assignments!: Assignment[];

  constructor(private assignmentsService: AssignmentsService,
    private authService:AuthService) {}


  ngOnInit() {
   //this.getAssignments();
   //this.assignmentsService.peuplerBD();
   this.assignmentsService.getAssignmentsPagine(this.page, this.limit).subscribe(data => {
    this.assignments = data.docs;
    this.totalDocs = data.totalDocs;
    this.totalPages = data.totalPages;
    this.nextPage = data.nextPage;
    this.prevPage = data.prevPage;
    this.hasPrevPage = data.hasPrevPage;
    this.hasNextPage = data.hasNextPage;
    console.log("data reçues");
  });
  }

  goPrevisousPage() {
    this.assignmentsService.getAssignmentsPagine(this.prevPage, this.limit).subscribe(data => {
      this.assignments = data.docs;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.nextPage = data.nextPage;
      this.prevPage = data.prevPage;
      this.hasPrevPage = data.hasPrevPage;
      this.hasNextPage = data.hasNextPage;
      console.log("data reçues");
    });
    console.log(this.page);
  }

  goNextPage() {
    this.assignmentsService.getAssignmentsPagine(this.nextPage, this.limit).subscribe(data => {
      this.assignments = data.docs;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.nextPage = data.nextPage;
      this.prevPage = data.prevPage;
      this.hasPrevPage = data.hasPrevPage;
      this.hasNextPage = data.hasNextPage;
      console.log("data reçues");
    });
    console.log(this.page);
  }
  
  getAssignments() {
    this.assignmentsService.getAssignments().subscribe((assignments) => {
      this.assignments = assignments ? assignments : [];
    });
  }

  getDescription() {
    return 'Je suis un sous composant';
  }

  getColor(a: any) {
    if (a.rendu) return 'green';
    else return 'red';
  }


  assignmentClique(a:Assignment) {
    this.assignementSelectionne = a;
  }

  onAddAssignmentBtnClick() {
  this.formVisible = true;
  }


/*
  onNouvelAssignment(event:Assignment) {
    //this.assignments.push(event);
    this.assignmentsService.addAssignment(event).subscribe(message => console.log(message));
    this.formVisible = false;
  }
  */
}
