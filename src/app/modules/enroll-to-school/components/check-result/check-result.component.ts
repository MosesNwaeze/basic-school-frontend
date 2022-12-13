import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-result',
  templateUrl: './check-result.component.html',
  styleUrls: ['./check-result.component.css']
})
export class CheckResultComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  checkResult(){
  
    this.router.navigate(["enroll-to-school/check-result-form"]);
  }

}
