import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private readonly apiUrl = 'https://silva-board.azurewebsites.net/message';

  constructor(private http: HttpClient) {}

  getMessage(): Observable<string> {
    return this.http.get(this.apiUrl, { responseType: 'text' });
  }

  sendMessage(message: string): Observable<string> {
    return this.http.post(this.apiUrl, message, {
      headers: { 'Content-Type': 'application/json' },
      responseType: 'text'
    });
  }
}
