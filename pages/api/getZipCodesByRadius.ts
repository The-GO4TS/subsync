import { NextApiRequest, NextApiResponse } from 'next';
import getZipCodesByRadius from '../zipCodeByRadius';  // Update the import path

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { zipCode, radius } = req.query;

    if (!zipCode || !radius) {
        return res.status(400).json({ error: 'Both Zip Code and Radius are required' });
    }

    try {
        const result = await getZipCodesByRadius(zipCode.toString(), parseInt(radius.toString(), 10));
        return res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching Zip Codes by Radius:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
