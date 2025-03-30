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

    expandedSection: string | null = null;
    selectedSection: string | null = null;

  
    // Liste des éléments à afficher
    scoreItems = [
        { key: 'formations_score', label: 'Formations', dataKey: 'formations' },
        { key: 'experiences_score', label: 'Expériences', dataKey: 'experiences' },
        { key: 'competences_score', label: 'Compétences', dataKey: 'competences' },
        { key: 'soft_skills_score', label: 'Soft Skills', dataKey: 'langues' },
        { key: 'projets_score', label: 'Projets', dataKey: 'projets' },
        { key: 'autres_score', label: 'Autres', dataKey: 'autres' }
      ];
  
    getWidth(score: number): number {
      return Math.min((score / 10) * 100, 100); // pour affichage graphique
    }
  
    getPourcentageProfile(key: string): number {
      return this.profile.scores[`${key}_pourcentage_profile`] || 0;
    }
  
    getPourcentageAllProfiles(key: string): number {
      return this.profile.scores[`${key}_pourcentage_all_profiles`] || 0;
    }

    getBarStyle(percent: number): string {
        const hue = Math.round((percent / 100) * 120); // 0 (rouge) -> 120 (vert)
        return `linear-gradient(90deg, hsl(${hue}, 80%, 50%) ${percent}%, #eee ${percent}%)`;
    }

    toggleSection(key: string): void {
        this.expandedSection = this.expandedSection === key ? null : key;
    }

    getSectionData(key: string): any[] {
        const section = this.scoreItems.find(item => item.key === key);
        return section ? this.profile.cv_data[section.dataKey] || [] : [];
    }

    toggleDetails(key: string) {
        this.selectedSection = this.selectedSection === key ? null : key;
    }

    getDetails(cvData: any, key: string): any {
        switch (key) {
          case 'formations_score':
            return cvData.formations || [];
          case 'experiences_score':
            return cvData.experiences || [];
          case 'competences_score':
            return cvData.competences || [];
          case 'soft_skills_score':
            return [...(cvData.langues || []), ...(cvData.interets || [])];
          case 'projets_score':
            return cvData.projets || [];
          case 'autres_score':
            return cvData.autres || [];
          default:
            return [];
        }
      }

      getGradient(score: number): string {
        if (score >= 66) {
          return 'linear-gradient(90deg, #a8e063, #56ab2f)'; // Vert
        } else if (score >= 33) {
          return 'linear-gradient(90deg, #fceabb, #f8b500)'; // Jaune
        } else if (score > 0) {
          return 'linear-gradient(90deg, #f7797d, #F44336)'; // Rouge
        } else {
          return '#ccc'; // Gris par défaut
        }
      }
      
      
      
}