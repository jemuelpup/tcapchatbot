export class Question{
	question_id: number;
	question: string;
	subject_id: number;
	subject: string;
	keywords: {
		keyword_id: number;
		keyword: string;
	}[];

	constructor(
		question_id: number,
		question: string,
		subject_id: number,
		subject: string,
		keywords: {
			keyword_id: number;
			keyword: string;
		}[]
	){
		this.question_id = question_id;
		this.question = question;
		this.subject_id = subject_id;
		this.subject = subject;
		this.keywords = keywords;
	}
}
