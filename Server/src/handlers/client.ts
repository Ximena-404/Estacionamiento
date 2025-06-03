// client.ts

import Client from '../models/Client.model';

// Obtener todos los clientes
export const getClients = async (req, res) => {
  try {
    const clients = await Client.findAll();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener clientes' });
  }
};

// Obtener un cliente por ID
export const getClientById = async (req, res) => {
  const { id } = req.params;
  try {
    const client = await Client.findByPk(id);
    if (!client) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.json(client);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener cliente' });
  }
};

// Crear un nuevo cliente
export const createClient = async (req, res) => {
  const { nombre, apellido, telefono } = req.body;
  try {
    const client = await Client.create({ nombre, apellido, telefono });
    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear cliente' });
  }
};

// Actualizar un cliente
export const updateClient = async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, telefono } = req.body;
  try {
    const client = await Client.findByPk(id);
    if (!client) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    client.nombre = nombre;
    client.apellido = apellido;
    client.telefono = telefono;
    await client.save();
    res.json(client);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar cliente' });
  }
};

// Eliminar un cliente
export const deleteClient = async (req, res) => {
  const { id } = req.params;
  try {
    const client = await Client.findByPk(id);
    if (!client) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    await client.destroy();
    res.json({ message: 'Cliente eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar cliente' });
  }
};

