Wolt.GetDeliveryFee

Use this API to calculate the delivery fee based on the order information.

How to use:

1.  Download and extract WoltDFC.zip.
2.  Open Visual Studio and start a new terminal
3.  In the terminal, go to the root folder (WoltDFC) by typing: cd [location path of the extracted WoltDFC folder]
4.  In the terminal, install the required modules by typing: npm install
5.  In the terminal, start the server by typing: npm run dev
6.  Open Postman and call the Wolt.GetDeliveryFee api as following

Test URL: http://localhost:3001/wolt/getDeliveryFee

Method: POST

Request body: Include the following paramters in the request body as JSON string.

    | cart_value       | integer | min: 1 | Value of the shopping cart in cents.                             |
    | delivery_distance| integer | min: 1 | The distance between the store and customer’s location in meters.|
    | number_of_items  | integer | min: 1 | The number of items in the customer's shopping cart.             |
    | time	           | string  |        | Order time in ISO format date                                    |

    Example:

    {
    "cart_value": 790,
    "delivery_distance": 2235,
    "number_of_items": 4,
    "time": "2021-10-12T13:00:00Z"
    }
