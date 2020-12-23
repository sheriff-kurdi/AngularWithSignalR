import { Component } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
  greeting: string;
  async ngOnInit() {
    let connection = new signalR.HubConnectionBuilder()
      .withUrl("/greetingHub")
      .build();

    connection.on("ReceiveGreeting", data => {
      this.greeting = data;
    });

    await connection.start()
    connection.invoke("SendMessage", "Joe");
  }

}
