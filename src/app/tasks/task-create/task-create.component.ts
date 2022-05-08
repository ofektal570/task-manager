import { TasksService } from './../tasks.service';
import { Component, OnInit } from '@angular/core';
import { Task } from '../task.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css'],
})
export class TaskCreateComponent implements OnInit {
  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {}

  onSubmit(taskForm: NgForm) {
    if (!taskForm.valid) {
      return;
    }

    const newTask: Task = {
      name: taskForm.value.name,
    };

    this.tasksService.addTask(newTask);
    taskForm.reset();
  }
}
