/* ========================================
   PAYMENT GATEWAY REDIRECT SCRIPT
   ======================================== */

/**
 * Handles secure redirection to payment gateway
 * No financial data is stored on our servers
 * All transactions are processed through certified payment providers
 */

class PaymentGateway {
  constructor() {
    // Replace with your actual payment gateway URL
    this.gatewayURL = "https://payment-gateway.example.com/checkout";
    
    // Payment gateway configuration
    this.config = {
      merchantId: "NIBM_DSC_MERCHANT_ID",
      currency: "LKR",
      returnURL: window.location.origin + "/payment-confirmation.html",
      cancelURL: window.location.origin + "/join.html",
      notifyURL: "https://your-backend.example.com/payment-notify"
    };
  }

  /**
   * Initiate payment transaction
   * @param {Object} paymentData - Payment details
   */
  initiatePayment(paymentData) {
    try {
      // Validate payment data
      if (!this.validatePaymentData(paymentData)) {
        throw new Error("Invalid payment data");
      }

      // Create secure form for submission
      const form = this.createPaymentForm(paymentData);
      
      // Submit to payment gateway
      form.submit();
    } catch (error) {
      this.handlePaymentError(error);
    }
  }

  /**
   * Validate payment data before submission
   */
  validatePaymentData(data) {
    const required = ["email", "amount", "type"];
    
    for (const field of required) {
      if (!data[field]) {
        return false;
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return false;
    }

    // Validate amount is positive number
    if (isNaN(data.amount) || data.amount <= 0) {
      return false;
    }

    return true;
  }

  /**
   * Create secure form for payment gateway
   */
  createPaymentForm(paymentData) {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = this.gatewayURL;

    // Add merchant configuration
    this.addFormField(form, "merchant_id", this.config.merchantId);
    this.addFormField(form, "currency", this.config.currency);
    this.addFormField(form, "return_url", this.config.returnURL);
    this.addFormField(form, "cancel_url", this.config.cancelURL);
    this.addFormField(form, "notify_url", this.config.notifyURL);

    // Add payment details
    this.addFormField(form, "customer_email", paymentData.email);
    this.addFormField(form, "customer_name", paymentData.fullName || paymentData.name);
    this.addFormField(form, "customer_phone", paymentData.phone);
    this.addFormField(form, "amount", paymentData.amount);
    this.addFormField(form, "payment_type", paymentData.type);

    // Add order details
    if (paymentData.membershipType) {
      this.addFormField(form, "order_description", `${paymentData.membershipType} Membership - DSC`);
      this.addFormField(form, "order_id", this.generateOrderId(paymentData));
    }

    // Add reference info
    if (paymentData.studentId) {
      this.addFormField(form, "student_id", paymentData.studentId);
    }

    if (paymentData.event) {
      this.addFormField(form, "event_id", paymentData.event);
    }

    // Add to body (hidden)
    form.style.display = "none";
    document.body.appendChild(form);

    return form;
  }

  /**
   * Add hidden form field
   */
  addFormField(form, name, value) {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = value;
    form.appendChild(input);
  }

  /**
   * Generate unique order ID
   */
  generateOrderId(paymentData) {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    const type = paymentData.type === "membership" ? "MEM" : "EVT";
    return `DSC-${type}-${timestamp}-${random}`;
  }

  /**
   * Handle payment errors
   */
  handlePaymentError(error) {
    console.error("Payment Error:", error);
    
    const message = "Payment initialization failed. Please try again.";
    if (typeof DCSFunctions !== "undefined") {
      DCSFunctions.showNotification(message, "error", 5000);
    } else {
      alert(message);
    }
  }

  /**
   * Verify payment response from gateway
   */
  static verifyPaymentResponse(responseData) {
    // This would typically be done on backend for security
    // Only shown for reference here
    const requiredFields = ["transaction_id", "status", "amount"];
    
    for (const field of requiredFields) {
      if (!responseData[field]) {
        return false;
      }
    }

    return responseData.status === "success" || responseData.status === "completed";
  }

  /**
   * Generate payment confirmation reference
   */
  static generateConfirmationRef() {
    const date = new Date().toISOString().split("T")[0].replace(/-/g, "");
    const random = Math.random().toString(36).substring(2, 10).toUpperCase();
    return `CONF-${date}-${random}`;
  }
}

/**
 * Payment Handler - Entry point for payment processing
 */
const PaymentHandler = {
  /**
   * Process membership payment
   */
  processMembershipPayment: function (paymentData) {
    const gateway = new PaymentGateway();
    gateway.initiatePayment(paymentData);
  },

  /**
   * Process event registration payment
   */
  processEventPayment: function (paymentData) {
    const gateway = new PaymentGateway();
    paymentData.type = "event";
    gateway.initiatePayment(paymentData);
  },

  /**
   * Handle payment confirmation
   */
  handlePaymentConfirmation: function (queryParams) {
    const params = new URLSearchParams(queryParams);
    const status = params.get("status");
    const transactionId = params.get("transaction_id");

    if (status === "success" || status === "completed") {
      return {
        success: true,
        transactionId: transactionId,
        confirmationRef: PaymentGateway.generateConfirmationRef(),
        message: "Payment successful! Your membership has been activated."
      };
    } else {
      return {
        success: false,
        transactionId: transactionId,
        message: "Payment failed. Please contact support."
      };
    }
  },

  /**
   * Get payment status
   */
  getPaymentStatus: function (transactionId) {
    // This would call backend API to verify transaction status
    // For now, return mock data structure
    return {
      transactionId: transactionId,
      status: "pending", // pending, processing, completed, failed
      amount: 0,
      currency: "LKR",
      timestamp: new Date().toISOString()
    };
  },

  /**
   * Cancel payment and redirect
   */
  cancelPayment: function () {
    if (typeof DCSFunctions !== "undefined") {
      DCSFunctions.showNotification("Payment cancelled. Please try again.", "warning");
    }
    window.location.href = "/join.html";
  }
};

/**
 * Initialize payment system when DOM is ready
 */
document.addEventListener("DOMContentLoaded", function () {
  // Check if on payment confirmation page
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("status")) {
    const confirmation = PaymentHandler.handlePaymentConfirmation(window.location.search);
    if (confirmation.success) {
      sessionStorage.setItem("paymentConfirmation", JSON.stringify(confirmation));
      // Display success message
      if (typeof DCSFunctions !== "undefined") {
        DCSFunctions.showNotification(confirmation.message, "success", 5000);
      }
    } else {
      if (typeof DCSFunctions !== "undefined") {
        DCSFunctions.showNotification(confirmation.message, "error", 5000);
      }
    }
  }
});

// Export for use in other scripts
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    PaymentGateway,
    PaymentHandler
  };
}

// Make available globally
window.PaymentHandler = PaymentHandler;
window.PaymentGateway = PaymentGateway;
