import { Prescription } from '../models/prescription.model.js';

export const createPrescription = async (req, res) => {
  try {
    const prescription = new Prescription({
      ...req.body,
      doctorId: req.user.id
    });
    await prescription.save();
    res.status(201).json(prescription);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find()
      .populate('patientId', 'name')
      .populate('doctorId', 'name');
    res.json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};