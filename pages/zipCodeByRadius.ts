import axios from 'axios';

const ZIPCODE_API_BASE_URL = 'https://www.zipcodeapi.com/rest/';
const API_KEY = 'iXGRPjDhlXAaDxKGdr760LtZfxTxotZ79QUY8ABHNWZXSMvrgon7LIamOeyb4MPd';

const getZipCodesByRadius = async (zipCode: string, radius: number): Promise<string[]> => {
    try {
        const encodedZipCode = encodeURIComponent(zipCode);
        const response = await axios.get<any>(
            `${ZIPCODE_API_BASE_URL}${API_KEY}/radius.json/${encodedZipCode}/${radius}/mile`
        );

        // Extract only the zip codes directly in the return statement
        return response.data.zip_codes.map((item: any) => item.zip_code);
    } catch (error) {
        console.error('Error fetching Zip Codes by Radius:', error);
        throw error;
    }
};

export default getZipCodesByRadius;
