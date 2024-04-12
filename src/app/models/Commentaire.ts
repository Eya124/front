import { Post } from "./Post";

export class Commentaire{
  idCommentaire: number;
  content: string;
  createdAt: string; // Assurez-vous de vérifier le format de date approprié
  post: Post;
  parentComment: Commentaire;
  replies: Commentaire[];
}
