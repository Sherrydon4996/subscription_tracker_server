import mongoose, { model } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "user Name is required"],
      minLength: 2,
      maxLength: 50,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "email is required"],
      match: [/[^\s]+@[^\s]+(\.\w+)*/, "please provide a valid email address"],
      trim: true,
    },
    password: {
      type: String,
      trim: true,
      required: [true, "User password is required"],
    },
  },
  { timestamps: true }
);

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "user Name is required"],
      minLength: 2,
      maxLength: 50,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "subscription price is required"],
      min: [0, "Price must be greater tha 0"],
    },
    currency: {
      type: String,
      enum: ["USD", "KES", "GDP"],
      default: "KES",
    },
    frequency: {
      type: String,
      enum: ["daily", "monthly", "weekly", "yearly"],
    },
    category: {
      type: String,
      enum: [
        "sports",
        "news",
        "entertainment",
        "lifestyle",
        "technology",
        "finance",
        "politics",
        "other",
      ],
      required: true,
    },
    paymentMethod: {
      type: String,
      trim: true,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "cancelled", "expired"],
      default: "active",
    },
    startDate: {
      type: Date,
      required: true,
      validate: {
        validator: (value) => value <= new Date(),
        message: "Start date must be in the past",
      },
    },
    renewalDate: {
      type: Date,
      required: false,
      validate: {
        validator: function (value) {
          return value > this.startDate;
        },
        message: "renewal date must be after start date",
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },
  },
  { timestamps: true }
);

//auto-calculate renewal date if missing

subscriptionSchema.pre("save", function (next) {
  if (!this.renewalDate) {
    const renewalPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };

    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(
      this.renewalDate.getDate() + renewalPeriods[this.frequency]
    );
  }

  // Auto-update the status if renewal date passed

  if (this.renewalDate < new Date()) {
    this.status = "expired";
  }
  next();
});

export const Users = mongoose.model("User", userSchema);
const Subscriptions = mongoose.model("Subscriptions", subscriptionSchema);
export default Subscriptions;
