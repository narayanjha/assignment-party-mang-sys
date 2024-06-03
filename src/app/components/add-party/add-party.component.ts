import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PartyService } from '../../services/party.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-party',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './add-party.component.html',
  styleUrl: './add-party.component.scss',
})
export class AddPartyComponent implements OnInit {
  addEditPartyForm!: FormGroup;
  public submitted: boolean = false;
  @Output() dataSend = new EventEmitter();
  @Input() sendPartyDetail: any;
  getId: any;
  viewId:any;
  editId:any;
  heading = "Add Party Detail";

  constructor(
    private _tost: ToastrService,
    private fb: FormBuilder,
    private _router: Router,
    private _party: PartyService,
    private _ar: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._ar.queryParams.subscribe((params)=>{
      console.log(params)
      this.viewId = params['view'];
      this.getId = params['id'];
      this.editId = params['edit'];
    })
    
    if (this.editId && this.getId) {
      this.getData(this.getId);
      this.heading = "Edit Party Detail"
    }
    if(this.viewId && this.getId){
      this.getData(this.getId);
      this.heading = "View Party Detail"
    }
    this.addEditPartyForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      company_name: new FormControl('', [Validators.required]),
      mobile_no: new FormControl('', [Validators.required,Validators.pattern(/^[0-9]+$/)]),
      telephone_no: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/)]),
      whatsapp_no: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/)]),
      email: new FormControl('', [Validators.required, Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)]),
      remark: new FormControl('', [Validators.required]),
      login_access: new FormControl('', [Validators.required]),
      date_of_birth: new FormControl('', [Validators.required]),
      anniversary_date: new FormControl('', [Validators.required]),
      gstin: new FormControl('', [Validators.required]),
      pan_no: new FormControl('', [Validators.required]),
      apply_tds: new FormControl('', [Validators.required]),
      credit_limit: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      bank: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
    });
  }

  get frm() {
    return this.addEditPartyForm.controls;
  }

  addNewParty() {
    this.submitted = true;
    if (this.addEditPartyForm.valid) {
      console.log('Add Party', this.addEditPartyForm.value);
      this._party.addNewParty(this.addEditPartyForm.value).subscribe((res) => {
        if (res) {
          this._tost.success('Party detail add successfully.');
          this._router.navigate(['/home']);
          this.addEditPartyForm.reset();
          this.dataSend.emit('');
        }
      });
    }
  }
  updateParty() {
    this.submitted = true;
    if (this.addEditPartyForm.valid) {
      console.log('Update Party', this.addEditPartyForm.value);
      this._party.updateParty(this.getId,this.addEditPartyForm.value).subscribe((res) => {
        if (res) {
          this._tost.success('Party detail update successfully.');
          this._router.navigate(['/home']);
          this.addEditPartyForm.reset();
          this.dataSend.emit('');
        }
      });
    }
    
  }

  getData(getId: any) {
    this._party.partyById(getId).subscribe((res) => {
      console.log(res);
      if (res) {
        this.addEditPartyForm.patchValue({
          name: res.name,
          company_name: res.company_name,
          mobile_no: res.mobile_no,
          telephone_no: res.telephone_no,
          whatsapp_no: res.whatsapp_no,
          email: res.email,
          remark: res.remark,
          login_access: res.login_access,
          date_of_birth: res.date_of_birth,
          anniversary_date: res.anniversary_date,
          gstin: res.gstin,
          pan_no: res.pan_no,
          apply_tds: res.apply_tds,
          credit_limit: res.credit_limit,
          address: res.address,
          bank: res.bank,
          image: res.image
        });
      }
    });
  }

  goToBack(){
    this._router.navigate(['/home']);
  }
  
}
