import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private payments = 0;
  private paymentPurposes = '';
  private loggedInUserData: Record<string, string>[] = [];
  private entranceResults: Record<string, string>[] = [];
  private _studentData: Record<string, string>[] = [];
  private _studentClassAssoc: Record<string, string>[] = [];
  private unverified = true;
  private _teacherClass: Record<string, string>[] = [];
  private _staffInfo: Record<string,string>[] = [];
  constructor() {}

  get payment() {
    return this.payments;
  }

  set payment(totalAmount: number) {
    this.payments = totalAmount;
  }

  set paymentPurpose(purpose: string) {
    this.paymentPurposes = purpose;
  }

  get paymentPurpose(): string {
    return this.paymentPurposes;
  }

  get signedUser() {
    return this.loggedInUserData;
  }

  set signedUser(data: Record<string, string>[]) {
    this.loggedInUserData = data;
  }

  set entranceResult(data: any) {
    this.entranceResult = data;
  }

  get entranceResult() {
    return this.entranceResult;
  }

  get studentData() {
    return this._studentData;
  }

  set studentData(data: Record<string, string>[]) {
    this._studentData = data;
  }

  get unVerifiedAdmin() {
    return this.unverified;
  }

  set unVerifiedAdmin(verify: boolean) {
    this.unverified = verify;
  }

  get studentClassAssoc() {
    return this._studentClassAssoc;
  }

  set studentClassAssoc(data: Record<string, string>[]) {
    this._studentClassAssoc = data;
  }

  get teacherClass() {
    return this._teacherClass;
  }

  set teacherClass(data: Record<string, string>[]) {
    this._teacherClass = data;
  }

  get staffInfo(){
    return this._staffInfo;
  }

  set staffInfo(data:Record<string,string>[]){
    this._staffInfo = data;
  }
}
