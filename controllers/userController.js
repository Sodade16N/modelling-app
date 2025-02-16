const userModel = require('../models/user');
const fs = require('fs');

exports.createUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const files = req.files;

    const user = await userModel.find({ email });

    if (user.length === 1) {
      return res.status(400).json({
        message: `${email} has already been used by another user.`
      })
    };

    const newUser = await userModel.create({
      fullName,
      email,
      password,
      profileImage: files.profileImage[0].filename,
      catalogs: files.catalogs.map((e) => e.filename)
    });

    res.status(201).json({
      message: 'User created successfully',
      data: newUser
    })
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: 'Internal server error'
    })
  }
}


exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json({
      message: 'user found',
      total: users.length,
      data: users
    })
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: 'Internal server error'
    })
  }
}


exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      })
    };

    res.status(200).json({
      message: 'Check user below',
      data: user
    })
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: 'Internal server error'
    })
  }
}

exports.update = async (req, res) => {
  try {
      const { id } = req.params
      const { fullName, email, password } = req.body;
      const user = await userModel.findById(id);

      if (!user) {
          return res.status(404).json({
              message: 'user not found',
          })
      }

      const data = {
          fullName,
          email,
          password,
          profileImage: user.profileImage,
          catalogs: user.catalogs
      }
      const oldFilePath = user.catalogs.map((e) => { return `./uploads/${e}` })

      if (req.files && req.files[0]) {
          oldFilePath.forEach((path) => {
              if (fs.existsSync(path)) {
                  fs.unlinkSync(path)

                  const files = req.files.map((element) => element.filename);
                  data.familyPictures = files
              }
          })
      }
      
      const updatedUser = await userModel.findByIdAndUpdate(id, data, { new: true });

      res.status(201).json({
          message: 'User created successfully',
          data: updatedUser
      })
  } catch (error) {
      res.status(500).json({
          message: 'Error creating user: ' + error.message
      })
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      })
    };

    const deleteUser = await userModel.findByIdAndDelete(id);

    if (deleteUser) {
      const catalogImages = user.catalogs.map((e) => { return `./uploads/${e}` });
      catalogImages.forEach((imagePath) => {
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      });

      const profileImage = `./uploads/${user.profileImage}`;
      if (fs.existsSync(profileImage)) {
        fs.unlinkSync(profileImage);
      }
    }

    res.status(200).json({
      message: 'User deleted successfully'
    })

  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: 'Internal server error'
    })
  }
}