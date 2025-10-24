import { Component, signal, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from './services/message.service';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  template: `
    <div class="container">
      <div class="section latest-message">
        <h2>Latest Message</h2>
        @if (isLoadingMessage()) {
          <div class="loading-container">
            <div class="spinner"></div>
            <p class="loading-text">Loading message...</p>
          </div>
        } @else {
          <p class="message-content">{{ latestMessage() || 'No message yet' }}</p>
        }
      </div>

      <div class="section input-section">
        <h2>New Message</h2>
        <textarea 
          [(ngModel)]="newMessage" 
          placeholder="Type your message here..."
          rows="4"
          [disabled]="isSending()">
        </textarea>
      </div>

      <div class="section button-section">
        <button class="btn btn-primary" (click)="sendMessage()" [disabled]="isSending()">
          @if (isSending()) {
            <div class="button-spinner"></div>
            <span>Sending...</span>
          } @else {
            <span>Send</span>
          }
        </button>
        <button class="btn btn-secondary" (click)="cancelMessage()" [disabled]="isSending()">Cancel</button>
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

    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .btn-primary:disabled:hover {
      background: #4CAF50;
      transform: none;
    }

    .btn-primary {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    .loading-container {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 20px 0;
    }

    .loading-text {
      margin: 0;
      color: #666;
      font-size: 1rem;
    }

    .spinner {
      width: 24px;
      height: 24px;
      border: 3px solid #f3f3f3;
      border-top: 3px solid #4CAF50;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    .button-spinner {
      width: 16px;
      height: 16px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-top: 2px solid white;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    textarea:disabled {
      background-color: #f5f5f5;
      cursor: not-allowed;
    }

    @media (max-width: 600px) {
      .container {
        padding: 16px;
      }
    }
  `],
})
export class App implements OnInit {
  private messageService = inject(MessageService);
  
  protected latestMessage = signal('');
  protected newMessage = '';
  protected isLoadingMessage = signal(false);
  protected isSending = signal(false);

  ngOnInit() {
    this.loadMessage();
  }

  loadMessage() {
    this.isLoadingMessage.set(true);
    this.messageService.getMessage().subscribe({
      next: (message: string) => {
        this.latestMessage.set(message);
        this.isLoadingMessage.set(false);
      },
      error: (error: any) => {
        console.error('Error loading message:', error);
        this.isLoadingMessage.set(false);
      }
    });
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.isSending.set(true);
      this.messageService.sendMessage(this.newMessage.trim()).subscribe({
        next: (response: string) => {
          console.log('Message sent:', response);
          this.latestMessage.set(this.newMessage.trim());
          this.newMessage = '';
          this.isSending.set(false);
        },
        error: (error: any) => {
          console.error('Error sending message:', error);
          this.isSending.set(false);
        }
      });
    }
  }

  cancelMessage() {
    this.newMessage = '';
  }
}
