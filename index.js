const express = require("express");
const { getDeliveryFee } = require("./calculator");
const { body, validationResult } = require("express-validator");
const app = express();

//middle ware for validating request body
app.use(express.json());

//middle ware for catching json syntax error
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    console.error(err);
    return res.status(400).send({ status: 400, message: err.message });
  }
  next();
});

const apiParams = [
  "cart_value",
  "delivery_distance",
  "number_of_items",
  "time",
];

const errorMsg = [
  "Some parameter is missing.",
  "The value should be an integer larger than 0.",
  "The value should be a valid date written as an ISO format string. Only separtor T is allowed",
];

app.post(
  "/wolt/getDeliveryFee",
  body(apiParams, errorMsg[0]).exists(),
  body(apiParams.slice(0, 3), errorMsg[1]).isInt({ min: 1 }),
  body(apiParams[3], errorMsg[2]).isISO8601({
    strict: true,
    strictSeparator: true,
  }),
  (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    const order = request.body;
    response.json({
      deliveryFee: getDeliveryFee(order),
    });
  }
);

const PORT = 3001;
app.listen(PORT, console.log(`The server is running on port ${PORT}`));
