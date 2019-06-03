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
  barChart = [];
  ansArray = [];
  constructor(private http: HttpClient) {
  }
  
  syncCorrect = new BehaviorSubject<number>(this.correctAns);
  syncWrong = new BehaviorSubject<number>(this.wrongAns);
  ansArrayEmitter = new BehaviorSubject<any>(this.ansArray);
  castCorrect = this.syncCorrect.asObservable();
  castWrong = this.syncWrong.asObservable();
  castansArrayEmitter = this.ansArrayEmitter.asObservable();

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
calculateAnswer(answers,userJson) {
  this.correctAns = 0;
  this.wrongAns = 0;
  answers.map((val,index) => {
    if(val === userJson[index].ans){
      this.correctAns++;
      this.ansArray.push(true);
    } else {
      this.wrongAns++;
      this.ansArray.push(false);
    }
    this.syncCorrect.next(this.correctAns)
    this.syncWrong.next(this.wrongAns)
    this.ansArrayEmitter.next(this.ansArray);
  } )
  console.log(this.ansArray)
}

reset() {
  this.correctAns = 0;
  this.wrongAns = 0;
  this.syncCorrect.next(this.correctAns)
  this.syncWrong.next(this.wrongAns)
}

}
