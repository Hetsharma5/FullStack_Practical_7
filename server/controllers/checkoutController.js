// @desc    Simulate payment
// @route   POST /api/checkout/pay
// @access  Private
const processPayment = async (req, res) => {
    const { amount, paymentMethod } = req.body;

    if (!amount || !paymentMethod) {
        return res.status(400).json({ message: 'Amount and payment method are required' });
    }

    // Simulate random success/failure (80% success rate)
    const isSuccess = Math.random() < 0.8;

    setTimeout(() => {
        if (isSuccess) {
            res.status(200).json({
                success: true,
                message: 'Payment processed successfully',
                transactionId: `txn_${Math.random().toString(36).substr(2, 9)}`,
                status: 'COMPLETED'
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Payment declined by bank',
                errorCode: 'PAYMENT_DECLINED'
            });
        }
    }, 1500); // Simulate network latency
};

module.exports = {
    processPayment
};
