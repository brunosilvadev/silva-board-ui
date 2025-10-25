import { Component, signal, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from './services/message.service';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
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
