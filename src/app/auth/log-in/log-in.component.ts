import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent implements OnInit {
  public isLoading = false;
  constructor() {}

  ngOnInit(): void {}


  onLogin(form: NgForm): void {}
}
