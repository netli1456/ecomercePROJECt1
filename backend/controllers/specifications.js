import Specification from '../models/Specifications';

export const specifications = async (req, res) => {
  try {
    const specification = new Specification(req.body);
    await specification.save();
    res.status(200).jsone(specification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
