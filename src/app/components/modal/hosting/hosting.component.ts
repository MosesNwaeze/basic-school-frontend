import { Component, OnDestroy, OnInit,ViewChild,ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import {ModalService} from "../../../services/modal.service";

@Component({
  selector: 'app-hosting',
  templateUrl: './hosting.component.html',
  styleUrls: ['./hosting.component.css']
})
export class HostingComponent implements OnInit,OnDestroy {
  constructor(private modalService: ModalService) {}

  @ViewChild('modal', { read: ViewContainerRef })
  entry!: ViewContainerRef;
  sub!: Subscription;

  ngOnInit(): void {}
  createModal() {
    this.sub = this.modalService
      .openModal(this.entry, 'Are you sure ?', 'click confirm or close')
      .subscribe((v) => {
        //your logic
      });
  }
  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
  
  click(){
    
  }
}
