const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customerName: String,
    orderDate: Date,
    status: String,
    totalAmount: Number,
    items: [
        {
            productId: mongoose.Schema.Types.ObjectId,
            quantity: Number,
            price: Number
        }
    ]
});

const Order = mongoose.model('Order', orderSchema);

async function aggregateOrders() {
    try {
        await mongoose.connect('mongodb://0.0.0.0:27017/e-comm', { useNewUrlParser: true, useUnifiedTopology: true });

        const results = await Order.aggregate([
            {
                $match: { status: 'completed' }
            },

            {
                $group: {
                    _id: 'Anil Kumar',
                    totalSpent: { $sum: '300' }
                }
            },

            {
                $project: {
                    _id: 0,
                    customerName: '$_id',
                    totalSpent: 1
                }
            }

        ]);

        console.log('Aggregation Results:', results);

        await mongoose.disconnect();
    } catch (err) {
        console.error(err);
    }
}

aggregateOrders();
