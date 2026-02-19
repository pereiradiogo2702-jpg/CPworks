import { NextRequest, NextResponse } from 'next/server';

interface OrderItem {
  name: string;
  quantity: number;
  unitPrice: number;
}

export async function POST(req: NextRequest) {
  try {
    const resendKey = process.env.RESEND_API_KEY;

    if (!resendKey || resendKey.includes('REMPLACER')) {
      return NextResponse.json({ success: false, error: 'Resend non configuré' }, { status: 503 });
    }

    const { Resend } = await import('resend');
    const resend = new Resend(resendKey);

    const { email, customerName, invoiceNumber, orderId, items, subtotalHT, tvaAmount, totalTTC } = await req.json();

    const itemsHtml = items
      .map((item: OrderItem) => `
        <tr>
          <td style="padding: 8px 12px; border-bottom: 1px solid #333;">${item.name}</td>
          <td style="padding: 8px 12px; border-bottom: 1px solid #333; text-align: center;">${item.quantity}</td>
          <td style="padding: 8px 12px; border-bottom: 1px solid #333; text-align: right;">${item.unitPrice.toFixed(2)} €</td>
          <td style="padding: 8px 12px; border-bottom: 1px solid #333; text-align: right;">${(item.unitPrice * item.quantity).toFixed(2)} €</td>
        </tr>
      `)
      .join('');

    await resend.emails.send({
      from: 'CPWorks <onboarding@resend.dev>',
      to: email,
      subject: `Confirmation de commande ${invoiceNumber} — CPWorks`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Confirmation de commande</title>
        </head>
        <body style="background: #0a0a0a; color: #ffffff; font-family: Arial, sans-serif; margin: 0; padding: 0;">
          <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">

            <!-- Header -->
            <div style="text-align: center; margin-bottom: 40px;">
              <h1 style="color: #a855f7; font-size: 32px; margin: 0;">CPWorks</h1>
              <p style="color: #9ca3af; margin: 8px 0 0;">Spécialiste en customisation automobile</p>
            </div>

            <!-- Confirmation -->
            <div style="background: #1a1a2e; border: 1px solid #7c3aed; border-radius: 12px; padding: 32px; margin-bottom: 24px; text-align: center;">
              <div style="font-size: 48px; margin-bottom: 16px;">✅</div>
              <h2 style="color: #ffffff; margin: 0 0 8px;">Commande confirmée !</h2>
              <p style="color: #9ca3af; margin: 0;">Merci pour votre commande, ${customerName}</p>
              <p style="color: #a855f7; font-weight: bold; margin: 16px 0 0; font-size: 18px;">${invoiceNumber}</p>
            </div>

            <!-- Articles -->
            <div style="background: #111111; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
              <h3 style="color: #ffffff; margin: 0 0 16px;">Détail de la commande</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <thead>
                  <tr style="background: #1f1f1f;">
                    <th style="padding: 8px 12px; text-align: left; color: #9ca3af; font-size: 12px;">ARTICLE</th>
                    <th style="padding: 8px 12px; text-align: center; color: #9ca3af; font-size: 12px;">QTÉ</th>
                    <th style="padding: 8px 12px; text-align: right; color: #9ca3af; font-size: 12px;">PRIX</th>
                    <th style="padding: 8px 12px; text-align: right; color: #9ca3af; font-size: 12px;">TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
              </table>
            </div>

            <!-- Totaux -->
            <div style="background: #111111; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span style="color: #9ca3af;">Sous-total HT</span>
                <span style="color: #ffffff;">${subtotalHT.toFixed(2)} €</span>
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 16px;">
                <span style="color: #9ca3af;">TVA (17% Luxembourg)</span>
                <span style="color: #ffffff;">${tvaAmount.toFixed(2)} €</span>
              </div>
              <div style="display: flex; justify-content: space-between; border-top: 1px solid #333; padding-top: 16px;">
                <span style="color: #ffffff; font-weight: bold; font-size: 18px;">Total TTC</span>
                <span style="color: #a855f7; font-weight: bold; font-size: 18px;">${totalTTC.toFixed(2)} €</span>
              </div>
            </div>

            <!-- Footer -->
            <div style="text-align: center; color: #6b7280; font-size: 12px;">
              <p>Votre facture PDF est disponible dans votre espace commande.</p>
              <p>Pour toute question : <a href="mailto:contact@cpworks.lu" style="color: #a855f7;">contact@cpworks.lu</a></p>
              <p style="margin-top: 16px;">CPWorks — Luxembourg</p>
            </div>

          </div>
        </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Resend error:', error);
    return NextResponse.json({ error: 'Erreur lors de l\'envoi de l\'email' }, { status: 500 });
  }
}
