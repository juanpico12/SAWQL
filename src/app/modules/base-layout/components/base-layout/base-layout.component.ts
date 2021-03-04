import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.scss']
})
export class BaseLayoutComponent implements OnInit {

  user;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.user= this.authService.GetUserData()
    console.log(this.user);
    
  }

  onLogOut(){
    this.authService.SignOut();
  }

}
