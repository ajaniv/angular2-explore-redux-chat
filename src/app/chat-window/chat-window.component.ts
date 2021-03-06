import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { Store } from 'redux';

import { AppStore } from '../app-store';
import { Thread, User} from '../models';
import { ThreadActions } from '../actions';
import {
    AppState,
    getCurrentThread,
    getCurrentUser
  } from '../reducers';

@Component( {
    selector: 'app-chat-window',
    templateUrl: './chat-window.component.html',
    styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {

    currentThread: Thread;
    draftMessage: { text: string };
    currentUser: User;

    constructor( @Inject( AppStore ) private store: Store<AppState>,
        private el: ElementRef ) {
        store.subscribe(() => this.updateState() );
        this.updateState();
        this.draftMessage = { text: '' };
    }

    ngOnInit() {
    }

    updateState() {
        const state = this.store.getState();
        this.currentThread = getCurrentThread( state );
        this.currentUser = getCurrentUser( state );
        this.scrollToBottom();
    }

    scrollToBottom(): void {
        const scrollPane: any = this.el
            .nativeElement.querySelector( '.msg-container-base' );
        if ( scrollPane ) {
            setTimeout(() => scrollPane.scrollTop = scrollPane.scrollHeight );
        }
    }

    sendMessage(): void {
        this.store.dispatch( ThreadActions.addMessage(
            this.currentThread,
            {
                author: this.currentUser,
                isRead: true,
                text: this.draftMessage.text
            }
        ) );
        this.draftMessage = { text: '' };
    }

    onEnter( event: any ): void {
        this.sendMessage();
        event.preventDefault();
    }

}
