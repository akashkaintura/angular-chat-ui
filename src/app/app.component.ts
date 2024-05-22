import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./pages/login/login.component";
import { ChatComponent } from "./pages/chat/chat.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, LoginComponent, ChatComponent]
})
export class AppComponent {
  title = 'chat-ui';
}
