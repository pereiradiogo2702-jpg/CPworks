export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  invoiceNumber: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  customerCity: string;
  customerPostalCode: string;
  customerCountry: string;
  items: OrderItem[];
  subtotalHT: number;
  tvaRate: number;
  tvaAmount: number;
  totalTTC: number;
  stripePaymentIntentId: string;
  status: 'paid' | 'pending';
  createdAt: string;
}

export function generateInvoiceNumber(): string {
  const orders = JSON.parse(localStorage.getItem('cpworks_orders') || '[]');
  const count = orders.length + 1;
  const year = new Date().getFullYear();
  return `CPW-${year}-${String(count).padStart(4, '0')}`;
}

export async function generateInvoicePDF(order: Order): Promise<void> {
  // Import dynamique pour éviter les erreurs SSR
  const jsPDF = (await import('jspdf')).default;

  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const pageWidth = 210;
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;

  // Couleurs
  const purple = [168, 85, 247] as [number, number, number];
  const darkGray = [30, 30, 30] as [number, number, number];
  const lightGray = [150, 150, 150] as [number, number, number];
  const white = [255, 255, 255] as [number, number, number];

  // Fond sombre
  doc.setFillColor(...darkGray);
  doc.rect(0, 0, pageWidth, 297, 'F');

  // Header background
  doc.setFillColor(30, 10, 50);
  doc.rect(0, 0, pageWidth, 50, 'F');

  // Titre CPWorks
  doc.setTextColor(...purple);
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.text('CPWorks', margin, 22);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...lightGray);
  doc.text('Spécialiste en customisation automobile', margin, 30);
  doc.text('Luxembourg', margin, 37);

  // Numéro de facture (droite)
  doc.setTextColor(...purple);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('FACTURE', pageWidth - margin, 20, { align: 'right' });
  doc.setFontSize(12);
  doc.setTextColor(...white);
  doc.text(order.invoiceNumber, pageWidth - margin, 28, { align: 'right' });
  doc.setFontSize(9);
  doc.setTextColor(...lightGray);
  doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString('fr-LU')}`, pageWidth - margin, 35, { align: 'right' });

  // Ligne séparatrice
  doc.setDrawColor(...purple);
  doc.setLineWidth(0.5);
  doc.line(margin, 55, pageWidth - margin, 55);

  // Infos client
  let y = 65;
  doc.setTextColor(...purple);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('FACTURÉ À', margin, y);

  y += 8;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...white);
  doc.setFontSize(10);
  doc.text(order.customerName, margin, y);
  y += 6;
  doc.setTextColor(...lightGray);
  doc.text(order.customerEmail, margin, y);
  y += 6;
  if (order.customerPhone) {
    doc.text(order.customerPhone, margin, y);
    y += 6;
  }
  doc.text(order.customerAddress, margin, y);
  y += 6;
  doc.text(`${order.customerPostalCode} ${order.customerCity}`, margin, y);
  y += 6;
  doc.text(order.customerCountry, margin, y);

  // Commande ID (droite)
  doc.setTextColor(...purple);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('N° COMMANDE', pageWidth - margin, 65, { align: 'right' });
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...lightGray);
  doc.text(order.id, pageWidth - margin, 73, { align: 'right' });

  // Tableau articles
  y += 15;
  doc.setFillColor(50, 20, 80);
  doc.rect(margin, y - 6, contentWidth, 10, 'F');

  doc.setTextColor(...white);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('ARTICLE', margin + 3, y);
  doc.text('QTÉ', margin + contentWidth * 0.6, y, { align: 'center' });
  doc.text('PRIX U.', margin + contentWidth * 0.77, y, { align: 'right' });
  doc.text('TOTAL', margin + contentWidth, y, { align: 'right' });

  y += 6;

  doc.setFont('helvetica', 'normal');
  order.items.forEach((item, index) => {
    if (index % 2 === 0) {
      doc.setFillColor(40, 40, 40);
      doc.rect(margin, y - 5, contentWidth, 9, 'F');
    }
    doc.setTextColor(...white);
    doc.setFontSize(9);

    const name = item.name.length > 45 ? item.name.substring(0, 45) + '...' : item.name;
    doc.text(name, margin + 3, y);
    doc.text(String(item.quantity), margin + contentWidth * 0.6, y, { align: 'center' });
    doc.text(`${item.unitPrice.toFixed(2)} €`, margin + contentWidth * 0.77, y, { align: 'right' });
    doc.text(`${(item.unitPrice * item.quantity).toFixed(2)} €`, margin + contentWidth, y, { align: 'right' });
    y += 9;
  });

  // Ligne finale tableau
  doc.setDrawColor(...purple);
  doc.setLineWidth(0.3);
  doc.line(margin, y, margin + contentWidth, y);

  // Totaux
  y += 10;
  const totalsX = margin + contentWidth * 0.55;
  const valuesX = margin + contentWidth;

  doc.setFontSize(9);
  doc.setTextColor(...lightGray);
  doc.text('Sous-total HT', totalsX, y);
  doc.setTextColor(...white);
  doc.text(`${order.subtotalHT.toFixed(2)} €`, valuesX, y, { align: 'right' });
  y += 7;

  doc.setTextColor(...lightGray);
  doc.text('TVA (17% Luxembourg)', totalsX, y);
  doc.setTextColor(...white);
  doc.text(`${order.tvaAmount.toFixed(2)} €`, valuesX, y, { align: 'right' });
  y += 7;

  // Total TTC
  doc.setFillColor(50, 20, 80);
  doc.rect(totalsX - 3, y - 5, valuesX - totalsX + 7, 10, 'F');
  doc.setTextColor(...purple);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('TOTAL TTC', totalsX, y);
  doc.text(`${order.totalTTC.toFixed(2)} €`, valuesX, y, { align: 'right' });

  // Footer
  y = 270;
  doc.setDrawColor(...lightGray);
  doc.setLineWidth(0.2);
  doc.line(margin, y, pageWidth - margin, y);
  y += 7;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...lightGray);
  doc.text('CPWorks — Spécialiste customisation automobile — Luxembourg', pageWidth / 2, y, { align: 'center' });
  y += 5;
  doc.text('contact@cpworks.lu | Statut paiement: PAYÉ', pageWidth / 2, y, { align: 'center' });

  doc.save(`${order.invoiceNumber}.pdf`);
}
