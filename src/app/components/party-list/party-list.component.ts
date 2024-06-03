import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PartyService } from '../../services/party.service';

@Component({
  selector: 'app-party-list',
  standalone: true,
  imports: [],
  templateUrl: './party-list.component.html',
  styleUrl: './party-list.component.scss'
})
export class PartyListComponent {
  @Input() partyData:any;
  @Output() openEditDialog = new EventEmitter();
  @Output() dataSend = new EventEmitter();

  constructor(private _router:Router, private _party:PartyService,){}

  editParty(item:any){
    this._router.navigate([`/edit-party`],{ queryParams: { edit: 'true', 'id': item.id } });
  }
  viewParty(item:any){
    this._router.navigate(['/view-party-detail'],{ queryParams: { view: 'true', 'id': item.id } })
  }
  deleteParty(id:any){
    console.log(id)
      if (confirm('Are you sure you want to delete this item?')) {
        this._party.deleteParty(id).subscribe((res) => {
          console.log(res)
          this.dataSend.emit('');
        });
      }
  }
}
