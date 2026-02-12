import Doctor from "../models/Doctor.js";

// POST /doctors/profile
export const createDoctorProfile = async (req, res) => {
  try {
    const { specialization, availability } = req.body;

    if (!specialization) {
      return res.status(400).json({ message: "Specialization required" });
    }

    const exists = await Doctor.findOne({ userId: req.user.id });
    if (exists) {
      return res.status(400).json({ message: "Doctor profile already exists" });
    }

    const doctor = await Doctor.create({
      userId: req.user.id,
      specialization,
      availability: availability || [],
    });

    res.status(201).json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /doctors/availability
export const getDoctorsAvailability = async (req, res) => {
  try {
    const doctors = await Doctor.find({ isApproved: true })
      .populate("userId", "name")
      .select("specialization available availability userId");

    const response = doctors.map((d) => ({
      doctorId: d._id,
      doctorName: d.userId?.name || "Unknown",
      specialization: d.specialization,
      available: d.available,
      availability: d.availability || [],
    }));

    res.json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// PATCH /doctors/:id/approve
export const approveDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    
    doctor.isApproved = true;
    await doctor.save();
    res.json({ message: "Doctor approved", doctor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// GET /doctors/all (Admin only)
export const getAllDoctorsAdmin = async (req, res) => {
  try {
    const doctors = await Doctor.find()
      .populate("userId", "name email")
      .select("specialization available isApproved userId createdAt");

    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
