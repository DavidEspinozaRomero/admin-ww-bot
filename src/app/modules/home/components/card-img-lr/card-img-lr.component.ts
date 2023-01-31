import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-img-lr',
  templateUrl: './card-img-lr.component.html',
  styleUrls: ['./card-img-lr.component.scss']
})
export class CardImgLrComponent implements OnInit {

  @Input() src?:string
  @Input() alt?:string
  @Input() title?:string
  @Input() description?:string
  @Input() imgPosition?:boolean
  @Input() routerLink?:string

  constructor() { }

  ngOnInit(): void {
  }

}