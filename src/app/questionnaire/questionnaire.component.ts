import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl
} from "@angular/forms";
import { UserDataService } from '../user-data.service';


@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {
  questionnaireForm: FormGroup;
  userJson: any;
  options: Array<string>;
  formArray:FormArray
  formValue: String[];
  BarChart=[];
  submitted: boolean = false;
  ansArray: Array<string>;
  ansArrayCheck: boolean = false;
  
  constructor(private formBuilder: FormBuilder,  private userDataService: UserDataService) { }
 
    ngOnInit() {
      
    this.userDataService.getJSON().subscribe(data => {
      this.userJson = data;
      this.options = data.options
      this.formArray=new FormArray(
        this.userJson.map(
          ()=>new FormControl(null,Validators.required))
    );
    this.questionnaireForm = this.formBuilder.group({
      questions : this.formArray
    })
    });
}

wrongAnshighlight(){
  this.userDataService.castansArrayEmitter.subscribe(data => 
    {
      this.ansArray = data;
      this.ansArrayCheck = true;
    });
}

  onSubmit() {
    if(this.questionnaireForm.valid) {
      this.formValue =this.questionnaireForm.value;
      this.userDataService.calculateAnswer(this.formValue['questions'], this.userJson);
      this.wrongAnshighlight();
    } else {
      this.submitted = true;
      this.userDataService.markControlsDirty(this.questionnaireForm);
      return;
    }
  }

  onReset() {
    this.questionnaireForm.reset();
    this.userDataService.reset();
    this.ansArrayCheck = false;
  }
  
}
