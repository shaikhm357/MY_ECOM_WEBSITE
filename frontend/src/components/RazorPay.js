import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';

import { useSelector } from "react-redux";

const RazorpayCheckout = () => {
  const { id } = useParams();
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  // console.log('orderId=======>',id);

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const payNow = async () => {
    try {
      // Check if order is loaded
      if (!order || loading) {
        console.log("Order not loaded yet");
        return;
      }

      // Create order by calling your server endpoint
      const response = await fetch("/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: order.totalPrice,
          currency: "INR",
          receipt: "receipt#1",
          notes: {},
        }),
      });

      const orderData = await response.json();

      // Open Razorpay Checkout
      const options = {
        key: 'rzp_test_u5ymIfaKlEtUF1', // Replace with your Razorpay key_id
        amount: orderData.amount, // Amount is in currency subunits (paise)
        currency: orderData.currency,
        name: "My Ecom",
        description: "Test Transaction",
        order_id: orderData.id, // Order ID created in the backend
        // callback_url: "http://localhost:3000/profile", // Your success URL
        prefill: {
          name: "Mahboob Shaikh",
          email: "mahboob.shaikh@gmail.com",
          contact: "9999999999",
        },
        theme: {
          color: "#F37254",
        },
        handler: function (response) {
          fetch("/verify-payment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              produtOrderId : id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data,"dtaaaaaaaaaaaaaaaaaaaa")
              if (data.status === "ok") {
                // window.location.href = "/profile";
                window.location.reload();
              } else {
                alert("Payment verification failed");
              }
            })
            .catch((err) => {
              console.log("Error", err);
              alert("Error verifying payment");
            });
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Error processing payment");
    }
  };

  return (
    <div className="razorpay-checkout">
      {/* <h1>Razorpay Payment Gateway Integration</h1> */}
      <div className="payment-form">
        {loading ? (
          <p>Loading order details...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <>
            {/* <div className="order-summary">
              <h2>Order Summary</h2>
              <p>Total Amount: ₹{order?.totalPrice}</p>
            </div> */}
            {/* <button type="button" onClick={payNow} className="pay-button">
              Pay Now
            </button> */}
            <button
              type="button"
              onClick={payNow}
              style={{
                backgroundColor: "#528FF0",
                color: "white",
                fontWeight: "600",
                padding: "12px 24px",
                borderRadius: "6px",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                transition: "background-color 0.3s",
                border: "none",
                fontSize: "16px",
                cursor: "pointer",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#3A7BE0")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#528FF0")
              }
            >
              {/* Razorpay Logo */}
              <svg
                style={{
                  width: "20px",
                  height: "20px",
                  marginRight: "8px",
                  fill: "white",
                }}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8.80696 17.0728H0.959229L10.2044 1.38919H18.0522L8.80696 17.0728ZM18.9654 17.0728C21.5063 17.0728 23.5641 15.0438 23.5641 12.5388C23.5641 10.0338 21.5063 8.00483 18.9654 8.00483C16.4246 8.00483 14.3668 10.0338 14.3668 12.5388C14.3668 15.0438 16.4246 17.0728 18.9654 17.0728Z" />
              </svg>
              {/* Lock Icon */}
              <svg
                style={{
                  width: "16px",
                  height: "16px",
                  marginRight: "8px",
                }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                ></path>
              </svg>
              Pay Now
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default RazorpayCheckout;