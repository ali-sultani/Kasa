import { Table, Model, Column, DataType, Sequelize, BelongsTo, ForeignKey, HasMany } from "sequelize-typescript";
import { Service } from "./ServiceTable";

@Table({
  timestamps: false,
  tableName: "exigence",
})
export class Exigence extends Model {
  @Column({
    type: DataType.UUID,
    allowNull: false,
    defaultValue: Sequelize.literal('UUID_TO_BIN(UUID(), true)'),
    primaryKey:true
  })
  num_exigence!: Buffer;

  @ForeignKey(() => Service)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  num_service!: Buffer;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description!: string;
}