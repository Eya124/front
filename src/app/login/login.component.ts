import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    if (username && password) {
      // Remplir le formulaire de connexion
      this.username = username;
      this.password = password;
    }
  }

  ngOnDestroy() {}
  
  username: string;
  password: string;
  
  
  login() {
    const body = new HttpParams()
      .set('username', this.username)
      .set('password', this.password)
      .set('client_id', 'camping-rest-api')
      .set('grant_type', 'password');

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post('http://192.168.100.129:9091/realms/Camping/protocol/openid-connect/token', body.toString(), { headers })
      .subscribe((response: any) => {
        const token = response.access_token;
        console.log(response.token);
        console.log(token);
        if (token) {
          console.log(response)
          // Stocker le token dans le local storage ou dans un service d'authentification
          localStorage.setItem('access_token', token);
          console.log(response.token);

          // Redirection vers user-profile
          this.router.navigate(['/reservation-form']);
        } else {
          console.log('Le token est vide');
        }
      }, (error) => {
        // Traitement de l'erreur en cas d'échec de la connexion
        console.error(error);
      });
  }

  rememberMe(event: Event) {
    const target = event.target as HTMLInputElement;

    if (target.checked) {
      // Stocker le nom d'utilisateur et le mot de passe dans le local storage
      localStorage.setItem('username', this.username);
      localStorage.setItem('password', this.password);
    } else {
      // Supprimer les informations d'identification stockées du local storage
      localStorage.removeItem('username');
      localStorage.removeItem('password');
    }
  }
}