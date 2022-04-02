import { Schema, model } from 'mongoose';

const transactionTypes = {
    INCOME: "INCOME",
    EXPENSE: "EXPENSE"
}

const transactionSchema = new Schema({
    description: {
        type: 'String',
        required: [true, 'Please enter description about your transaction.'],
    },
    amount: {
        type: "Number",
        required: [true, 'Amount is compulsary'],
    },
    accountBook: { type: Schema.Types.ObjectId, ref: "accountBook" },
    type: {
        type: 'String',
        "enum": ["INCOME", "EXPENSE"]
    },
    date: {
        type: Date,
        immutable: true,
        default: () => Date.now(),
        auto: true,
    }
});

const TransactionSchema = model('transaction', transactionSchema);

export default TransactionSchema;