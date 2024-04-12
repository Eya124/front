import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PostService } from '../post.service';
import Swal from 'sweetalert2';
import { User } from '../models/User';
import { CommentaireService } from '../commentaire.service';

@Component({
  selector: 'app-details-post',
  templateUrl: './details-post.component.html',
  styleUrls: ['./details-post.component.scss']
})
export class DetailsPostComponent implements OnInit {
  postId: number;
  posts: any[];
  showDetails: boolean = false;
  showButton: boolean = false;
  postDetails: boolean[] = [];
  postLikes: number[] = [];
  content: string = '';
  commentaires: any[] = [];
  userid = 0;

  constructor(private http: HttpClient, private router: Router, private postService: PostService, private commentaireService: CommentaireService) {
    this.posts = [];
  }

  ngOnInit(): void {
    this.getPostDetails();
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get<any>('http://localhost:9091/api/auth/current', { headers }).subscribe(
      (user) => {
        this.userid = user.idUser;
        console.log(this.userid);
      });
  }

  getupdate() {
    this.router.navigate(['post/update/:postId']);
  }

  getPostDetails() {
    const url = 'http://localhost:9091/post'; // Remplacez par l'URL de votre endpoint backend

    this.postService.getPostNotArchived().subscribe(
      response => {
        this.posts = response; // Stocker les détails du post dans la propriété "post"
        console.log(response);
      },
      error => {
        console.error('Erreur lors de la récupération des détails du post :', error);
      }
    );
  }

  toggleDetails(index: number, idPost: number) {
    this.postDetails[index] = !this.postDetails[index];
    this.showButton = true;
    this.postService.getCommentairesPost(idPost).subscribe(
      (commentaires) => {
        this.commentaires = commentaires;
        console.log('Succès', this.commentaires);
        console.log(commentaires);
      },
      (error) => {
        console.error('Erreur lors de la récupération des commentaires :', error);
      }
    )
  }

  toggleLike(index: number, idPost: number) {
    const post = this.posts[index];

    let liked = false;

    this.postService.likePost(idPost, this.userid).subscribe(
      (post) => {
        liked = post.liked;
        console.log(post.liked);
        this.getPostDetails();
      },
      (error) => {
            console.error('Erreur lors de la récupération des commentaires :', error);
      }
    )
  }

  archiverPost(postId: number) {
    Swal.fire({
      title: 'Confirmation',
      text: 'Confirm archived?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.postService.archiverPost(postId).subscribe(
          () => {
            console.log('Post archivé avec succès');
            // Mettre à jour la liste des posts affichés dans votre application frontend
            this.getPostDetails();
          },
        (error) => {
          console.error('Erreur lors de l\'archivage du post :', error);
        })}}
      );
  }

  ajouterCommentaire(postId: number, content: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<any>('http://localhost:9091/api/auth/current', { headers }).subscribe({
      next: (user: any) => {
        const url = `http://localhost:9091/commentaire/addCommentaire/${user.idUser}/${postId}`;
        const commentaireData = {
          content: content, // Remplacez par le contenu du commentaire
          createdAt: new Date(), // Ajoutez la date de création du commentaire ici
          archive: false, // Ajoutez la valeur d'archivage du commentaire ici
          usercommentaire: { idUser: user.idUser },
          post: { idPost: postId }
          // Ajoutez d'autres champs du modèle de commentaire selon vos besoins
        };

        this.http.post(url, commentaireData, { headers }).subscribe(
          () => {
            Swal.fire({
              title: 'Succès!',
              text: 'Commentaire ajouté avec succès',
              icon: 'success',
              confirmButtonText: 'OK'
            });
            this.postService.getCommentairesPost(postId).subscribe(
              (commentaires) => {
                this.commentaires = commentaires;
                console.log('Succès', this.commentaires);
                console.log(commentaires);
                this.content = '';
              },
              (error) => {
                console.error('Erreur lors de la récupération des commentaires :', error);
              }
            )

          },
          (error) => {
            console.error('Erreur lors de l\'ajout du commentaire :', error);
          }
        );
      },
      error: (error) => {
        console.error('Erreur lors de la récupération de l\'utilisateur actuel :', error);
      }
    });
  }

  archiverCommentaire(commentaireId: number) {
    Swal.fire({
      title: 'Confirmation',
      text: 'Confirm archived?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.commentaireService.archiverCommentaire(commentaireId).subscribe(
          () => {
            console.log('Commentaire archivé avec succès');
          // Mettre à jour la liste des commentaires affichés dans votre application frontend
          if (this.postId) { // Vérifiez que this.postId est défini
            this.postService.getCommentairesPost(this.postId).subscribe(
              (commentaires) => {
                this.commentaires = commentaires;
              },
              (error) => {
                console.error('Erreur lors de la récupération des commentaires :', error);
              }
            );
          }
        },
        (error) => {
          console.error('Erreur lors de l\'archivage du post :', error);
        })
        this.postService.getCommentairesPost(this.postId);
        console.log(this.postService.getCommentairesPost(this.postId));
      }}
      );
  }
}
