const Footballer = require('../models/Footballer'); 
const addFootballer = async (req, res) => {
    const { name, position, club, age } = req.body;
    
    if (!name || !position || !club || !age) {
      return res.status(400).json({ msg: 'All fields are required (name, position, club, age)' });
    }
  
    try {
      const footballer = new Footballer({ name, position, club, age });
      await footballer.save(); // Save to database
  
      res.status(201).json({ msg: 'Footballer added successfully', footballer });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };


  const updateFootballer = async (req, res) => {
    const { id } = req.params; 
    const { name, position, club, age } = req.body; 
  
    try {
      const footballer = await Footballer.findByIdAndUpdate(
        id,
        { name, position, club, age },
        { new: true, runValidators: true } 
      );
  
      if (!footballer) {
        return res.status(404).json({ msg: 'Footballer not found' }); 
      }
  
      res.status(200).json({ msg: 'Footballer updated successfully', footballer });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };

  const getAllFootballers = async (req, res) => {
    console.log(getAllFootballers);
    try {
      const footballers = await Footballer.find();
      res.status(200).json(footballers);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };

  
  const getFootballerById = async (req, res) => {
    const { id } = req.params; // Extract ID from the request URL
  
    try {
      const footballer = await Footballer.findById(id); // Find the footballer by ID
  
      if (!footballer) {
        return res.status(404).json({ msg: 'Footballer not found' }); // Return 404 if not found
      }
  
      res.status(200).json(footballer); 
    } catch (err) {
      console.error(err.message);
     
      if (err.kind === 'ObjectId') {
        return res.status(400).json({ msg: 'Invalid ID format' });
      }
  
      res.status(500).send('Server Error'); // Handle other server errors
    }
  };

   module.exports = {addFootballer, updateFootballer, getAllFootballers, getFootballerById};