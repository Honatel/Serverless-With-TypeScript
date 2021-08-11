import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import apiResponses from '../utils/apiResponses';
import * as AWS from 'aws-sdk';

const translate = new AWS.Translate();

export const handler: APIGatewayProxyHandler = async (event) => {
    const body = JSON.parse(event.body);
    const { text, language } = body;

    if (!text) {
        return apiResponses._400({ message: 'missing text fom the body' });
    }
    if (!language) {
        return apiResponses._400({ message: 'missing language from the body' });
    }

    try {
        const translateParams: AWS.Translate.Types.TranslateTextRequest = {
            Text: text,
            SourceLanguageCode: 'en',
            TargetLanguageCode: language,
        };

        const translatedMessage = await translate.translateText(translateParams).promise();
        return apiResponses._200({ translatedMessage });

    } catch (error) {
        console.log('error in the translation', error);
        return apiResponses._400({ message: 'unable to translate the message' }); 
    }
};


