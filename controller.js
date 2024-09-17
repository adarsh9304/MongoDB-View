const { User } = require("./userModel.js");
const UserView = require("./userViewModel.js");


const updateContribution = async (req, res) => {
  const { userId } = req.query;
  const { contribution } = req.body;

  try {
    console.log(userId,contribution)
    const user = await User.findById(userId);
    console.log('user',user)

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const oldContribution = user.contribution;
    user.contribution = contribution;
    await user.save();

    let userView = await UserView.findOne({ email: user.email });

    if (!userView) {
      
      userView = new UserView({
        email: user.email,
        name: user.name,
        totalContribution: contribution,  
      });
    } else {
    
      userView.totalContribution = userView.totalContribution - oldContribution + contribution;
    }

    await userView.save();

    res.json({ message: 'Contribution updated successfully and UserView updated!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createUser = async (req, res) => {
  const { email, name, contribution } = req.body;

  if (!email || !name) {
    return res.status(400).json({ message: 'Email and name are required' });
  }

  try {
   
   const user=await User.create({
    email,
    name,
    contribution: contribution || 0,
   })
   console.log('dsdss', user)

    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



const getTotalContributions = async (req, res) => {
  try {
    const userViews = await UserView.find({});
    const totalContributions = userViews.reduce((acc, userView) => acc + userView.totalContribution, 0);
    
    res.json({ totalContributions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getAllUsers = async(req,res)=>{
    try {
        const users = await UserView.find();
        res.status(200).json({ message: 'User created successfully', users });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' }); 
    }
}

module.exports = {
  updateContribution,
  getTotalContributions,
  createUser,
  getAllUsers
};
