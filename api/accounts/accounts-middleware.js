const Account = require('./accounts-model');

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)

  const name = req.body.name.trim();
  const budget = req.body.budget;

  if (!name || !budget) {
    res.status(400).json({ message: "name and budget are required" });
  } else if(name && budget) {
    if (name.length < 3 || name.length > 100) {
      res.status(400).json({ message: "name of account must be between 3 and 100" });
    } else if (typeof budget !== "number") {
      res.status(400).json({ message: "budget of account must be a number" });
    } else if (budget < 0 || budget > 1000000) {
      res.status(400).json({ message: "budget of account is too large or too small" });
    } else {
      req.body.name = name;
      req.body.budget = budget;
      next();
    }
  }
}

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
    });
}
