import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-retry',
  templateUrl: './retry.component.html',
  styleUrls: ['./retry.component.scss'],
})
export class RetryComponent implements OnInit {
  @Output() onRetry: EventEmitter<boolean> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  retry() {
    this.onRetry.emit(true);
  }
}
