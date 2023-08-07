const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function getUsers(request, response) {
  try {
    const users = await prisma.user.findMany();
    response.status(200).send(users);
  } catch (err) {
    response.status(500).send({ err });
  }
}

async function createUser(request, response) {
  const { email, name, password } = request.body;
  if (!email || !name || !password)
    return response.status(400).send({ error: 'Missing fields' });

  const foundUser = await prisma.usuario.findUnique({
    where: {
      email,
    },
  });

  if (foundUser) return response.status(409).send({ error: 'User already exists' });

  try {
    const hash = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hash,
      },
    });
    response.status(201).send(newUser);
  } catch (err) {
    response.status(500).send({ error: err });
  }
}

async function deleteUser(request, response) {
  console.log('id', id);
  try {
    const deletedUser = await prisma.user.delete({
      where: {
        id,
      },
    });
    response.status(200).send(deletedUser);
  } catch (err) {
    response.status(500).send({ error: err });
  }
}

async function updateUser(request, response) {
  const { id } = request.params;
  const { email, name, password } = request.body;
  if (!email || !name || !password)
    return response.status(400).send({ error: 'Missing fields' });

  const foundUser = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!foundUser) return response.status(409).send({ error: 'User doesnt exist' });

  try {
    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        email,
        name,
        password,
      },
    });
    response.status(200).send(updatedUser);
  } catch (err) {
    response.status(500).send({ error: err });
  }
}

module.exports = {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
};
