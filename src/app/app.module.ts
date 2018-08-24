import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule, RoutingComponents } from './/app-routing.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

//services
import { AdminService } from './services/admin.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MessageComponent } from './components/message/message.component';
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import { LeadingQuestionFormComponent } from './components/admin/leading-question-form/leading-question-form.component';
import { ChatboxComponent } from './components/chatbox/chatbox.component';
// ngx modules
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ToastrModule } from 'ngx-toastr';
import { ClipboardModule } from 'ngx-clipboard';
// font awesome

import { library } from '@fortawesome/fontawesome-svg-core';
import { faEllipsisV, faPaste, faTrash, faCopy, faClipboard, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faClone } from '@fortawesome/free-regular-svg-icons';
import { SavedLeadingQuestionComponent } from './components/admin/saved-leading-question/saved-leading-question.component';
import { LeadingQuestionQuestionaireComponent } from './components/admin/leading-question-questionaire/leading-question-questionaire.component';

library.add(faEllipsisV);
library.add(faCopy);
library.add(faPaste);
library.add(faClipboard);
library.add(faClone);
library.add(faTrash);
library.add(faTimes);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MessageComponent,
    ChatbotComponent,
    LeadingQuestionFormComponent,
    ChatboxComponent,
    RoutingComponents,
    SavedLeadingQuestionComponent,
    LeadingQuestionQuestionaireComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    AppRoutingModule,
    FormsModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    ClipboardModule
  ],
  providers: [
    AdminService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent],
  entryComponents: [ LeadingQuestionFormComponent,LeadingQuestionQuestionaireComponent ]
})
export class AppModule { }
