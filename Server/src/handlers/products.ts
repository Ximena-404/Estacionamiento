import { Request, Response } from 'express';
import  Product  from '../models/Product.model';

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.findAll({
        order:[
            ['id', 'ASC']
        ],
        attributes:{exclude: ['createdAt', 'updatedAt', 'disponibility']},
        limit: 5,
        });
        res.json({data: products})
    } catch (error) {
        console.log(error);
    }
}

export const createProduct = async (req: Request, res: Response) => {
    const product = await Product.create(req.body);
    res.json({data: product})
}

export const getProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if (!product) {
             res.status(404).json({ error: "producto no encontrado" });
             return
        }
        res.json({data: product})
    }catch (error) {
        console.log(error);
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    //veridicar si existe el producto
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
        res.status(404).json({ error: "producto no encontrado" });
        return
    }
    //actualizar el producto
    await product.update(req.body);
    await product.save();
    res.json({data: product})
}

export const deleteProduct = async (req: Request, res: Response) => {
    //veridicar si existe el producto
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
        res.status(404).json({ error: "producto no encontrado" });
        return
    }
    await product.destroy();
    res.json({message: "producto eliminado"})
}