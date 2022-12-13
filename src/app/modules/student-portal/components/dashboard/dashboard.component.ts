import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  isDashboard = false;

  ngOnInit(): void {
    // console.log(this.isDashboard)
  }

  activateDashboard(event: any) {
    this.isDashboard = event;
    console.log(this.isDashboard);
  }
}
