const { createUser, getAllUsers, getUser, update, deleteUser } = require('../controllers/userController');
const upload = require('../utils/multer');
const router = require('express').Router();
    
router.post('/users', upload.fields([
    {
    name: 'profileImage',
    maxCount: 1
  },
  {
    name: 'catalogs',
    maxCount: 5
  }
  ]), createUser);
  router.get('/users', getAllUsers);
  router.get('/users/:id', getUser);
  router.put('/users/:id', upload.fields([
    {
    name: 'profileImage',
    maxCount: 1
  },
  {
    name: 'catalogs',
    maxCount: 5
  }
  ]), update);
  router.delete('/users/:id', deleteUser);

module.exports = router;
  






