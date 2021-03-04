import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';
@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {
  // Lottie
  optionsLottie: AnimationOptions = {
    path: 'assets/animations/erlenmeyer.json',
  };
  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  animationCreated(animationItem: AnimationItem): void {
  }

}
