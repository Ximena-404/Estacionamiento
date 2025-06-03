import { Router } from 'express';
import { body, param } from 'express-validator';

import { createClient, getClients, getClientById, updateClient, deleteClient } from './handlers/client';  // Importación de los métodos de cliente
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct } from './handlers/products';  // Importación de los métodos de producto
import { handlersInputerrors } from './middleware';  // Middleware para manejar errores de validación

const router = Router();

// Rutas para productos
router.post('/products', 
    body('name').notEmpty().withMessage('Name is required'),
    body('price')
        .isNumeric().withMessage("Valor no válido")
        .notEmpty().withMessage("El precio del producto no puede estar vacío")
        .custom(value => value > 0).withMessage("El precio no es válido"),
    handlersInputerrors,
    createProduct
);

router.get('/products', getProducts);

router.get('/products/:id', 
    param('id').isInt().withMessage('El id debe de ser un número entero'),
    handlersInputerrors,
    getProductById
);

router.put('/products/:id', 
    body('name').notEmpty().withMessage('El nombre no puede ir vacío'),
    body('price')
        .isNumeric().withMessage('Valor no válido')
        .notEmpty().withMessage('El precio del producto no puede estar vacío')
        .custom(value => value > 0).withMessage('El precio no válido'),
    body('disponibility')
        .isBoolean().withMessage('El valor de la disponibilidad no es válido'),
    handlersInputerrors,
    updateProduct
);

router.delete('/products/:id', 
    param('id').isInt().withMessage('El id debe de ser un número entero'),
    handlersInputerrors,
    deleteProduct
);

// Rutas para clientes
router.post('/clients', 
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('apellido').notEmpty().withMessage('El apellido es obligatorio'),
    body('telefono')
        .notEmpty().withMessage('El teléfono es obligatorio')
        .isMobilePhone('any').withMessage('El teléfono no es válido'),
    handlersInputerrors,
    createClient
);

router.get('/clients', getClients);

router.get('/clients/:id', 
    param('id').isInt().withMessage('El id debe de ser un número entero'),
    handlersInputerrors,
    getClientById  // Función para obtener cliente por ID
);

router.put('/clients/:id', 
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('apellido').notEmpty().withMessage('El apellido es obligatorio'),
    body('telefono')
        .notEmpty().withMessage('El teléfono es obligatorio')
        .isMobilePhone('any').withMessage('El teléfono no es válido'),
    handlersInputerrors,
    updateClient  // Función para actualizar cliente
);

router.delete('/clients/:id', 
    param('id').isInt().withMessage('El id debe de ser un número entero'),
    handlersInputerrors,
    deleteClient  // Función para eliminar cliente
);

export default router;
