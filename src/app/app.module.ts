import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    createStore,
    Store,
    compose,
    StoreEnhancer
} from 'redux';
import { AppStore } from './app-store';
import { AppState, default as reducer } from './reducers';
import { AppComponent } from './app.component';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { ChatThreadComponent } from './chat-thread/chat-thread.component';
import { ChatNavBarComponent } from './chat-nav-bar/chat-nav-bar.component';
import { ChatThreadsComponent } from './chat-threads/chat-threads.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { FromNowPipe } from './pipes/FromNowPipe';

const devtools: StoreEnhancer<AppState> =
    window['devToolsExtension'] ?
        window['devToolsExtension']() : f => f;

/*let store: Store<AppState> = createStore<AppState>(
    reducer,
    compose( devtools )
);
*/
export function useFactory(): Store<AppState> {
    return createStore<AppState>(
        reducer,
        compose( devtools )
    );
}


@NgModule( {
    declarations: [
        AppComponent,
        ChatMessageComponent,
        ChatThreadComponent,
        ChatNavBarComponent,
        ChatThreadsComponent,
        ChatWindowComponent,
        ChatPageComponent,
        FromNowPipe
    ],
    imports: [
        BrowserModule,
        FormsModule

    ],
    providers: [
        { provide: AppStore, useFactory: useFactory }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
