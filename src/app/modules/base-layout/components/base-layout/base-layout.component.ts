import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { LogService } from 'src/app/core/services/log.service';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router'
@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.scss']
})
export class BaseLayoutComponent implements OnInit {

  user ;
  loadingUser : boolean = true;
  // Lottie
  optionsLottie: AnimationOptions = {
    path: 'assets/animations/atom.json',
  };
  constructor(private authService: AuthService,
              private logService: LogService, 
              public afAuth: AngularFireAuth,
              private router: Router ) { }

  ngOnInit(): void {
      this.afAuth.authState.subscribe(user => {
        if(!!user){
          this.user= this.authService.GetUserData();
          this.loadingUser = false;
        }
      })
  }

  onLogOut(){
    this.authService.SignOut();
  }

  onClickNewExperiment(){
    //Si ya estoy en sim, recargo la pag para que se reinicie el sim 
    if(this.router.url.includes('sim')){
      window.location.reload();
    }
    this.logService.newLogs();
  }
  animationCreated(animationItem: AnimationItem): void {
  }

}
