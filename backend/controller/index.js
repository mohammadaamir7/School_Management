exports.SuperAdmin = require('./super_admin/SD_controller')

exports.App = {
    PNF: (req, res) => {
      res.status(400).json({
        message: "invalid routes",
      });
    },
  };