import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  httpOption = {
    headers : new HttpHeaders({
      "Content-Type" : "application/json",
      "Access-Control-Allow-Origin" : "*"
    })
  }
  constructor(
    private _http:HttpClient
  ) { }

  private formatErrors(error:any){
    return throwError(error.error)
  }

  get(path:string, params:HttpParams = new HttpParams()):Observable<any>{
    return this._http.get(path,{params}).pipe(catchError(this.formatErrors))
  }

  put(path:string, body:Object={}):Observable<any>{
    return this._http.put(path, JSON.stringify(body)).pipe(catchError(this.formatErrors))
  }

  post(path:string, body:Object={}):Observable<any>{
    return this._http.post(path, JSON.stringify(body)).pipe(catchError(this.formatErrors))
  }

  delete(path:string):Observable<any>{
    return this._http.delete(path).pipe(catchError(this.formatErrors))
  }
}
