const db = require('../../data/db-config')

const getAll = async () => {
  // DO YOUR MAGIC
  return await db('accounts');
}

const getById = async id => {
  // DO YOUR MAGIC
  return await db('accounts').where('id', id).first();
}

const create = async account => {
  // DO YOUR MAGIC
  const [id] = await db('accounts').insert(account);
  const newAccount = await getById(id);
  return newAccount;
}

const updateById = async (id, account) => {
  // DO YOUR MAGIC
  await db('accounts').where('id', id).update(account);
  const updatedAccount = await getById(id);
  return updatedAccount;
}

const deleteById = async id => {
  // DO YOUR MAGIC
  const toBeDeleted = await getById(id);
  await db('accounts').where('id', id).del();
  return toBeDeleted;
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
