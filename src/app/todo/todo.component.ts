import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { initFlowbite } from 'flowbite';
export interface Task {
  description: string;
  done: boolean;
  date: Date;
}

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
})
export class TodoComponent implements OnInit {
  tasks: Task[] = [];
  tasksCompleted: Task[] = [];
  newTaskDescription: string = '';
  newTaskDate: string = '';

  taskForm!: FormGroup;
  submitted: boolean = false;
  constructor(private formBuilder: FormBuilder) {
    this.taskForm = this.formBuilder.group({
      description: ['', Validators.required],
      date: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    initFlowbite();
  }



  addTask() {
    this.submitted = true;
    if (this.taskForm.invalid) {
      return;
    }

    const currentDate = new Date(this.taskForm.value.date);
    this.tasks.push({
      description: this.taskForm.value.description,
      done: false,
      date: currentDate,
    });

    this.taskForm.reset();
    this.submitted = false;
  }


  markAsDone(task: Task) {
    const index = this.tasks.indexOf(task);
    if (index !== -1) {
      this.tasks[index].done = true;
      this.tasksCompleted.push(task);
    this.deleteTask(task);
    }
  }

  restaureTask(task: Task) {
    const index = this.tasksCompleted.indexOf(task);
    if (index !== -1) {
      this.tasksCompleted[index].done = false;
      this.tasks.push(task);
      this.deleteTaskComplete(task);
    }
  }

  deleteTaskComplete(task: Task) {
    const index = this.tasksCompleted.indexOf(task);
    if (index !== -1) {
      this.tasksCompleted.splice(index, 1);
    }
  }

  deleteTask(task: Task) {
    const index = this.tasks.indexOf(task);
    if (index !== -1) {
      this.tasks.splice(index, 1);
    }
  }

  get description() {
    return this.taskForm.get('description');
  }
  get date() {
    return this.taskForm.get('date');
  }
}
