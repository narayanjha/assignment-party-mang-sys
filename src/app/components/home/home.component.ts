import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PartyListComponent } from '../party-list/party-list.component';
import { AddPartyComponent } from '../add-party/add-party.component';
import { PartyService } from '../../services/party.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PartyListComponent, AddPartyComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  addEditParty: boolean = false;
  add_party!: boolean;
  edit_party!: boolean;
  popup_header!: string;
  partyDataList:any;
  sendPartyDetail: any;
  constructor(private _party:PartyService, private _router:Router){}

  ngOnInit(): void {
    this.getPartyList('');
  }

  getPartyList(e:any){
    this._party.allParty().subscribe((res:any) => {
      this.partyDataList = res;
    })
  }

  addPartyPopup(){
    this._router.navigate(['/add-party'])
  }
}
