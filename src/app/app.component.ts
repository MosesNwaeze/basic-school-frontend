import { Component, OnInit } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  mode: ProgressSpinnerMode = 'indeterminate';

  title = 'frontend';
  ngOnInit(): void {
    this.mode = 'determinate';
    document.querySelector('.spinner')?.classList.add('display-none')
  }
}
