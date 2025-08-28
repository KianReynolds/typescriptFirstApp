import { stat } from "fs";
import { budgetCollection } from "../../src/database";
import { ObjectId } from "mongodb";

export const handler = async (event: any = {}): Promise<any> => {
    try {
        const userId = event?.pathParameters?.userId;

        if (!userId) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'User ID is required' }),
            };
        }

        const userBudgets = await budgetCollection.find({ userId: new ObjectId(userId) }).toArray();

        if (!userBudgets.length) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'No budgets found for this user' }),
            };
        }

        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

        let totalSpent = 0;
        let transactionCount = 0;

        for (const budget of userBudgets) {
            for (const transaction of budget.transactions) {
                const transactionDate = new Date(transaction.date);
                if (transactionDate >= startOfMonth && transactionDate <= endOfMonth) {
                    totalSpent += transaction.amount;
                    transactionCount++;
                }
            }
            
        }

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Monthly report generated successfully',
                totalSpent,
                transactionCount,
                month: now.toLocaleString('default', { month: 'long' }),
                year: now.getFullYear()
            }),
        };
    } catch (error) {
        console.error('Error generating monthly report:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal server error' }),
        };
    }
};