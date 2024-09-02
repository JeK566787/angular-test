import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { delay, from, map, skip, take, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  authService = inject(AuthService)
  router = inject(Router)

  isPasswordVisisble = signal<boolean>(false)

  form = new FormGroup({
    username: new FormControl<string | null>(null, Validators.required),
    password: new FormControl<string | null>(null, Validators.required)
  })

  // ====== Пример работы с RxJS и метод Pipe()
  // constructor() {
  //   from([1, 2, 3, 4, 5, 6, 7, 8, 9])
  //     .pipe(
  //       map(val => val * 2),
  //       tap(val => {
  //         this.form.patchValue({ username: val.toString() })
  //       })
  //     )

  //     .subscribe(val => { console.log(val); })
  // }

  onSubmit(event: Event) {

    if (this.form.valid) {
      // console.log('Form is valid');
      //@ts-ignore
      this.authService.login(this.form.value).subscribe(response => {
        // console.log('Response:', response);
        this.router.navigate([''])
      });
    }

    // if (this.form.valid) {
    //   //@ts-ignore
    //   this.authService.login(this.form.value)
    //   console.log(this.form.value);
    // }

  }
}
