import { Table, Model, Column, DataType, HasMany } from "sequelize-typescript";
import { Service } from "./ServiceTable";

@Table({
  timestamps: false,
  tableName: "categorie",
})
export class Categorie extends Model {
  @Column({
    type: DataType.UUID,
    allowNull: false,
    primaryKey:true
  })
  num_categorie!: Buffer;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nom_categorie!: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  num_parent_categorie!: Buffer;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  image!: string;

  // In Categorie model
  @HasMany(() => Service, 'num_categorie')
  services!: Service[];
}