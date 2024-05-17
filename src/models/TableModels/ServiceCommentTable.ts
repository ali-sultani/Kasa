import { Table, Model, Column, DataType, Sequelize, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Service } from "./ServiceTable";

@Table({
  timestamps: false,
  tableName: "service_comment",
})
export class ServiceComment extends Model {
  @Column({
    type: DataType.UUID,
    allowNull: false,
    defaultValue: Sequelize.literal('UUID_TO_BIN(UUID(), true)'),
    primaryKey:true
  })
  comment_id!: Buffer;

  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  num_client!: Buffer;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  comment_text!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  note!: number;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  comment_date!: Date;

  @ForeignKey(() => Service)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  num_service!: Buffer;

  @BelongsTo(() => Service)
  service!: Service;

  static associate(models: { Service: any; }) {
    ServiceComment.belongsTo(models.Service, { foreignKey: 'num_service' });
  }
}