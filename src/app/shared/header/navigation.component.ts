import { Component, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

declare var $: any;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements AfterViewInit {
  @Output() toggleSidebar = new EventEmitter<void>();

  public config: PerfectScrollbarConfigInterface = {};

  public showSearch = false;

  constructor(private modalService: NgbModal, private router: Router,private http: HttpClient) {
  }
  ////////////
  searchResults: any[] = [];

  searchUsers(event: Event): void {
    event.preventDefault();
  
    const searchValue = (document.getElementById('searchName') as HTMLInputElement).value.trim();
  
    if (searchValue !== '') {
      const [name, lastname] = searchValue.split(' ');
  
      fetch(`http://localhost:9091/user/${name}/${lastname}`)
        .then(response => response.json())
        .then(users => {
          this.searchResults = users;
          console.log(users);
        })
        .catch(error => {
          console.error('Une erreur s\'est produite lors de la recherche des utilisateurs:', error);
        });
    }
  }
  
  ngAfterViewInit() {
    // Écoute l'événement de soumission du formulaire de recherche
    const form = document.getElementById('searchForm') as HTMLFormElement;
    form.addEventListener('submit', this.searchUsers.bind(this));
  
    // ...
  }

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
  
  // This is for Notifications
  notifications: Object[] = [
    {
      btn: 'btn-danger',
      icon: 'ti-link',
      title: 'Luanch Admin',
      subject: 'Just see the my new admin!',
      time: '9:30 AM'
    },
    {
      btn: 'btn-success',
      icon: 'ti-calendar',
      title: 'Event today',
      subject: 'Just a reminder that you have event',
      time: '9:10 AM'
    },
    {
      btn: 'btn-info',
      icon: 'ti-settings',
      title: 'Settings',
      subject: 'You can customize this template as you want',
      time: '9:08 AM'
    },
    {
      btn: 'btn-warning',
      icon: 'ti-user',
      title: 'Pavan kumar',
      subject: 'Just see the my admin!',
      time: '9:00 AM'
    }
  ];

  // This is for Mymessages
  mymessages: Object[] = [
    {
      useravatar: 'assets/images/users/user1.jpg',
      status: 'online',
      from: 'Pavan kumar',
      subject: 'Just see the my admin!',
      time: '9:30 AM'
    },
    {
      useravatar: 'assets/images/users/user2.jpg',
      status: 'busy',
      from: 'Sonu Nigam',
      subject: 'I have sung a song! See you at',
      time: '9:10 AM'
    },
    {
      useravatar: 'assets/images/users/user2.jpg',
      status: 'away',
      from: 'Arijit Sinh',
      subject: 'I am a singer!',
      time: '9:08 AM'
    },
    {
      useravatar: 'assets/images/users/user4.jpg',
      status: 'offline',
      from: 'Pavan kumar',
      subject: 'Just see the my admin!',
      time: '9:00 AM'
    }
  ];

  public selectedLanguage: any = {
    language: 'English',
    code: 'en',
    type: 'US',
    icon: 'us'
  }

  public languages: any[] = [{
    language: 'English',
    code: 'en',
    type: 'US',
    icon: 'us'
  },
  {
    language: 'Español',
    code: 'es',
    icon: 'es'
  },
  {
    language: 'Français',
    code: 'fr',
    icon: 'fr'
  },
  {
    language: 'German',
    code: 'de',
    icon: 'de'
  }]


  logout() {
    localStorage.removeItem('token');
    const token =localStorage.getItem('token');
    console.log(token);
    this.router.navigate(['/login']);
    
  }
}
