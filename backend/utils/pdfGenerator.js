// pdfGenerator.js
const PDFDocument = require('pdfkit');

const generatePDF = (orderId, total, items, res) => {
  try {
    const doc = new PDFDocument();
    let buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      let pdfData = Buffer.concat(buffers);
      res.writeHead(200, {
        'Content-Length': Buffer.byteLength(pdfData),
        'Content-Type': 'application/pdf',
        'Content-disposition': `attachment;filename=Order_${orderId}.pdf`,
      }).end(pdfData);
    });

    // PDF content
    doc.fontSize(25).text('Order Details', { underline: true });
    doc.text(`\nOrder ID: ${orderId}`);
    doc.text(`Total Price: ${total}€`);
    doc.text('Products:');
    items.forEach(item => {
      doc.text(`- ${item.name}: ${item.price}€ x ${item.quantity}`);
    });
    doc.text(`\nOrder Date: ${new Date().toLocaleString()}`);
    doc.end();
  } catch (pdfError) {
    throw pdfError;
  }
};

module.exports = generatePDF;
