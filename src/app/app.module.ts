import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AppComponent } from './app.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClient, HttpHeaders } from '@angular/common/http';  // Importez HttpClientModule
import { ChatbotComponent } from './pages/chatbot/chatbot.component';
import { HttpService } from './services/http.service';  // Importer votre service

@NgModule({
    declarations: [
        AppComponent,
        ChatbotComponent,
    ],
    imports: [
        BrowserModule,
        MatSidenavModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        HttpClient,
        HttpHeaders,

    ],
    providers: [
        HttpService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
