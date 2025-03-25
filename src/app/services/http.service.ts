import { inject, Injectable } from '@angular/core';
import { Message } from '../models/Message';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { timestamp } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  listMessage: Message[] = []
  currentSession: String = timestamp.toString()
  private apiBaseUrl = 'http://localhost:8003/api/collection';

  constructor(private http: HttpClient) {
  }

  uploadCVs(
    title: string,
    description: string,
    files: File[]
  ): Observable<any> {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    files.forEach(file => formData.append('cv_files', file));
    return this.http.post(`${this.apiBaseUrl}/create`, formData);
  }

  getCollectionDetails(id: string): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}/${id}`);
  }

  // Generate a dynamic URL for serving PDFs
  getPdfUrl(collectionId: string, filename: string): string {
    return `${this.apiBaseUrl}/${collectionId}/cv/${filename}`;
  }

  deleteCvFromCollection(collectionId: string, filename: string): Observable<any> {
    return this.http.delete(`${this.apiBaseUrl}/${collectionId}/cv/${filename}`);
  }

  // Fetch CV file as Base64
  getCvAsBase64(collectionId: string, filename: string): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}/collection/${collectionId}/cv/${filename}`);
  }

  addMessageCustomer(message: string): void {
    this.listMessage.push(new Message(message, true, false))
  }
  addCVsToCollection(collectionId: string, files: File[]): Observable<any> {
    const formData = new FormData();
    files.forEach(file => formData.append('cv_files', file));

    return this.http.post(`${this.apiBaseUrl}/${collectionId}/add-cv`, formData);
  }

  createCollectionWithFiles(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/create`, formData);
  }

  addMessageIA(message: string): void {
    this.listMessage.push(new Message("", false, true))


    const myData = { 'message': message, 'session_id': this.currentSession };
    let lastMessage: Message;

    this.http.post('http://127.0.0.1:8006/chat/chat/rag', myData, {
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

  // WORKED FOR CREATE COLLECTION, DELETE COLLECTION  
  updateCollection(
    currentTitle: string,
    newTitle: string,
    newDescription: string
  ): Observable<any> {
      
    const body = {
      title: newTitle,
      description: newDescription,
      cv_files: [] // Optional: Include empty array if needed
    };
  
    return this.http.put(`${this.apiBaseUrl}/${currentTitle}/update`, body);
  }


  deleteCollection(title: string): Observable<any> {
    return this.http.delete(`${this.apiBaseUrl}/${title}/delete`);
  }

  addFile(contentFile: string) {
    console.log(contentFile)
    const myData =
    {
      "files": [
        contentFile
      ],
      "clear_existing": false
    };
    this.http.post('http://127.0.0.1:8006/chat/documents/index', myData, {
      reportProgress: true,
      observe: 'events',
    }).subscribe(event => {
    });
  }


  getSessions(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      this.http.get<string[]>('http://127.0.0.1:8006/chat/chat/sessions', {
        reportProgress: true,
        observe: 'events',
      }).subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Response) {
            let result = event.body as string[]
            resolve(result.reverse());
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

    this.http.get<any[]>(`http://127.0.0.1:8006/chat/history/${session}`, {
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

  addNewChat(): void {
    this.http.post('http://127.0.0.1:8006/chat/chat/new-session', null, {
      reportProgress: true,
      observe: 'events',
    }).subscribe({
      next: (event) => {
        console.log('Nouvelle session créée');
        this.getSessions().then(sessions => {
          this.currentSession = sessions[0];
        }).catch(err => {
          console.error('Erreur lors de la récupération des sessions :', err);
        });
      },
      error: (err) => {
        console.error('Erreur lors de la création d\'une nouvelle session :', err);
      }
    });
    this.currentSession = timestamp.toString()
    this.listMessage = []
  }

}
