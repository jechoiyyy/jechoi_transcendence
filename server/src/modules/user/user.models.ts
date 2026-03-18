import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  Unique,
  Default,
} from "sequelize-typescript";

@Table({
  tableName: "Users",
  timestamps: false,
})
class Users extends Model<Users> {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;
  @Column(DataType.STRING(255))
  @AllowNull(false)
  @Unique(true)
  declare email: string;
  @Column(DataType.STRING(14))
  @AllowNull(false)
  @Unique(true)
  declare nickname: string;
  @Column(DataType.STRING(255))
  @AllowNull(false)
  declare password: string;
  @Column
  @AllowNull(false)
  @Default(0)
  declare wins: number;
  @Column
  @AllowNull(false)
  @Default(0)
  declare losses: number;
  @Column
  @AllowNull(false)
  @Default(1)
  declare level: number;
  @Column
  @Default(1000)
  @AllowNull(false)
  declare rating: number;
}
