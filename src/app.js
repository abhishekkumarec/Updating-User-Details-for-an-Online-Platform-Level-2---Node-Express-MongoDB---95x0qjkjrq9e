const express = require('express');
const bodyParser = require('body-parser');
const userDetails = require('./data/userDetails.json');

const app = express();
app.use(bodyParser.json());

// PATCH request to update user details
app.patch('/api/v1/details/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = userDetails.findIndex(user => user.id === id);

  if (index === -1) {
    // User not found
    res.status(404).json({ status: 'failed', message: 'User not found!' });
  } else {
    // Update user details
    userDetails[index].name = req.body.name || userDetails[index].name;
    userDetails[index].mail = req.body.mail || userDetails[index].mail;
    userDetails[index].number = req.body.number || userDetails[index].number;

    // Return updated user details
    res.json({
      status: 'success',
      message: `User details updated successfully for id: ${id}`,
      product: userDetails[index]
    });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
