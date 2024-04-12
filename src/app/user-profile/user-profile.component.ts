import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
//import { error } from 'console';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(private http: HttpClient,private router: Router) {}

    currentUser: any;
 
    
   /* constructor(private userservice:UserService) { }
  
    ngOnInit(): void {
      console.log(localStorage.getItem)
      this.userservice.getUserInfo().subscribe(
        (data)=>{
          this.userInfo=data;
          console.log(this.userInfo);
        },
        (error) =>{
          console.log(error);
        }
      );
    }*/
    ngOnInit(): void {
    
    const token = localStorage.getItem('token');
      console.log(token)
    
      if (token) {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        
        this.http.get<any>('http://localhost:9091/api/auth/current', { headers }).subscribe({
          next: (user: any) => {
            this.currentUser = user;
          

            console.log('Utilisateur actuel :', this.currentUser);
          },
          error: (error: any) => {
            console.error('Erreur lors de la récupération de l\'utilisateur actuel :', error);
          },
          complete: () => {
            // Logique à exécuter une fois la requête terminée (facultatif)
          }
        });
      } else {
        // Gérer le cas où le jeton n'est pas présent dans le stockage local
      }
    }
    viewUser(id: string) {
      this.router.navigate(['/user', id]);
    }
  }
  


