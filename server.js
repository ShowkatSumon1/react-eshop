require("dotenv").config();
const express = require("express");
const cors = require("cors");
// This is your test secret API key.
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the shop");
});

const amount = [];
const calculateOrderAmount = (items) => {
  items.map((item) => {
    const { price, cartQuantity } = item;
    const itemAmount = price * cartQuantity;
    return amount.push(itemAmount);
  });
  const totalAmount = amount.reduce((a, b) => {
    return a + b;
  }, 0);
  return totalAmount * 100;
};

app.post("/create-payment-intent", async (req, res) => {
  const { items, shipping, description } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
    description,
    shipping: {
      address: {
        line1: shipping.line1,
        line2: shipping.line2,
        city: shipping.city,
        country: shipping.country,
        postal_code: shipping.postal_code,
      },
      name: shipping.name,
      phone: shipping.phone,
    },
    // receipt_email: customerEmail, /// jodi email a confirm email pathate chai. Eta age distructure kore nite hobe.
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log(`Node server listening on port ${PORT}!`));