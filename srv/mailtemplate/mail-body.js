const mailbody = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Invoice Information</title>
<style>
  body {
    font-family: Arial, sans-serif;
    background-color: #f5f5f5;
    color: #333;
    padding: 20px;
  }
  .email-container {
    max-width: 600px;
    margin: 0 auto;
    background-color: #ffffff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  .header {
    text-align: center;
    padding-bottom: 20px;
    border-bottom: 1px solid #ddd;
  }
  .header h1 {
    color: #007BFF;
  }
  .invoice-details {
    margin: 20px 0;
  }
  .details-table {
    width: 100%;
    border-collapse: collapse;
  }
  .details-table th, .details-table td {
    text-align: left;
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }
  .details-table th {
    background-color: #f0f0f0;
    color: #333;
  }
  .item-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  .item-table th, .item-table td {
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }
  .item-table th {
    background-color: #007BFF;
    color: #fff;
  }
  .total {
    text-align: right;
    padding: 10px 0;
  }
  .footer {
    text-align: center;
    padding: 20px 0;
    color: #777;
  }
  .btn {
    display: inline-block;
    padding: 10px 20px;
    background-color: #007BFF;
    color: #fff;
    text-decoration: none;
    border-radius: 5px;
    margin-top: 20px;
  }
</style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>Invoice Details</h1>
      <p>Thank you for your business!</p>
    </div>

    <div class="invoice-details">
      <table class="details-table">
        <tr>
          <th>Invoice Number:</th>
          <td>#INV-12345</td>
        </tr>
        <tr>
          <th>Invoice Date:</th>
          <td>November 9, 2024</td>
        </tr>
        <tr>
          <th>Due Date:</th>
          <td>November 30, 2024</td>
        </tr>
        <tr>
          <th>Billing To:</th>
          <td>John Doe<br>123 Main St.<br>City, State, ZIP</td>
        </tr>
      </table>
    </div>

    <div class="item-summary">
      <h2>Summary</h2>
      <table class="item-table">
        <tr>
          <th>Item</th>
          <th>Description</th>
          <th>Quantity</th>
          <th>Unit Price</th>
          <th>Total</th>
        </tr>
        <tr>
          <td>Product A</td>
          <td>Software License</td>
          <td>1</td>
          <td>$200.00</td>
          <td>$200.00</td>
        </tr>
        <tr>
          <td>Service B</td>
          <td>Installation Service</td>
          <td>2</td>
          <td>$150.00</td>
          <td>$300.00</td>
        </tr>
        <tr>
          <th colspan="4" style="text-align: right;">Subtotal:</th>
          <td>$500.00</td>
        </tr>
        <tr>
          <th colspan="4" style="text-align: right;">Tax (10%):</th>
          <td>$50.00</td>
        </tr>
        <tr>
          <th colspan="4" style="text-align: right;">Total:</th>
          <td><strong>$550.00</strong></td>
        </tr>
      </table>
    </div>

    <div class="total">
      <p><strong>Amount Due: $550.00</strong></p>
      <a href="#" class="btn">Pay Now</a>
    </div>

    <div class="footer">
      <p>If you have any questions about this invoice, please contact us at support@example.com.</p>
      <p>Thank you for your business!</p>
    </div>
  </div>
</body>
</html>`;

module.exports = {
  mailbody
}