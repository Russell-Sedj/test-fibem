import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-mairie',
  imports: [RouterLink],
  templateUrl: './mairie.html',
  styleUrl: './mairie.css',
})
export class Mairie implements OnInit {
  constructor(
    private title: Title,
    private meta: Meta,
  ) {}

  ngOnInit() {
    this.title.setTitle('La Mairie - Mairie de Mbaling');
    this.meta.updateTag({
      name: 'description',
      content:
        "Découvrez la mairie de Mbaling : le conseil municipal, le mot du maire Pape Da, l'histoire et les chiffres clés de la commune.",
    });
    this.meta.updateTag({ property: 'og:title', content: 'La Mairie - Mairie de Mbaling' });
    this.meta.updateTag({
      property: 'og:description',
      content: 'Conseil municipal, histoire et missions de la mairie de Mbaling, Sénégal.',
    });
    this.meta.updateTag({ property: 'og:url', content: 'https://www.mairie-mbaling.sn/mairie' });
  }
  conseillers = [
    {
      nom: 'Pape Da',
      role: 'Maire',
      responsabilite: 'Administration générale, finances, sécurité',
    },
    {
      nom: 'Geralt de Riv',
      role: '1er Adjoint',
      responsabilite: 'Urbanisme & travaux publics',
    },
    { nom: 'Yennefer Doe', role: '2e Adjointe', responsabilite: 'Éducation & jeunesse' },
    { nom: 'Bojack Horseman', role: '3e Adjoint', responsabilite: 'Culture, sport & associations' },
    { nom: 'Rick Garfield', role: '4e Adjoint', responsabilite: 'Solidarités & santé' },
    {
      nom: "Jeanne d'Arc",
      role: '5e Adjointe',
      responsabilite: 'Environnement & développement durable',
    },
  ];

  chiffres = [
    { value: '12 500', label: 'Habitants' },
    { value: '38 km²', label: 'Superficie' },
    { value: '1969', label: 'Année de création' },
    { value: '35', label: 'Associations' },
  ];
}
