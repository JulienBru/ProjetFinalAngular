import { Component, OnInit/* EventEmitter, Output*/ } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent {
  // Evenement qu'on enverra au père avec la soumission
  // du formulaire
  //@Output() nouvelAssignment = new EventEmitter<Assignment>();

  // pour le formulaire
  nomDevoir=""
  dateDeRendu?:Date=undefined;


  constructor(private assignmentsService:AssignmentsService , private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(event:any) {

    let a = new Assignment();
    a.nom = this.nomDevoir;
    if(this.dateDeRendu)
      a.dateDeRendu = this.dateDeRendu;

    a.rendu = false;
    a.id = Math.floor(Math.random() * 1000);
    a.matiere = "Angular";
    a.auteur = "Moi";
    a.note = 0;
    a.remarques = "";
    if(a.matiere == "Angular"){
      a.image = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3AAngular_full_color_logo.svg&psig=AOvVaw3WMSo9skC98tQioUCkwjcv&ust=1706542202424000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCMCz65-zgIQDFQAAAAAdAAAAABAE";
    }
    if(a.matiere == "Java"){
      a.image = "https://upload.wikimedia.org/wikipedia/fr/thumb/2/2e/Java_Logo.svg/800px-Java_Logo.svg.png";
    }
    if(a.matiere == "SQL"){
      a.image = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3ASql_data_base_with_logo.png&psig=AOvVaw33jn7iCs4XCwqwEuBO1haP&ust=1706542299987000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCICFrM6zgIQDFQAAAAAdAAAAABAE";
    }
    if(a.matiere == "Marketing"){
      a.image = "https://www.google.com/url?sa=i&url=https%3A%2F%2Ffr.fiverr.com%2Fadam_feil%2Fdesign-greatest-marketing-logo&psig=AOvVaw1Vkd1Vuo00gsr_MIIUE32p&ust=1706542339622000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCIis8OGzgIQDFQAAAAAdAAAAABAK";
    }


    this.assignmentsService.addAssignment(a).subscribe(message => console.log(message));
    //this.assignments.push(a);
    //this.nouvelAssignment.emit(a);
    this.router.navigate(['/home']);
  }

}
