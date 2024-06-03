import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;
  public submitted: boolean = false;

  constructor(
    private _login: LoginService,
    private _tost: ToastrService,
    private fb: FormBuilder,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.submitted = false;
    this.loginForm = this.fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }
  get frm() {
    return this.loginForm.controls;
  }
  submit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this._login
        .userLogin(this.loginForm.value.username, this.loginForm.value.password)
        .subscribe((res) => {
          if(res.length == 1){
            debugger
            this._tost.success('Successfully Login');
            this._router.navigate(['/home']);  
          }else{
            alert('Invalid')
          }
          
        },
        error =>{
          alert(error)
        });
    }
  }
}
