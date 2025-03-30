// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { MatSidenavModule } from '@angular/material/sidenav';
// import { AppComponent } from './app.component';
// import { MatIconModule } from '@angular/material/icon';
// import { MatButtonModule } from '@angular/material/button';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { HttpClient, HttpHeaders } from '@angular/common/http';  // Importez HttpClientModule
// import { ChatbotComponent } from './pages/chatbot/chatbot.component';
// import { HttpService } from './services/http.service';  // Importer votre service
// import { JobsComponent } from './components/jobs/jobs.component';
// import { JobsDetailComponent } from './components/jobs-detail/jobs-detail.component';
// import { HttpClientModule } from '@angular/common/http';

// @NgModule({
//     declarations: [
//         AppComponent,
//         ChatbotComponent,
//         JobsComponent,
//         JobsDetailComponent
//     ],
//     imports: [
//         BrowserModule,
//         MatSidenavModule,
//         MatToolbarModule,
//         MatButtonModule,
//         MatIconModule,
//         HttpClient,
//         HttpHeaders,
//     ],
//     providers: [
//         HttpService,
//     ],
//     bootstrap: [AppComponent]
// })
// export class AppModule { }
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AppComponent } from './app.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';  // Import provideHttpClient and withInterceptorsFromDi
import { ChatbotComponent } from './pages/chatbot/chatbot.component';
import { HttpService } from './services/http.service';  // Import your service
import { JobsComponent } from './components/jobs/jobs.component';
import { JobsDetailComponent } from './components/jobs-detail/jobs-detail.component';

import { CvTriComponent } from './pages/cv-tri/cv-tri.component';
import { CvBoxComponent } from './components/cv-box/cv-box.component';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CvMatchingComponent } from './pages/cv-matching/cv-matching.component';

import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { CommonModule } from '@angular/common';
import { NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';

@NgModule({
    declarations: [
        AppComponent,
        ChatbotComponent,
        JobsComponent,
        JobsDetailComponent,
        CvTriComponent,
        CvBoxComponent,
        CvMatchingComponent
    ],
    imports: [
        BrowserModule,
        MatSidenavModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        HttpClientModule,  // Import HttpClientModule for HTTP requests
        MatProgressSpinnerModule,  // Import MatProgressSpinnerModule for loading spinner
        FormsModule,  // Import FormsModule for form handling
        MatFormFieldModule,  // Import MatFormFieldModule for form fields
        MatInputModule,  // Import MatInputModule for input fields
        BrowserAnimationsModule,
        CommonModule,
        PdfJsViewerModule
    ],
    schemas: [
        NO_ERRORS_SCHEMA,
        // CUSTOM_ELEMENTS_SCHEMA
    ],
    providers: [
        provideHttpClient(),  // Use provideHttpClient with interceptors
        HttpService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
