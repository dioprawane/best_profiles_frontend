import { inject, Injectable } from '@angular/core';
import { Message } from '../models/Message';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { timestamp } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  listMessage: Message[] = []
  currentSession: String = timestamp.toString()

  constructor(private http: HttpClient) {
  }

  addMessageCustomer(message: string): void {
    this.listMessage.push(new Message(message, true, false))
  }

  addMessageIA(message: string): void {
    this.listMessage.push(new Message("", false, true))


    const myData = { 'message': message, 'session_id': this.currentSession };
    let lastMessage: Message;

    this.http.post('http://127.0.0.1:8000/chat/chat/rag', myData, {
      reportProgress: true,
      observe: 'events',
    }).subscribe(event => {
      switch (event.type) {
        case HttpEventType.UploadProgress:
          console.log('Uploaded ' + event.loaded + ' out of ' + event.total + ' bytes');
          break;
        case HttpEventType.Response:
          lastMessage = this.listMessage[this.listMessage.length - 1]
          lastMessage.isOnWriting = false
          if (event.body) {
            let result = (event.body as { response: string }).response
            lastMessage.message = result
          }

          break;
      }
    });
  }

  addFile(contentFile: string) {
    const myData =
    {
      "files": [
        contentFile
      ],
      "clear_existing": false
    };
    this.http.post('http://127.0.0.1:8000/chat/documents/index', myData, {
      reportProgress: true,
      observe: 'events',
    }).subscribe(event => {
    });
  }
  getSessions(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      this.http.get<string[]>('http://127.0.0.1:8000/chat/chat/sessions', {
        reportProgress: true,
        observe: 'events',
      }).subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Response) {
            resolve(event.body as string[]);
          }
        },
        error: (err) => {
          reject(err);
        }
      });
    });
  }

  getMessages(): Message[] {
    return this.listMessage
  }

  changeSession(session: String): void {
    this.currentSession = session

    this.http.get<any[]>(`http://127.0.0.1:8000/chat/history/${session}`, {
      reportProgress: true,
      observe: 'events',
    }).subscribe({
      next: (event) => {
        // Vérifie si l'événement est une réponse HTTP avec un corps valide
        if (event.type === HttpEventType.Response && Array.isArray(event.body)) {
          console.log(event.body[0]); // Debug : afficher le premier élément de la réponse

          // Réinitialiser la liste des messages
          this.listMessage = event.body.map(item => new Message(
            item.content,
            item.role === 'user' ? true : false,
            false,
          ));
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des messages :', err);
      },
      complete: () => {
        console.log('Requête terminée');
      }
    });
  }

}
