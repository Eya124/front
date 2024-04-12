import { Commentaire } from "./Commentaire";
import { User } from "./User";

export class Post{
  idPost: number;
  linkpiecejointe: string;
  link: string;
  description: string;
  adresse: string;
  date: string; // Assurez-vous de vérifier le format de date approprié
  nbrParticipant: number;
  typeLogement: string;
  nbrLike: number;
  liked: boolean;
  nbrSignalement: number;
  commentaires: Commentaire[];
  user: User;
  status: boolean;
}
