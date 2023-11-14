const pool = require('../config/db');
const generatePDF = require('../utils/pdfGenerator');

// Controller function for handling order creation
exports.createOrder = (req, res) => {
  const { items, total } = req.body;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting db connection:', err);
      return res.status(500).send('Database connection error');
    }

    // Initiating a database transaction
    connection.beginTransaction(err => {
      if (err) {
        connection.release();
        console.error('Error starting transaction:', err);
        return res.status(500).send('Transaction error');
      }

      // Inserting order total into the 'Orders' table
      connection.query('INSERT INTO Orders (total_price) VALUES (?)', [total], (err, orderResult) => {
        if (err) {
          return connection.rollback(() => {
            connection.release();
            console.error('Error inserting order:', err);
            res.status(500).send('Error processing order');
          });
        }

        const orderId = orderResult.insertId;
        let pendingOperations = items.length;

        // Iterating through each item to insert details and update inventory
        items.forEach(item => {
          connection.query(
            'INSERT INTO OrderDetails (order_id, product_id, quantity, name) VALUES (?, ?, ?, ?)',
            [orderId, item.id, item.quantity, item.name],
            err => {
              if (err) {
                return connection.rollback(() => {
                  connection.release();
                  console.error('Error inserting order details:', err);
                  res.status(500).send('Error processing order details');
                });
              }

              // Updating the inventory in the 'Products' table
              connection.query(
                'UPDATE Products SET inventory = inventory - ? WHERE id = ?',
                [item.quantity, item.id],
                err => {
                  if (err) {
                    return connection.rollback(() => {
                      connection.release();
                      console.error('Error updating inventory:', err);
                      res.status(500).send('Error updating inventory');
                    });
                  }

                  if (--pendingOperations === 0) {
                    // Committing the transaction after all operations are successful
                    connection.commit(err => {
                      if (err) {
                        return connection.rollback(() => {
                          connection.release();
                          console.error('Error during commit:', err);
                          res.status(500).send('Error during transaction commit');
                        });
                      }

                      // Initiating PDF generation
                      try {
                        generatePDF(orderId, total, items, res);
                      } catch (pdfError) {
                        console.error('Error generating PDF:', pdfError);
                        res.status(500).send('Error generating PDF');
                      }
                      connection.release();
                    });
                  }
                }
              );
            }
          );
        });
      });
    });
  });
};

// Exporting the controller function
module.exports = exports;
