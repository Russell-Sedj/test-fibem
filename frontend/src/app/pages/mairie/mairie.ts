import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mairie',
  imports: [RouterLink],
  templateUrl: './mairie.html',
  styleUrl: './mairie.css',
})
export class Mairie {
  conseillers = [
    {
      nom: 'Marie Dupont',
      role: 'Maire',
      responsabilite: 'Administration générale, finances, sécurité',
    },
    {
      nom: 'Jean-Pierre Martin',
      role: '1er Adjoint',
      responsabilite: 'Urbanisme & travaux publics',
    },
    { nom: 'Sophie Bernard', role: '2e Adjointe', responsabilite: 'Éducation & jeunesse' },
    { nom: 'Alain Rousseau', role: '3e Adjoint', responsabilite: 'Culture, sport & associations' },
    { nom: 'Isabelle Lambert', role: '4e Adjointe', responsabilite: 'Solidarités & santé' },
    {
      nom: 'Thomas Leroy',
      role: '5e Adjoint',
      responsabilite: 'Environnement & développement durable',
    },
  ];

  chiffres = [
    { value: '12 500', label: 'Habitants' },
    { value: '38 km²', label: 'Superficie' },
    { value: '1842', label: 'Année de création' },
    { value: '35', label: 'Associations' },
  ];
}
