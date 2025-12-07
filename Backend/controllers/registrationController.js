import Registration from "../models/Registration.js";

export const registerStudent = async (req, res) => {
  try {
    const data = req.body;

    const newReg = await Registration.create(data);

    return res.status(201).json({
      success: true,
      message: "Registration successful!",
      data: newReg,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
