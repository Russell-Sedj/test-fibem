import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  form: FormGroup;
  submitted = false;
  success = false;

  sujets = [
    'État civil',
    'Urbanisme / Travaux',
    'Éducation',
    'Culture & Sport',
    'Environnement',
    'Signalement / Voirie',
    'Autre demande',
  ];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      sujet: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(20)]],
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) return;
    // Simulation of form submission
    this.success = true;
    this.form.reset();
    this.submitted = false;
  }
}
