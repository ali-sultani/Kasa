import { Table, Model, Column, DataType, Sequelize, BelongsTo, ForeignKey, HasMany } from "sequelize-typescript";
import { Categorie } from "./CategorieTable";
import { DemandeDeService } from "./DemandeDeServiceTable";
import { ModelStatic } from "sequelize";

@Table({
  timestamps: false,
  tableName: "service",
})
export class Service extends Model {
  @Column({
    type: DataType.UUID,
    allowNull: false,
    defaultValue: Sequelize.literal('UUID_TO_BIN(UUID(), true)'),
    primaryKey:true
  })
  num_service!: Buffer;

  @ForeignKey(() => Categorie)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  num_categorie!: Buffer;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nom_service!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  image!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description!: string;

  @HasMany(() => DemandeDeService, "num_service")
  demandeServices!: DemandeDeService[];

  static associate(models: { DemandeService: ModelStatic<Model<any, any>>; }) {
    Service.hasMany(models.DemandeService, { foreignKey: 'num_service' });
  }
  
  @BelongsTo(() => Categorie, "num_categorie")
  categorie!: Categorie;
}