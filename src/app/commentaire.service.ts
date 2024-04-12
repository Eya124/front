import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Commentaire } from './models/Commentaire';

@Injectable({
  providedIn: 'root'
})
export class CommentaireService {

  constructor(private http: HttpClient) { }

  archiverCommentaire(commentaireId: number) {
    return this.http.delete('http://localhost:9091/commentaire/deleteCommentaire/'+ commentaireId);
  }
}
