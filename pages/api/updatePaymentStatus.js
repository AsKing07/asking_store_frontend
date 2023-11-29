import { mongooseConnect } from '@/lib/mongoose';
import { Order } from '@/models/Order';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  const { status, orderId } = req.body;

  try {
    await mongooseConnect();

    // Mettre à jour l'état de paiement dans la base de données à l'aide de Mongoose
    await Order.findByIdAndUpdate(orderId, { paid: true });

    res.status(200).json({ message: 'Payment status updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update payment status' });
  }
}