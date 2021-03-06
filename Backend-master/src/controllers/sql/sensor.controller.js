const sensorModel = require("../../models/sql/sensor.model");

const crudSensor = {
  //Create

  addSensor(req, res, next) {
    try {
      sensorModel.addSensor(req.body, (err, data) => {
        if (err) {
          next(err);
          return;
        }
        res.status(200).json({
          success: true,
          data: data
        });
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        err: error
      });
    }
  },
  getAll(req, res, next) {
    //Read
    try {
      sensorModel.getAll((err, data) => {
        if (err) {
          next(err);
          return;
        }
        res.status(200).json({
          success: true,
          data: data
        });
      });
    } catch (err) {
      next(err);
    }
  }, //This can be used to know information about the sensor(state,stock,other information)
  getByID(req, res, next) {
    //Read By ID
    try {
      sensorModel.getByID(req.params.id, (err, data) => {
        if (err) {
          next(err);
          return;
        }
        res.status(200).json({
          success: true,
          data: data
        });
      });
    } catch (err) {
      next(err);
    }
  },
  getByCategory(req, res, next) {
    try {
      sensorModel.getByCategory(req.params.idCategory, (err, data) => {
        if (err) {
          next(err);
          return;
        }
        res.status(200).json({
          success: true,
          data: data
        });
      });
    } catch (err) {
      next(err);
    }
  },
  // Get score by user
  getScoreBySensor(req, res, next) {
    try {
      sensorModel.getScoreBySensor(req.params, (error, data) => {
        if (error) {
          next(error);
          return;
        }
        res.json({
          success: true,
          data: data
        })
      })
    } catch (err) {
      next(err);
      return;
    }
  },
  // Get average by sensor id
  getAverageBySensor(req, res, next) {
    try {
      sensorModel.getAverageBySensor(req.params, (error, data) => {
        if (error) {
          next(error);
          return;
        }
        res.json({
          success: true,
          data: data
        })
      })
    } catch (err) {
      next(err);
      return;
    }
  },
  //add score 
  addScore(req, res, next) {
    try {
        sensorModel.addScore(req.params, req.body, (err, data) => {
            if (err) {
                next(err);
                return;
            }

            res.json({
                success: true,
                data: data
            })
        })
    } catch (error) {
        next(error);
        return;
    }
  },
  getSensorHouse(req, res, next) {
    try {
      sensorModel.getSensorHouse(req.params.idHouse, (err, data) => {
        if (err) {
          next(err);
          return;
        }
        res.status(200).json({
          success: true,
          data: data
        });
      });
    } catch (err) {
      next(err);
    }
  },
  //Update sensor information
  updateByID(req, res, next) {
    try {
      sensorModel.updateByID(req.params.id, req.body, (err, data) => {
        if (err) {
          next(err);
          return;
        }
        res.status(200).json({
          success: true,
          data: data
        });
      });
    } catch (err) {
      next(err);
    }
  }, //Update sensor stock for when there is an order the stock update automatically
  updateSensorStock(req, res, next) {
    try {
      sensorModel.updateSensorStock(req.body, (err, data) => {
        if (err) {
          next(err);
          return;
        }
        res.status(200).json({
          success: true,
          data: data
        });
      });
    } catch (err) {
      next(err);
    }
  }, //Mudar o sensor no espaço para ativo ou desativo
  updateSensorState(req, res, next) {
    try {
      sensorModel.updateSensorState(
        req.params.idSensor,
        req.params.idSpace,
        (err, data) => {
          if (err) {
            next(err);
            return;
          }
          res.status(200).json({
            success: true,
            data: data
          });
        }
      );
    } catch (err) {
      next(err);
    }
  },
  deleteByID(req, res, next) {
    try {
      sensorModel.deleteByID(req.params.id, (err, data) => {
        if (err) {
          next(err);
          return;
        }
        res.status(200).json({
          success: true,
          data: data
        });
      });
    } catch (err) {
      next(err);
    }
  },
  sensorSpace(req, res, next) {
    try {
      sensorModel.sensorSpace(
        req.query.idSensor,
        req.query.idSpace,
        (err, data) => {
          if (err) {
            next(err);
            return;
          }
          res.status(200).json({
            success: true,
            data: data
          });
        }
      );
    } catch (err) {
      next(err);
    }
  },
  getSensorSpace(req, res, next) {
    try {
      sensorModel.getSensorsInSpace(req.params.idSpace, (err, data) => {
        if (err) {
          next(err);
          return;
        }
        res.status(200).json({
          success: true,
          data: data
        });
      });
    } catch (err) {
      next(err);
    }
  },
  sensorSpace(req, res, next) {
    try {
      sensorModel.sensorSpace(
        req.query.idSensor,
        req.query.idSpace,
        (err, data) => {
          res.status(200).json({
            success: true,
            data: data
          });
        },
        next
      );
      console.log("QUERY:", req.query);
    } catch (err) {
      next(err);
    }
  },
  getSensorSpace(req, res, next) {
    try {
      sensorModel.getSensorsInSpace(
        req.params.idSpace,
        (err, data) => {
          res.status(200).json({
            success: true,
            data: data
          });
        },
        next
      );
    } catch (err) {
      next(err);
    }
  },
  sensorSpace(req, res, next) {
    try {
      sensorModel.sensorSpace(
        req.query.idSensor,
        req.query.idSpace,
        (err, data) => {
          res.status(200).json({
            success: true,
            data: data
          });
        },
        next
      );
      console.log("QUERY:", req.query);
    } catch (err) {
      next(err);
    }
  },
  getSensorSpace(req, res, next) {
    try {
      sensorModel.getSensorsInSpace(
        req.params.idSpace,
        (err, data) => {
          res.status(200).json({
            success: true,
            data: data
          });
        },
        next
      );
    } catch (err) {
      next(err);
    }
  },
  removeSensorSpace(req, res, next) {
    try {
      console.log(req.query);
      sensorModel.removeSensorSpace(
        req.query.idSensor,
        req.params.idSpace,
        (err, data) => {
          res.status(200).json({
            success: true,
            data: data
          });
        },
        next
      );
    } catch (err) {
      next(err);
    }
  }
};

module.exports = crudSensor;