import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials = {
    email : "",
    password:""
  }
  showAlert = false;
  alertMsg = "Please wait! We are logging you in."
  alertColor = 'blue'
  inSubmission: boolean = false;

  constructor(private auth:AngularFireAuth,private authService:AuthService){

  }

  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }

  async login() {
    this.showAlert = true;
    //this.alertMsg = "Please wait! your account is being created..";
    this.alertColor = 'blue';
    this.inSubmission = true;
    try{
      await this.auth.signInWithEmailAndPassword(
        this.credentials.email, this.credentials.password
      )
      this.authService.isUserLoggedIn = true;
    }catch(e) {
      this.showAlert = true;
      this.alertMsg = "An unexpected error occurred.Please try again later.";
      this.alertColor = 'red';
      this.inSubmission = false;
      console.log(e)
      return;
    }
    this.alertMsg = "Success! Your are now logged in";
    this.alertColor = "green"; 
    console.log(this.credentials)
  }

}