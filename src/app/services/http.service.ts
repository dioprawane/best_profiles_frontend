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

  // private chatApiBaseUrl = '127:0:0:1:8006/chat'
  private chatApiBaseUrl = 'http://127.0.0.1:8006/chat';

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
  getPdfUrl(collectionId: string, fileId: string): string {
    return `${this.apiBaseUrl}/${collectionId}/cv/${fileId}`;
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
  
    return this.http.post<any>(`http://localhost:8003/api/collection/${collectionId}/add-cv`, formData);
  }

  createCollectionWithFiles(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/create`, formData);
  }

  addMessageIA(message: string): void {
    this.listMessage.push(new Message('', false, true));

    const myData = { message: message, session_id: this.currentSession };
    let lastMessage: Message;

    this.http.post(`${this.chatApiBaseUrl}/rag`, myData, {
      reportProgress: true,
      observe: 'events',
    }).subscribe(event => {
      switch (event.type) {
        case HttpEventType.UploadProgress:
          console.log('Uploaded ' + event.loaded + ' out of ' + event.total + ' bytes');
          break;
        case HttpEventType.Response:
          lastMessage = this.listMessage[this.listMessage.length - 1];
          lastMessage.isOnWriting = false;
          if (event.body) {
            const result = (event.body as { response: string }).response;
            lastMessage.message = result;
          }
          break;
      }
    });
  }

  // WORKED FOR CREATE COLLECTION, DELETE COLLECTION  
//   updateCollection(currentTitle: string, newTitle: string, newDescription: string): Observable<any> {
//     const body = {
//       title: newTitle,  // New title
//       description: newDescription  // New description
//     };

//     return this.http.put(`${this.apiBaseUrl}/${currentTitle}/update`, body);
// }

  updateCollection(currentTitle: string, newTitle: string, newDescription: string): Observable<any> {
    const body = {
        title: newTitle,  // New title
        description: newDescription  // New description
    };

    return this.http.put(`${this.apiBaseUrl}/${currentTitle}/update`, body);
  }

  updateCollectionById(
    collectionId: string,
    newTitle: string,
    newDescription: string
): Observable<any> {
    const body = {
        title: newTitle,  // New title
        description: newDescription  // New description
    };

    return this.http.put(`${this.apiBaseUrl}/${collectionId}/update`, body);
}

  deleteCollection(title: string): Observable<any> {
    return this.http.delete(`${this.apiBaseUrl}/${title}/delete`);
  }
  

  addFile(contentFile: string) {
    const myData =
    {
      "files": [
        contentFile
      ],
      "clear_existing": false
    };
    this.http.post('/documents/index', myData, {
      reportProgress: true,
      observe: 'events',
    }).subscribe(event => {
    });
  }

  getSessions(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      this.http.get<string[]>(`${this.chatApiBaseUrl}/sessions`, {
        reportProgress: true,
        observe: 'response', // Use 'response' instead of 'events'
      }).subscribe({
        next: (response) => {
          if (response.status === 200 && Array.isArray(response.body)) {
            resolve(response.body.reverse());
          } else {
            reject("Invalid response format");
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

  changeSession(session: string): void {
    this.currentSession = session;

    this.http.get<any[]>(`${this.chatApiBaseUrl}/history/${session}`, {
      reportProgress: true,
      observe: 'events',
    }).subscribe({
      next: (event) => {
        if (event.type === HttpEventType.Response && Array.isArray(event.body)) {
          console.log(event.body[0]); // Debug: Display the first element of the response

          // Reset the list of messages
          this.listMessage = event.body.map(item => new Message(
            item.content,
            item.role === 'user' ? true : false,
            false,
          ));
        }
      },
      error: (err) => {
        console.error('Error fetching messages:', err);
      },
      complete: () => {
        console.log('Request completed');
      }
    });
  }

  addNewChat(): void {
    this.http.post(`${this.chatApiBaseUrl}/new-session`, null, {
      reportProgress: true,
      observe: 'events',
    }).subscribe({
      next: (event) => {
        console.log('New session created');
        this.getSessions().then(sessions => {
          this.currentSession = sessions[0];
        }).catch(err => {
          console.error('Error fetching sessions:', err);
        });
      },
      error: (err) => {
        console.error('Error creating a new session:', err);
      }
    });
    this.currentSession = timestamp.toString();
    this.listMessage = [];
  }

}
