const Teachers = require("../models/Teachers");

const authAdmin = async (req, res, next) => {
  try {
    const teacher = await Teachers.findOne({ _id: req.teacher.id });
    if (teacher.role !== 1)
      return res.status(500).json({ msg: "Admin resources access denied" });

    next();
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = authAdmin;
