const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getGastos(request, response) {
  try {
    const gastos = await prisma.user.findMany();
    response.status(200).json(gastos);
  } catch (err) {
    response.status(500).json({ err });
  }
}

async function createGastos(request, response) {
  const { name, mes, descripcion, value, original_parcels, num_parcels, userId } =
    request.body;
  if (!mes || !value) return response.status(400).json({ error: 'Missing data' });
  try {
    const gastos = await prisma.gastos.create({
      data: {
        name,
        mes,
        descripcion,
        value,
        original_parcels,
        num_parcels,
        userId,
      },
    });
    response.status(200).json(gastos);
  } catch (err) {
    response.status(500).json({ err });
  }
}

async function deleteGastos(request, response) {
  const { id } = request.params;
  try {
    const gastos = await prisma.gastos.delete({
      where: {
        id: id,
      },
    });
    response.status(200).json(gastos);
  } catch (err) {
    response.status(500).json({ err });
  }
}

async function updateGastos(request, response) {
  const { id } = request.params;
  const { name, mes, descripcion, value, original_parcels, num_parcels, userId } =
    request.body;
  try {
    const gastos = await prisma.gastos.update({
      where: {
        id: id,
      },
      data: {
        name,
        mes,
        descripcion,
        value,
        original_parcels,
        num_parcels,
        userId,
      },
    });
    response.status(200).json(gastos);
  } catch (err) {
    response.status(500).json({ err });
  }
}

module.exports = {
  getGastos,
  createGastos,
  deleteGastos,
  updateGastos,
};
