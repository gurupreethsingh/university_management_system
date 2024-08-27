const mongoose = require("mongoose");

const feeModuleSchema = new mongoose.Schema(
  {
    moduleName: {
      type: String,
      required: true,
    },
    fees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Fee", // Assuming you have a Fee model
      },
    ],
    description: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const FeeModule = mongoose.model("FeeModule", feeModuleSchema);

module.exports = FeeModule;
