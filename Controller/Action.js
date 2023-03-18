const  {
    Hospital,
    Receiver,
    Request
  } = require('../Model/UserModel');

  const GetSample = async (req,res) =>{

    const hospitals = await Hospital.find({});
    let sample   = [];
    hospitals.forEach((hospital)=>{
        sample.push(hospital.bloodSamples);
    })
    return res.json(sample)
  }

  const AddBlood = async (req,res) =>{

    try {
        const hospital = await Hospital.findById(req.params.id);
        if (!hospital) {
          return res.status(401).json({ message: 'Invalid hospital' });
        }
    
        // Extract blood sample information from the request body
        const { bloodGroup, quantity } = req.body;
    
        // Add the blood sample information to the hospital's bloodSamples array
        hospital.bloodSamples.push({ bloodGroup, quantity });
        await hospital.save();
       const new_hospital = await Hospital.findById(req.params.id);
        return res.status(201).json({new_hospital, message: 'Blood sample added successfully' });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
      }

  }
  const UpdateBlood = async (req,res) =>{
    
     const {hospitalId, bloodGroup, quantity} = req.body;
    try {
        const hospital = await Hospital.findById(hospitalId);
        if (!hospital) {
          return res.status(404).send({ message: 'Hospital not found' });
        }
    
        const bloodId = req.params.id;
        
    
        // Find the blood sample to update
        const bloodSample = hospital.bloodSamples.id(bloodId);
        if (!bloodSample) {
          return res.status(404).send({ message: 'Blood sample not found' });
        }
    
        // Update the blood sample
        bloodSample.bloodGroup = bloodGroup;
        bloodSample.quantity = quantity;
    
        // Save the updated hospital
        await hospital.save();
        const update_hospital = await Hospital.findById(hospitalId);
        res.send({update_hospital, message: 'Blood sample updated successfully' });
      } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Internal server error' });
      }

  }

  const RemoveBloodSample = async (req,res) =>{

    const { hospitalId } = req.body;
  
  try {
    // Find the hospital by ID
    const hospital = await Hospital.findById(hospitalId);

    // Check if the hospital exists
    if (!hospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }

    // Find the blood sample by ID in the hospital's blood samples array
    const bloodSample = hospital.bloodSamples.find(bs => bs._id.equals(req.params.id));

    // Check if the blood sample exists
    if (!bloodSample) {
      return res.status(404).json({ message: 'Blood sample not found' });
    }

    // Remove the blood sample from the hospital's blood samples array
    hospital.bloodSamples.pull(req.params.id);

    // Save the updated hospital document
    await hospital.save();

    // Return a success message
    res.json({ message: 'Blood sample deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }

  }

  const BloodInfo = async (req,res) => {

    const hospitalId = req.params.id;

    try {
      const hospital = await Hospital.findById(hospitalId);
      if (!hospital) {
        return res.status(404).json({ message: 'Hospital not found' });
      }
  
      const bloodSamples = hospital.bloodSamples;
      return res.json({ bloodSamples });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  }
  const RequestBlood = async (req,res) =>{

    try {
        const { receiverId, bloodGroup,quantity } = req.body;
    
        // Check if receiver exists
        const receiver = await Receiver.findById(receiverId);
        if (!receiver) {
          return res.status(404).json({ error: 'Receiver not found' });
        }
    
        // Check if receiver is eligible to request blood
        // if (!receiver.isEligible) {
        //   return res.status(403).json({ error: 'Receiver is not eligible to request blood' });
        // }
    
        // Check if requested blood group exists in any hospital
        const hospitals = await Hospital.find({ 'bloodSamples.bloodGroup': bloodGroup });
        if (hospitals.length === 0) {
          return res.status(404).json({ error: `No hospitals found with blood group ${bloodGroup}` });
        }
    
        // Create a new request object
        const newRequest = new Request({
          receiver: receiverId,
          hospital: hospitals[0]._id,
          bloodGroup,
          quantity
        });
    
        // Save the request object to the database
        const savedRequest = await newRequest.save();
    
        // Return the saved request object
        return res.json(savedRequest);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
      }

  }
  const RequestReceiver = async(req,res) =>{

   
  const {hospitalId,bloodGroup} = req.body;

  try {
    // Find all requests from the specified hospital with the specified blood group
    const requests = await Request.find({
      hospital: hospitalId,
      bloodGroup
    }).populate('receiver', 'name email phoneNumber bloodGroup');

    res.status(200).json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }

  }

  module.exports = {GetSample,AddBlood,UpdateBlood,RemoveBloodSample,BloodInfo,RequestBlood,RequestReceiver};
  