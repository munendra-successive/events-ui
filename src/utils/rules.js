const edit = {
  eventName: [
    {
      required: true,
      message: "Please enter the event name!",
    },
    {
      max: 50,
      message: "Event name must not exceed 50 characters!",
    },
  ],
  street: [
    {
      required: true,
      message: "Please enter the street name!",
    },
    {
      max: 20,
      message: "Street name must not exceed 20 characters!",
    },
  ],
  city: [
    {
      required: true,
      message: "Please enter the city name!",
    },
    {
      max: 20,
      message: "City name must not exceed 20 characters!",
    },
  ],
  state: [
    {
      required: true,
      message: "Please enter the state name!",
    },
    {
      max: 20,
      message: "State name must not exceed 20 characters!",
    },
  ],
  postalCode: [
    {
      required: true,
      message: "Please enter the Postal Code",
    },
    {
      max: 10,
      type: Number,
      message: "Postal Code must not exceed 10 characters!",
    },
  ],
  country: [
    {
      required: true,
      message: "Please enter the Country name!",
    },
    {
      max: 20,
      message: "Country name must not exceed 20 characters!",
    },
  ],
  description: [
    {
      required: true,
      message: "Please enter the Description!",
    },
    {
      max: 100,
      min: 20,
      message: "Description must be between 20-100 characters",
    },
  ],
  startDate: [
    {
      required: true,
      message: "Please select the start date!",
    },
  ],
  endDate: [
    {
      required: true,
      message: "Please select the end date!",
    },
  ],
  category: [
    {
      required: true,
      message: "Please enter the category!",
    },
    {
      max: 20,
      message: "Category must not exceed 20 characters!",
    },
  ],
  organizerInfo: [
    {
      required: true,
      message: "Please enter the  organizer info",
    },
    {
      max: 20,
      message: "Organizer info must not exceed 20 characters!",
    },
  ],
  type: [
    {
      required: true,
      message: "Please enter the event type!",
    },
    {
      max: 50,
      message: "Event type must not exceed 50 characters!",
    },
  ],
  status: [
    {
      required: true,
      message: "Please enter the status!",
    },
    {
      max: 50,
      message: "Status must not exceed 50 characters!",
    },
  ],
};

const register = {
  name: [
    { required: true, message: "Please input your name!" },
    {
      type: "string",
      min: 3,
      message: "Name must be at least 3 characters",
    },
  ],
  email: [
    { required: true, message: "Please enter your email!" },
    { type: "email", message: "Please enter a valid email address" },
  ],
  password: [
    { required: true, message: "Please input your password!" },
    { min: 6, message: "Password must be at least 6 characters" },
  ],
  confirmPassword: [
    { required: true, message: "Please confirm your password!" },
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || getFieldValue("password") === value) {
          return Promise.resolve();
        }
        return Promise.reject(new Error("The two passwords do not match!"));
      },
    }),
  ],
  address: [{ required: true, min: 10, message: "Please input you  address!" }],
  phone: [
    {
      required: true,
      len: 10,
      message: "Please input your phone number!",
    },
    {
      pattern: /^[0-9\b]+$/,
      message: "Please enter a valid phone number!",
    },
  ],
};

const login = {
  email: [
    { required: true, message: "Please input your password!" },
    { min: 6, message: "Password must be at least 6 characters" },
  ],
  password: [
    { required: true, message: "Please input your password!" },
    { min: 6, message: "Password must be at least 6 characters" },
  ],
};
export { edit, register, login };
