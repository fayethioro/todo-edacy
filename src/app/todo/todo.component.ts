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
  date: string;
}

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
})
export class TodoComponent implements OnInit {
  tasks: Task[] = [
    { description: 'nouvelle tache', done: false, date: '24/05/2024' },
  ];
  tasksCompleted: Task[] = [
    { description: 'tache terminée', done: true, date: '02/05/2024' },
  ];

  modalOpen: boolean = false;
  currentItem: any;

  taskForm!: FormGroup;
  submitted: boolean = false;
  editingTask!: Task;

  constructor(private formBuilder: FormBuilder) {
    this.taskForm = this.formBuilder.group({
      description: ['', Validators.required],
      date: ['', Validators.required],
    });
  }
  edit: boolean = false;
  ngOnInit(): void {
    initFlowbite();
  }

  addOrUpdateTask() {
    this.submitted = true;
    if (this.taskForm.invalid) {
      return;
    }
    if (!this.editingTask) {
      const currentDate = new Date(this.taskForm.value.date);
      const formattedDate = currentDate.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });

      this.tasks.push({
        description: this.taskForm.value.description,
        done: false,
        date: formattedDate,
      });
    } else {
      this.deleteTask(this.editingTask);
      this.tasks.push({
        description: this.taskForm.value.description,
        date: new Date(this.taskForm.value.date).toLocaleDateString('fr-FR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }),
        done: false,
      });
    }

    this.taskForm.reset();
    this.submitted = false;
    this.modalOpen = false;
    this.editingTask == null;
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

  openModal(task?: Task) {
    if (task) {
      this.taskForm.patchValue({
        description: task.description,
        date: task.date.toString().slice(0, 10),
      });
      // this.edit = true;
      this.editingTask = task;
    }

    this.currentItem = task;
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
    this.editingTask == null;
  }

  get description() {
    return this.taskForm.get('description');
  }
  get date() {
    return this.taskForm.get('date');
  }
}
