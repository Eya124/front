import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {
  newPassword: string;
  confirmPassword: string;
  token: string;
  isResetSuccessful: boolean;
  private baseUrl = 'http://localhost:9091/api/auth';

  constructor(private route: ActivatedRoute, private http: HttpClient,private router: Router) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.params.token;
  }

  submitForm() {
    if (this.newPassword === this.confirmPassword) {
      const url = `${this.baseUrl}/reset-password/1/${this.token}?newPassword=${this.newPassword}`;
  
      this.http.post(url, null).subscribe(
        () => {
          this.isResetSuccessful = true;
          console.log('Le mot de passe a été changé avec succès !');
        },
        (error: HttpErrorResponse) => {
          console.log('Une erreur est survenue lors de la réinitialisation du mot de passe :', error);
          this.router.navigate(['/login']);
        }
      );
    } else {
      console.log('Les mots de passe ne correspondent pas.');
    }
  }
}