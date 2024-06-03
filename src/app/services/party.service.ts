import { Injectable } from '@angular/core';
import { ApiService } from '../core/services/api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PartyService {
  baseAPI = environment.apiURL+"/party/";
  

  constructor(private _apiService: ApiService) {}

  allParty(): Observable<any> {
    return this._apiService.get(this.baseAPI);
  }

  addNewParty(part_data: any): Observable<any> {
    return this._apiService.post(this.baseAPI, part_data);
  }

  partyById(id: any) {
    return this._apiService.get(this.baseAPI + id);
  }

  updateParty(id: any, part_data: any): Observable<any> {
    return this._apiService.put(this.baseAPI + id, part_data);
  }

  deleteParty(id: any) {
    return this._apiService.delete(this.baseAPI + id);
  }
}
