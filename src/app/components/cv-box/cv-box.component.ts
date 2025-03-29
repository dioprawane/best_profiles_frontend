import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cv-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cv-box.component.html',
  styleUrls: ['./cv-box.component.scss']
})

export class CvBoxComponent {
    @Input() profile: any;
  
    // Liste des éléments à afficher avec barres
    scoreItems = [
      { key: 'formations_score', label: 'Formations' },
      { key: 'experiences_score', label: 'Expériences' },
      { key: 'competences_score', label: 'Compétences' },
      { key: 'soft_skills_score', label: 'Soft Skills' },
      { key: 'projets_score', label: 'Projets' },
      { key: 'autres_score', label: 'Autres' }
    ];
  
    getWidth(score: number): number {
      return Math.min((score / 10) * 100, 100);
    }
  }