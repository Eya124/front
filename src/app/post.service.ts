import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from './models/Post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }


  getPostData(): Observable<Post> {
    // Effectuez votre logique pour récupérer les données existantes
    // Par exemple, effectuez une requête HTTP GET vers votre API

    // Exemple de requête HTTP GET vers une API fictive
      return this.http.get<Post>('http://localhost:9091/post');
  }

  getByIdPost(postId: number): Observable<Post> {
    const url = ('http://localhost:9091/post/'+ postId);
    return this.http.get<Post>(url);
  }

  updatePost(post: Post): Observable<Post> {
    return this.http.put<Post>('http://localhost:9091/post/update/', post);
  }

  addCommentToPost(postId: number, commentaire: any): Observable<any> {
    const url = "http://localhost:9091/post/${postId}/comments"; // Remplacez "/posts/${postId}/comments" par le chemin de votre API pour ajouter un commentaire à un poste
    return this.http.post(url, commentaire);
  }

  getPostNotArchived(): Observable<Post[]> {
    const url = ('http://localhost:9091/post/Notarchived');
    return this.http.get<Post[]>(url);
  }

  archiverPost(postId: number) {
    return this.http.delete('http://localhost:9091/post/delete/'+ postId);
  }

  getCommentairesPost(postId: number): Observable<any[]> {
    const url = ('http://localhost:9091/commentaire/getCommentaires/'+ postId);
    return this.http.get<any[]>(url);
  }

  likePost(postId: number, userId: number): Observable<Post> {
    const url = ('http://localhost:9091/post/like/'+ postId + '/' + userId);
    return this.http.get<Post>(url);
  }

}
