import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable, BehaviorSubject } from 'rxjs';
import { FormGroup, FormArray } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  correctAns: number;
  wrongAns: number;
  barChart = []
  constructor(private http: HttpClient) {
  }
  
  syncCorrect = new BehaviorSubject<number>(this.correctAns);
  syncWrong = new BehaviorSubject<number>(this.wrongAns);
  castCorrect = this.syncCorrect.asObservable();
  castWrong = this.syncWrong.asObservable();

  public getJSON(): Observable<any> {
    return this.http.get("./assets/questions.json");
}
public markControlsDirty(group: FormGroup | FormArray): void {
  Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.controls[key];

      if (abstractControl instanceof FormArray) {
          this.markControlsDirty(abstractControl);
      } else {
          abstractControl.markAsTouched();
      }
  });
}
calculateAnswer(questions,userJson) {
  this.correctAns = 0;
  this.wrongAns = 0;
  questions.map((val,index) => {
    if(val === userJson[index].ans){
      this.correctAns++;
      console.log(this.correctAns)
      
      console.log(this.correctAns)
    } else {
      this.wrongAns++;
      
    }
    this.syncCorrect.next(this.correctAns)
    this.syncWrong.next(this.wrongAns)
  } )
}

reset() {
  this.correctAns = 0;
  this.wrongAns = 0;
  this.syncCorrect.next(this.correctAns)
  this.syncWrong.next(this.wrongAns)
}

}
