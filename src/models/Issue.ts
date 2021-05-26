// Comme c'est un fichier qui définit une classe par convention
// son nom commence par une Majuscule.

import { Model } from 'objection'

export class Issue extends Model {
  static tableName = 'issues';

  id!: number;
  nom!: string;
  url!: Text;
  // Ajout des deux champs dates
  createdAt!: Date;
  updatedAt!: Date;

  // Each model must have a column (or a set of columns) that uniquely
  // identifies the rows. The column(s) can be specified using the `idColumn`
  // property. `idColumn` returns `id` by default and doesn't need to be
  // specified unless the model's primary key is something else.
  static get idColumn() {
      return 'id';
  }
  // C'est utilisé pour la validation d'entrée. Chaque fois qu'une instance de modèle sera créée
  // soit explicitement, soit implicitement, il sera vérifié par rapport à ce schéma.
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['id', 'nom'],
      properties: {
        id: { type: 'integer' },
        nom: { type: ['integer', 'null'] },
        createdAt: { type: 'string'}, // Il n'existe pas de primitive 'Date' à priori
        updatedAt: { type: 'string'}  // Idem
      }
    }
  }
}
