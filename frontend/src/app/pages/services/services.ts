import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

interface Service {
  titre: string;
  description: string;
  details: string[];
  bgIcon: string;
  iconColor: string;
  borderColor: string;
}

@Component({
  selector: 'app-services',
  imports: [RouterLink],
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class Services implements OnInit {
  constructor(
    private title: Title,
    private meta: Meta,
  ) {}

  ngOnInit() {
    this.title.setTitle('Services Municipaux - Mairie de Mbaling');
    this.meta.updateTag({
      name: 'description',
      content:
        'État civil, urbanisme, éducation, culture, sport, environnement : découvrez tous les services proposés par la mairie de Mbaling.',
    });
    this.meta.updateTag({
      property: 'og:title',
      content: 'Services Municipaux - Mairie de Mbaling',
    });
    this.meta.updateTag({
      property: 'og:description',
      content: 'Tous les services de la mairie de Mbaling, Sénégal.',
    });
    this.meta.updateTag({ property: 'og:url', content: 'https://www.mairie-mbaling.sn/services' });
  }
  services: Service[] = [
    {
      titre: 'État civil',
      description: "Toutes les démarches liées à l'état civil de vos proches et de vous-même.",
      details: [
        'Déclaration de naissance',
        'Mariage civil',
        'Déclaration de décès',
        "Copies et extraits d'actes",
        'Livret de famille',
        'Reconnaissance anticipée',
      ],
      bgIcon: 'bg-blue-100',
      iconColor: 'text-blue-700',
      borderColor: 'border-blue-200',
    },
    {
      titre: 'Urbanisme',
      description:
        "Toutes les autorisations et informations relatives à l'urbanisme et aux travaux.",
      details: [
        'Permis de construire',
        'Permis de démolir',
        'Déclaration préalable de travaux',
        "Certificat d'urbanisme",
        "Plan local d'urbanisme (PLU)",
        'Alignement voirie',
      ],
      bgIcon: 'bg-amber-100',
      iconColor: 'text-amber-700',
      borderColor: 'border-amber-200',
    },
    {
      titre: 'Éducation',
      description: 'Inscriptions scolaires et services périscolaires pour votre enfant.',
      details: [
        'Inscription en école maternelle',
        'Inscription en école élémentaire',
        'Restaurant scolaire (cantine)',
        'Garderie périscolaire',
        'Activités extra-scolaires',
        'Transport scolaire',
      ],
      bgIcon: 'bg-green-100',
      iconColor: 'text-green-700',
      borderColor: 'border-green-200',
    },
    {
      titre: 'Culture',
      description: 'Médiathèque, patrimoine et vie culturelle au service des habitants.',
      details: [
        'Médiathèque municipale',
        'Expositions et galeries',
        'Concerts et spectacles',
        'Patrimoine local',
        'Soutien aux associations culturelles',
        'École de musique municipale',
      ],
      bgIcon: 'bg-purple-100',
      iconColor: 'text-purple-700',
      borderColor: 'border-purple-200',
    },
    {
      titre: 'Sport',
      description: 'Installations sportives et associations pour une pratique pour tous.',
      details: [
        'Stade municipal',
        'Salle polyvalente',
        'Piscine municipale',
        'Gymnase',
        'Terrains de tennis',
        'Soutien aux clubs sportifs',
      ],
      bgIcon: 'bg-red-100',
      iconColor: 'text-red-700',
      borderColor: 'border-red-200',
    },
    {
      titre: 'Environnement',
      description: 'Actions municipales pour un cadre de vie durable et agréable.',
      details: [
        'Collecte des déchets',
        'Déchetterie municipale',
        'Espaces verts et parcs',
        'Développement durable',
        "Qualité de l'eau",
        'Plantations et fleurissement',
      ],
      bgIcon: 'bg-teal-100',
      iconColor: 'text-teal-700',
      borderColor: 'border-teal-200',
    },
  ];
}
