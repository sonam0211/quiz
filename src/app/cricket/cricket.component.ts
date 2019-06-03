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
  selector: 'app-cricket',
  templateUrl: './cricket.component.html',
  styleUrls: ['./cricket.component.css']
})
export class CricketComponent implements OnInit {
  cricketForm: FormGroup;
  userJson: any;
  options: Array<string>;
  formArray:FormArray
  formValue: String[];
  BarChart=[];
  submitted: boolean = false;
  
  constructor(private formBuilder: FormBuilder,  private userDataService: UserDataService) { }

 
    ngOnInit() {
      
    this.userDataService.getJSON().subscribe(data => {
      this.userJson = data;
      this.options = data.options
      this.formArray=new FormArray(
        this.userJson.map(
          ()=>new FormControl(null,Validators.required))
    );
    this.cricketForm = this.formBuilder.group({
      questions : this.formArray
    })
    });
}


  onSubmit() {
    if(this.cricketForm.valid) {
      this.formValue =this.cricketForm.value;
      this.userDataService.calculateAnswer(this.formValue['questions'], this.userJson);
    } else {
      this.submitted = true;
      this.userDataService.markControlsDirty(this.cricketForm)
      return;
    }
  }

  onReset() {
    this.cricketForm.reset();
    this.userDataService.reset();
  }
  
}
