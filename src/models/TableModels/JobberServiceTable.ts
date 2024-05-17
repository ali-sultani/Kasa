import { Table, Model, Column, DataType, ForeignKey, PrimaryKey } from "sequelize-typescript";
import { Service } from "./ServiceTable";

@Table({
  timestamps: false,
  tableName: "jobber_service",
})
export class JobberService extends Model {
  @ForeignKey(() => Service)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  num_service!: Buffer;

  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  num_jobber!: Buffer;

}