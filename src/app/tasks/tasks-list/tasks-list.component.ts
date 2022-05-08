import { TasksService } from './../tasks.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Task } from '../task.model';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css'],
})
export class TasksListComponent implements OnInit, OnDestroy {
  public activeTasks: Task[] = [];
  public deletedTasks: Task[] = [];
  private updatedActiveTaskListener: any = null;
  private updatedDeleteTaskListener: any = null;
  public editedTask: Task = { name: '' };

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.activeTasks = this.tasksService.getActiveTasks();
    this.deletedTasks = this.tasksService.getDeletedTasks();
    this.getActiveTasks();
    this.getDeletedTasks();
  }

  getActiveTasks() {
    this.updatedActiveTaskListener = this.tasksService
      .getActiveTasksUpdateListener()
      .subscribe((activeTasksUpdated: Task[]) => {
        this.activeTasks = activeTasksUpdated;
      });
  }

  getDeletedTasks() {
    this.updatedDeleteTaskListener = this.tasksService
      .getDeletedTasksUpdateListener()
      .subscribe((deletedTasksUpdated: Task[]) => {
        this.deletedTasks = deletedTasksUpdated;
      });
  }

  onClickDeleteActiveTask(deleteTask: Task) {
    this.tasksService.deleteTask(deleteTask);
  }

  onClickEditActiveTask(editTask: Task) {
    this.editedTask = editTask;
  }

  onClickFinishedEditActiveTask(task: Task, taskEditForm: NgForm) {
    this.tasksService.updateNameTask(task, taskEditForm.value.taskName);
    this.editedTask = { name: '' };
  }

  onClickDeletedTask(deletedTassk: Task) {
    this.tasksService.activateTask(deletedTassk);
  }
  onClickDeleteDeletedTask(deletedTassk: Task) {
    this.tasksService.deleteTaskDeleted(deletedTassk);
  }
  ngOnDestroy(): void {
    this.updatedActiveTaskListener.unsubscribe();
    this.updatedDeleteTaskListener.unsubscribe();
  }
}
