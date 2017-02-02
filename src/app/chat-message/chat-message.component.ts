import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../models/index';
@Component( {
    selector: 'app-chat-message',
    templateUrl: './chat-message.component.html',
    styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent implements OnInit {

    @Input() message: Message;
    incoming: boolean;

    constructor() { }
    ngOnInit(): void {
        this.incoming = !this.message.author.isClient;
    }

}
