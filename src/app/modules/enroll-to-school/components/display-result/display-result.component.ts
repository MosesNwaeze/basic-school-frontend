import { Component, OnInit } from '@angular/core';
import { ApplicationApiService } from 'src/app/services/application-api.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-display-result',
  templateUrl: './display-result.component.html',
  styleUrls: ['./display-result.component.css'],
})
export class DisplayResultComponent implements OnInit {
  displayedColumns: string[] = ['S/N', 'Subject', 'Score', 'Remark'];
  totalScore = 0;

  constructor(
    private apiService: ApplicationApiService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    if (
      typeof this.localStorageService.entranceResult !== 'undefined' &&
      this.localStorageService.entranceResult.length > 0
    ) {
      this.setResult('results', this.localStorageService.entranceResult);
      this.setResult('status', true);
      this.totalScore = this.getResult('results').reduce(
        (acc: number, item: Record<string, string>) =>
          acc + Number(item['score']),
        0
      );
      
    }
  }

  capitalizedField(value: string): string {
    const firstLetter = value.charAt(0).toUpperCase();
    const rest = value.substring(1, value.length);
    return firstLetter.concat(rest);
  }

  setResult(name: string, data: any) {
    try {
      localStorage.setItem(name, JSON.stringify(data));
    } catch (error: any) {
      console.log(error.message);
    }
  }
  getResult(name: string): any {
    return JSON.parse(localStorage.getItem(name) as string);
  }
}
