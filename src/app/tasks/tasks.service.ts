import { Task } from './task.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TasksService {
  private activeTasks: Task[] = [];
  private deletedTasks: Task[] = [];
  private activeTasksUpdated = new Subject<Task[]>();
  private deletedTasksUpdated = new Subject<Task[]>();

  addTask(newTask: Task) {
    this.activeTasks.push(newTask);
    this.updateActiveTasksListeners();
  }

  deleteTask(deletedTask: Task) {
    this.activeTasks = this.activeTasks.filter(
      (task: Task) => task !== deletedTask
    );
    this.updateActiveTasksListeners();
    this.deletedTasks.push(deletedTask);
    this.updateDeletedTasksListeners();
  }

  activateTask(activateTask: Task) {
    this.deletedTasks = this.deletedTasks.filter(
      (task: Task) => task !== activateTask
    );

    this.activeTasks.push(activateTask);
    this.updateActiveTasksListeners();
    this.updateDeletedTasksListeners();
  }

  updateNameTask(task: Task, newName: string) {
    const idx = this.activeTasks.indexOf(task);
    this.activeTasks[idx].name = newName;
    this.updateActiveTasksListeners();
  }

  deleteTaskDeleted(deletedTask: Task) {
    this.deletedTasks = this.deletedTasks.filter(
      (task: Task) => task !== deletedTask
    );
    this.updateDeletedTasksListeners();
  }
  // deleteTaskFromList(deletedTask: Task, oldList: Task[], newList: Task[]) {
  //   oldList = oldList.filter((task: Task) => task !== deletedTask);
  //   console.log('im in delete task service ', oldList, newList);

  //   this.updateActiveTasksListeners();
  //   newList.push(deletedTask);
  //   this.updateDeletedTasksListeners();
  // }

  getActiveTasks() {
    return [...this.activeTasks];
  }

  getDeletedTasks() {
    return [...this.deletedTasks];
  }

  getActiveTasksUpdateListener() {
    return this.activeTasksUpdated.asObservable();
  }

  getDeletedTasksUpdateListener() {
    return this.deletedTasksUpdated.asObservable();
  }

  updateActiveTasksListeners() {
    this.activeTasksUpdated.next([...this.activeTasks]);
  }

  updateDeletedTasksListeners() {
    this.deletedTasksUpdated.next([...this.deletedTasks]);
  }
}
