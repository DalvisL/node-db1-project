const Account = require('./accounts-model');

exports.checkAccountPayload = (req, res, next) => {
  const { name, budget } = req.body;
  if (name === undefined || budget === undefined) {
    return res.status(400).json({ message: 'Name and budget are required' });
  }
  if (typeof name !== 'string' || name.trim().length < 3 || name.trim().length > 100) {
    return res.status(400).json({ message: 'Name must be between 3 and 100 characters' });
  }
  if (typeof budget !== 'number' || isNaN(budget)) {
    return res.status(400).json({ message: 'Budget must be a number' });
  }
  if (budget < 0 || budget > 1000000) {
    return res.status(400).json({ message: 'budget is too large or too small' });
  }
  req.body.name = name.trim();
  next();
};

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
  const name = req.body.name.trim();
  Account.getAll()
    .then(accounts => {
      const account = accounts.find(account => account.name === name);
      if (account) {
        res.status(400).json({ message: "that name is taken" });
      } else {
        next();
      }
  });
}

exports.checkAccountId = (req, res, next) => {
  // DO YOUR MAGIC
  const id = req.params.id;
  Account.getById(id)
    .then(account => {
      if (account) {
        req.account = account;
        next();
      } else {
        res.status(404).json({ message: "account not found" });
      }
    })
  }
