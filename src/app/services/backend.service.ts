import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

	phpUrlTest: string = "http://localhost/angular2/backend/chatbot/main.php";
	phpUrl: string = "http://localhost/angular2/backend/chatbot/main.php";
  constructor(
    private http: HttpClient,
    
  ) { }
  // constructor() { }




  processData(process: string,data: {}): Observable<any>{
  	console.log("dumaan dito");
  	return this.http.post(this.phpUrl,{
  		process: process,
  		data: data
  	}).pipe(
  		catchError(e=>of(console.log(e)))
  	);
  }






























  // employees: string[] = ['asfaf','asfaf','asfaf','asfaf'];


  // getEmployees(): any[]{
  // 	return this.employees;
  // }

  // // do not delete... this is for the request in php files...
  // testGetData(method){
  // 	return this.http.get(this.phpUrlTest+method);
  // }

  // // Error handler
  // private handleError<T>(process="", result?: T){
  //   return (error: any): Observable<T>=>{
  //   	console.log("error on process"+process);
  //     return of(result as T);
  //   }
  // }
}
