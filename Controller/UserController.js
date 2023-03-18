
const {generateToken} = require('../Config/JsonWebToken');
const  {
  Hospital,
  Receiver
} = require('../Model/UserModel');

const HospitalSignUp = async (req,res) =>{

  const { name, email, password, address, city, state } = req.body;

  try {
    // check if hospital already exists with email
    const existingHospital = await Hospital.findOne({ email });
    if (existingHospital) {
      return res.status(400).json({ message: 'Hospital already exists with this email' });
    }

    // create new hospital
    const newHospital = new Hospital({ name, email, password, address, city, state });
    await newHospital.save();

    res.status(201).json(newHospital);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
}
const HospitalLogin = async (req,res) =>{
  const { email, password } = req.body;

  try {
    // check if hospital exists with email
    const existingHospital = await Hospital.findOne({ email });
   
    if (!existingHospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }

    // check if password is correct
    
    if(password!=existingHospital.password)
    {
       return res.json({message : "invalid password"})
    }
    

    // create token for authentication
    const token = generateToken(existingHospital._id);

    res.status(200).json({ result: existingHospital, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
}
const ReceiverSignup = async (req,res) =>{
  const { name, email, password, bloodGroup } = req.body;

  try {
    // check if receiver already exists with email
    const existingReceiver = await Receiver.findOne({ email });
    if (existingReceiver) {
      return res.status(400).json({ message: 'Receiver already exists with this email' });
    }

    // create new receiver
    const newReceiver = new Receiver({ name, email, password, bloodGroup });
    await newReceiver.save();

    res.status(201).json(newReceiver);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }

}
const ReceiverLogin = async (req,res) =>{

  const { email, password } = req.body;

  try {
    // check if receiver exists with email
    const existingReceiver = await Receiver.findOne({ email });
    if (!existingReceiver) {
      return res.status(404).json({ message: 'Receiver not found' });
    }

    
    if(password!=existingReceiver.password)
    {
      return res.json({message : "ivalid password"})
    }

    // create token for authentication
    const token = generateToken(existingReceiver._id);

    res.status(200).json({ result: existingReceiver, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
}

module.exports = {HospitalSignUp,HospitalLogin,ReceiverSignup,ReceiverLogin};