import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import { AdminComponent } from './components/admin/admin.component';
import { EditLeadingQuestionComponent } from './components/admin/edit-leading-question/edit-leading-question.component';
const routes: Routes = [
	{ path: '', redirectTo: 'admin', pathMatch: 'full' },
	{ path: 'chatbot', component: ChatbotComponent },
	{ path: 'admin', component: AdminComponent },
	{ path: 'test', component: EditLeadingQuestionComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }

export const RoutingComponents = [
	ChatbotComponent,
	AdminComponent,
	EditLeadingQuestionComponent
];
