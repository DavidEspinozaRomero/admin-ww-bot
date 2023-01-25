import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-retry',
  templateUrl: './retry.component.html',
  styleUrls: ['./retry.component.scss'],
})
export class RetryComponent {
  @Output() onRetry: EventEmitter<boolean> = new EventEmitter();

  retry() {
    this.onRetry.emit(true);
  }
}
