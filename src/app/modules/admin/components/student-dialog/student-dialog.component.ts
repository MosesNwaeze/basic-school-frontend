import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styleUrls: ['./student-dialog.component.css'],
})
export class StudentDialogComponent implements OnInit {
  students = this.localStorageService.studentClassAssoc;

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {}

  displayedColumns = ['First Name', 'Last Name', 'Student Id'];
}
