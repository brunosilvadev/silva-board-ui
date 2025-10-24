import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  template: `
    <div class="container">
      <div class="section latest-message">
        <h2>Latest Message</h2>
        <p class="message-content">{{ latestMessage() || 'No message yet' }}</p>
      </div>

      <div class="section input-section">
        <h2>New Message</h2>
        <textarea 
          [(ngModel)]="newMessage" 
          placeholder="Type your message here..."
          rows="6">
        </textarea>
      </div>

      <div class="section button-section">
        <button class="btn btn-primary" (click)="sendMessage()">Send</button>
        <button class="btn btn-secondary" (click)="cancelMessage()">Cancel</button>
      </div>
    </div>
  `,
  styles: [`
    .container {
      display: flex;
      flex-direction: column;
      height: 100vh;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      box-sizing: border-box;
    }

    .section {
      margin-bottom: 20px;
    }

    .latest-message {
      flex: 0 0 auto;
      padding: 20px;
      background: #ffffff;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .latest-message h2 {
      margin: 0 0 12px 0;
      font-size: 1.2rem;
      font-weight: 600;
      color: #333;
    }

    .message-content {
      margin: 0;
      font-size: 1rem;
      color: #555;
      word-wrap: break-word;
    }

    .input-section {
      flex: 1 1 auto;
      display: flex;
      flex-direction: column;
    }

    .input-section h2 {
      margin: 0 0 12px 0;
      font-size: 1.2rem;
      font-weight: 600;
      color: #333;
    }

    textarea {
      flex: 1 1 auto;
      width: 100%;
      padding: 16px;
      border: 2px solid #e0e0e0;
      border-radius: 12px;
      font-size: 1rem;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      resize: none;
      box-sizing: border-box;
      transition: border-color 0.2s;
    }

    textarea:focus {
      outline: none;
      border-color: #4CAF50;
    }

    textarea::placeholder {
      color: #999;
    }

    .button-section {
      flex: 0 0 auto;
      display: flex;
      gap: 12px;
      padding-bottom: 10px;
    }

    .btn {
      flex: 1;
      padding: 16px;
      font-size: 1rem;
      font-weight: 600;
      border: none;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.2s;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    }

    .btn-primary {
      background: #4CAF50;
      color: white;
    }

    .btn-primary:hover {
      background: #45a049;
    }

    .btn-primary:active {
      transform: scale(0.98);
    }

    .btn-secondary {
      background: #f5f5f5;
      color: #333;
    }

    .btn-secondary:hover {
      background: #e0e0e0;
    }

    .btn-secondary:active {
      transform: scale(0.98);
    }

    @media (max-width: 600px) {
      .container {
        padding: 16px;
      }
    }
  `],
})
export class App {
  protected latestMessage = signal('');
  protected newMessage = '';

  sendMessage() {
    if (this.newMessage.trim()) {
      this.latestMessage.set(this.newMessage.trim());
      this.newMessage = '';
    }
  }

  cancelMessage() {
    this.newMessage = '';
  }
}
