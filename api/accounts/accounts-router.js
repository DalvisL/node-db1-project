const router = require('express').Router();
const { 
  checkAccountId, 
  checkAccountNameUnique, 
  checkAccountPayload } = require('./accounts-middleware');
const Account = require('./accounts-model');

router.get('/', (req, res, next) => {
  // DO YOUR MAGIC
  Account.getAll()
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(next);
})

router.get('/:id', checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  if (req.account) {
    res.status(200).json(req.account);
  } else {
    next();
  }
})

router.post('/', checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  // DO YOUR MAGIC
  const account = req.body;
  Account.create(account)
    .then(newAccount => {
      res.status(201).json(newAccount);
    })
    .catch(next);
})

router.put('/:id', checkAccountId, checkAccountPayload, (req, res, next) => {
  // DO YOUR MAGIC
  const id = req.params.id;
  const account = req.body;
  Account.updateById(id, account)
    .then(updatedAccount => {
      res.status(200).json(updatedAccount);
    })
    .catch(next);
});

router.delete('/:id', checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  const id = req.params.id;
  Account.deleteById(id)
    .then(deletedAccount => {
      res.status(200).json(deletedAccount);
    })
    .catch(next);
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  // error handling middleware
  res.status(err.status || 500).json({
    message: err.message,
  })
})

module.exports = router;
