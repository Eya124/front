// reset-password-request.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reset-password-request',
  templateUrl: './reset-password-request.component.html',
  styleUrls: ['./reset-password-request.component.scss']
})
export class ResetPasswordRequestComponent {
  email: string;
  emailInvalid: boolean;
  emailTouched: boolean;

  constructor(private http: HttpClient) { }

  submitForm(): void {
    if (this.email && this.validateEmail(this.email)) {
      this.emailInvalid = false;
      this.emailTouched = false;

      const url = `http://localhost:9091/api/auth/reset-password/request/${this.email}`;

      this.http.post(url, {}).subscribe(
        (response: any) => {
          console.log('Password reset email sent');
          // Ajoutez ici le code pour gérer la réponse du serveur, par exemple, afficher un message de succès à l'utilisateur.
        },
        (error: any) => {
          console.error('Error sending password reset email:', error);
          // Ajoutez ici le code pour gérer l'erreur, par exemple, afficher un message d'erreur à l'utilisateur.
        }
      );
    } else {
      this.emailInvalid = true;
      this.emailTouched = true;
    }
  }

  validateEmail(email: string): boolean {
    // Ajoutez ici votre logique de validation de l'adresse e-mail, par exemple, une expression régulière.
    return true;
  }
}
