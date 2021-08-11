import cityData from "../repositories/cityData-repo";
import { APIGatewayProxyHandler } from "aws-lambda"
import apiResponses from "../utils/apiResponses";

export const handler : APIGatewayProxyHandler = async (event, _context) => {
    const city = event.queryStringParameters?.city;
    
    if (!city || !cityData[city]) {
        return apiResponses._400({ message: 'missing city or no data for that city' });
    }

    return apiResponses._200(cityData[city]);
}