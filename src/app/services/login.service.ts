import { Injectable } from '@angular/core';
import { ApiService } from '../core/services/api.service';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseAPI = environment.apiURL;

  constructor(private _apiService: ApiService) {}

  userLogin(user_name:any,password:any):Observable<any>{
    return this._apiService.get(`${this.baseAPI}/user/?username=${user_name}&password=${password}`)
  }
  
}
