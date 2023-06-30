const Citoyen = require('../models/citoyen');

exports.createCitoyen = async (req, res) => {
  try {
    const citoyen = new Citoyen(req.body);
    await citoyen.save();
    res.status(201).json(citoyen);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.login = async (req, res) => {
    try {
      let citoyenData = req.body;
  
      let citoyen = await Citoyen.findOne({ email: citoyenData.email });
  
      if (!citoyen) {
        res.status(401).send('Invalid Email');
      } else if (!citoyen.account_state) {
        res.status(404).send('Compte blocké');
      } else {
        const validPassword = bcrypt.compareSync(citoyenData.password, citoyen.password);
        if (!validPassword) {
          res.status(401).send('Invalid Password');
        } else {
          let payload = { subject: citoyen };
          let token = jwt.sign(payload, 'secretKey');
          res.status(200).send({ token });
        }
      }
    } catch (error) {
      res.status(400).send({ message: 'Erreur', error });
    }
  };

 exports.getAllCitoyens = async (req, res) => {
    try {
      const citoyens = await Citoyen.find();
      res.status(200).json(citoyens);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  exports.getCitoyenById = async (req, res) => {
    try {
      const { id } = req.params;
      const citoyen = await Citoyen.findById(id);
      if (!citoyen) {
        return res.status(404).json({ message: 'Citoyen not found' });
      }
      res.status(200).json(citoyen);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };

  exports.deleteCitoyenById = async (req, res) => {
    console.log('hello')
  try {
    const { id } = req.params;
    console.log(id)
    const citoyen = await Citoyen.findByIdAndDelete(id);
    if (!citoyen) {
      return res.status(404).json({ message: 'Citoyen not found' });
    } else {
      return res.status(200).send(citoyen);
    }
  } catch (error) {
    return res.status(400).send({ message: 'Erreur', error });
  }
};




exports.updatedcitoyen = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const updatedCitoyen = await Citoyen.findByIdAndUpdate(id, data, { new: true });

    if (!updatedCitoyen) {
      return res.status(404).send({ message: 'Citoyen not found' });
    }

    const payload = { subject: updatedCitoyen };
    const token = jwt.sign(payload, 'secretKey');

    res.status(200).send({ message: 'Citoyen updated successfully', token });
  } catch (error) {
    res.status(400).send({ message: 'Error updating Citoyen', error });
  }
};


