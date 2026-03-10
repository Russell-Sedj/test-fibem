import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact implements OnInit {
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

  constructor(
    private fb: FormBuilder,
    private title: Title,
    private meta: Meta,
  ) {
    this.form = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      sujet: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(20)]],
    });
  }

  ngOnInit() {
    this.title.setTitle('Nous contacter - Mairie de Mbaling');
    this.meta.updateTag({
      name: 'description',
      content:
        'Contactez la mairie de Mbaling\u202f: formulaire en ligne, adresse, t\u00e9l\u00e9phone et horaires d\u2019ouverture.',
    });
    this.meta.updateTag({ property: 'og:title', content: 'Nous contacter - Mairie de Mbaling' });
    this.meta.updateTag({
      property: 'og:description',
      content:
        'Formulaire de contact et coordonn\u00e9es de la mairie de Mbaling, S\u00e9n\u00e9gal.',
    });
    this.meta.updateTag({ property: 'og:url', content: 'https://www.mairie-mbaling.sn/contact' });
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
