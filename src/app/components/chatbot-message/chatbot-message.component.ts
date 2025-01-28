import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import de CommonModule
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-chatbot-message',
  standalone: true,  // Composant autonome
  imports: [CommonModule, HttpClientModule],  // Importation de CommonModule
  templateUrl: './chatbot-message.component.html',
  styleUrls: ['./chatbot-message.component.scss']
})
export class ChatbotMessageComponent {
  @Input() message: string = ''; // Valeur par défaut vide
  @Input() isUserMessage: boolean = false; // Valeur par défaut false
  @Input() isOnWriting: boolean = true; // Valeur par défaut false

}

