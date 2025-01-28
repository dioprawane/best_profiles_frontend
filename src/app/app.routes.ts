import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { ChatbotComponent } from './pages/chatbot/chatbot.component';

export const routes: Routes = [
    {
        path: '',
        component: MainComponent
    },
    {
        path: 'chatbot',
        component: ChatbotComponent
    }
];
