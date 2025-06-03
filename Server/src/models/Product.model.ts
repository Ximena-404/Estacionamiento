import { Table, Column, Model, DataType } from "sequelize-typescript"

@Table({
    tableName: 'products',
    timestamps: true,
    underscored: true,
})

class Product extends Model {
    @Column({
        type: DataType.STRING(100)
    })
    name: string

    @Column({
        type: DataType.FLOAT(5, 2)
    })
    price: number

    @Column({
        type: DataType.BOOLEAN
    })
    disponibility: boolean
}

export default Product