const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function getUsers(request, response) {
  try {
    const users = await prisma.user.findMany();
    response.status(200).json(users);
  } catch (err) {
    response.status(500).json({ err });
  }
}

async function loginUser(request, response) {
  const { email, password } = request.body;
  if (!email || !password) return response.status(400).json({ error: 'Missing fields' });

  const foundUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!foundUser) return response.status(409).json({ error: 'User doesnt exist' });

  try {
    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) return response.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: foundUser.id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    response.json({ token });
  } catch (err) {
    response.status(500).json({ error: err });
  }
}

async function returnToken(request, response) {
  const { token } = request.params;
  if (!token) return response.status(400).json({ error: 'Missing fields' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const foundUser = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
    });
    data = {
      id: foundUser.id,
      email: foundUser.email,
      name: foundUser.name,
    };
    response.status(200).json(data);
  } catch (err) {
    response.status(500).json({ error: err });
  }
}

async function createUser(request, response) {
  const { email, name, password } = request.body;
  if (!email || !name || !password)
    return response.status(400).json({ error: 'Missing fields' });

  const foundUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (foundUser) return response.status(409).json({ error: 'User already exists' });

  try {
    const hash = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hash,
      },
    });
    response.status(201).json(newUser);
  } catch (err) {
    response.status(500).json({ error: err });
  }
}

async function deleteUser(request, response) {
  const { id } = request.params;
  try {
    const deletedUser = await prisma.user.delete({
      where: {
        id,
      },
    });
    response.status(200).json(deletedUser);
  } catch (err) {
    response.status(500).json({ error: err });
  }
}

async function updateUser(request, response) {
  const { id } = request.params;
  const { email, name, password } = request.body;
  if (!email || !name || !password)
    return response.status(400).json({ error: 'Missing fields' });

  const foundUser = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!foundUser) return response.status(409).json({ error: 'User doesnt exist' });

  try {
    const hash = await bcrypt.hash(foundUser.password, 10);
    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        email,
        name,
        hash,
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
  loginUser,
  returnToken,
};
