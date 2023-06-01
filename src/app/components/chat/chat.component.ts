import { Component, OnInit } from '@angular/core';
import { Mensaje } from 'src/app/clases/mensaje';
import { AuthService } from '../../services/auth.service';
import { ChatService } from '../../services/chat.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  chatService: ChatService;
  authService: AuthService;
  mensaje!: string;
  mensajes: Mensaje[] = [];

  constructor(private chat: ChatService, private auth: AuthService) {
    this.chatService = chat;
    this.authService = auth;
    this.chat.GetMensajes().subscribe((data: Mensaje[]) => this.mensajes = data.reverse());
  }

  enviarMensaje() {
    if (!this.mensaje) return;
    const usuario = this.authService.getUser;
    const now = new Date();
    const mensaje = { usuario: usuario, hora: now.toLocaleString(), mensaje: this.mensaje };
    this.chatService.CreateMensaje(mensaje);
    this.mensaje = '';
  }

  ngOnInit(): void {
  }

}