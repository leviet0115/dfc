const getDeliveryFee = (order) => {
  //The delivery is free (0€) when the cart value is equal or more than 100€.
  if (order.cart_value >= 10000) return 0;

  // A delivery fee for the first 1000 meters (=1km) is 2€.
  let basicFee = 200;
  let dCharge = getDistanceCharge(order.delivery_distance);
  let cCharge = getCartCharge(order.cart_value);
  let iCharge = getitemCharge(order.numbers_of_items);

  let deliveryFee = basicFee + dCharge + cCharge + iCharge;

  // During the Friday rush (3 - 7 PM UTC), the delivery fee (the total fee including possible surcharges) will be multiplied by 1.1x.
  if (isRushHour(order.time)) {
    deliveryFee = deliveryFee * 1.1;
  }

  console.log({
    order: order,
    deliveryFee: {
      sum: deliveryFee,
      basic: basicFee,
      surcharge: {
        distance: dCharge,
        cart: cCharge,
        item: iCharge,
        rushHour: isRushHour(order.time),
      },
    },
  });

  //The delivery fee can never be more than 15€, including possible surcharges.
  if (deliveryFee >= 1500) {
    return 1500;
  }

  return deliveryFee;
};

//If the cart value is less than 10€, the surcharge is the difference between the cart value and 10€.
const getCartCharge = (cart) => {
  if (cart < 1000) return 1000 - cart;
  return 0;
};

//If the delivery distance is longer than 1km, 1€ is added for every additional 500 meters that the courier needs to travel before reaching the destination. Even if the distance would be shorter than 500 meters, the minimum fee is always 1€.
const getDistanceCharge = (distance) => {
  if (distance > 1000) return Math.ceil((distance - 1000) / 500) * 100;
  return 0;
};

//If the number of items is five or more, an additional 50 cent surcharge is added for each item above four
const getitemCharge = (items) => {
  if (items >= 5) return (5 - items) * 50;
  return 0;
};

const isRushHour = (timeString) => {
  let date = new Date(timeString);
  if (date.getDay() === 0) {
    let hours = date.getHours();
    if (hours >= 3 && hours <= 5) {
      return true;
    }
  }
  return false;
};

module.exports.getDeliveryFee = getDeliveryFee;
