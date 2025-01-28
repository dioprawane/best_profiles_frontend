import { Component, ElementRef, ViewChild } from '@angular/core';
import { ChatbotMessageComponent } from '../../components/chatbot-message/chatbot-message.component';
import { HttpService } from './../../services/http.service';
import { CommonModule } from '@angular/common'; // Importation de CommonModule
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Message } from '../../models/Message';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [
    ChatbotMessageComponent,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,



  ],
  providers: [HttpService],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  // Déclenche l'ouverture du gestionnaire de fichiers
  triggerFileInput(): void {
    this.fileInput.nativeElement.click();  // Clique sur l'input caché pour ouvrir le gestionnaire de fichiers
  }

  // Gestion de la sélection de fichiers
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      console.log('Fichier sélectionné :', file.name);
      //contenu du fichier
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = reader.result;
        //si content est une string
        if (typeof content === 'string') {
          this.httpService.addFile(content);
        }
      };
      reader.readAsText(file);
      // Traitez le fichier ici si nécessaire
    }
  }

  messages: Message[];
  formContent: string = ''; // Déclaration de la propriété
  historique_title: String[] = [];

  constructor(private httpService: HttpService) {
    this.messages = this.httpService.getMessages();
    this.httpService.getSessions().then(sessions => {
      this.historique_title = sessions
    });


    console.log(this.httpService.getSessions());
  }

  async onSubmit(form: any): Promise<void> {
    if (this.formContent.trim() != '') {
      this.httpService.addMessageCustomer(this.formContent);
      this.messages = this.httpService.getMessages();
      // display the messages a animated way

      this.httpService.addMessageIA(this.formContent);

      this.messages = this.httpService.getMessages();
      this.scrollToBottom();
      this.formContent = '';


    }
  }

  private scrollToBottom(): void {
    const scrollHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight
    );
    window.scrollTo({ top: scrollHeight, behavior: 'smooth' });
  }

  public changeSession(session: String): void {
    this.httpService.changeSession(session);
    this.messages = this.httpService.getMessages();
  }
}
