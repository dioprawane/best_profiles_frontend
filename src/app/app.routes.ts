import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { ChatbotComponent } from './pages/chatbot/chatbot.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { JobsDetailComponent } from './components/jobs-detail/jobs-detail.component';
import { CvTriComponent } from './pages/cv-tri/cv-tri.component';

export const routes: Routes = [
    {
        path: '',
        component: MainComponent
    },
    {
        path: 'chatbot',
        component: ChatbotComponent
    }, 
    {
        path: 'jobs',
        component: JobsComponent
    },
    {
        path: 'jobs_detail/:id',
        component: JobsDetailComponent
    },
    {
        path: 'tri',
        component: CvTriComponent
    }

];
