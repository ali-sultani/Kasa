import { Table, Model, Column, DataType, Sequelize, ForeignKey } from "sequelize-typescript";
import { Service } from "./ServiceTable";

@Table({
  timestamps: false,
  tableName: "jobber_exigence",
})
export class JobberExigence extends Model {
  @ForeignKey(() => Service)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    defaultValue: Sequelize.literal('UUID_TO_BIN(UUID(), true)'),
    primaryKey:true
  })
  num_jobber!: Buffer;

  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  num_exigence!: Buffer;
}