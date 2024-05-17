import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Service } from "./ServiceTable";

@Table({
  timestamps: false,
  tableName: "demande_service",
})
export class DemandeDeService extends Model {
  @Column({
    type: DataType.UUID,
    allowNull: false,
    primaryKey:true
  })
  num_demande_service!: Buffer;

  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  num_client!: Buffer;

  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  num_jobber!: Buffer;

  @Column({
    type: DataType.TIME,
    allowNull: false,
  })
  tms_creation!: string;

  @Column({
    type: DataType.TIME,
    allowNull: false,
  })
  tms_realisation!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  adresse!: string;

  @Column({
    type: DataType.DECIMAL(10,2),
    allowNull: false,
  })
  taux_horaire!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  etat!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  nbre_dheures_demandee!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  nbre_heures_effectuee!: number;

  @ForeignKey(() => Service)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  num_service!: Buffer;

  @BelongsTo(() => Service)
  service!: Service;

  static associate(models: { Service: any; }) {
    DemandeDeService.belongsTo(models.Service, { foreignKey: 'num_service' });
  }
}