import { Choice } from './choice';

export class LeadingQuestion{
	leading_question_id: number;
	leading_question: string;
	degree_of_importance: number;
	choices: Choice[];// chatbot or user
}
