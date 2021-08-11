import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'slspaciente',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },
  plugins: [
    'serverless-webpack',
    'serverless-offline'
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    lambdaHashingVersion: '20201221',
    iamRoleStatements: [
      {
          Effect: 'Allow',
          Action: ['translate:*'],
          Resource: '*',
      },
    ]
  },
  // import the function via paths
  functions: { 
    translate: {
      handler: 'lambdas/translate.handler',
      events: [
          {
            http: {
                path: 'translate',
                method: 'POST',
                cors: true,
            },
          },
      ],
    },
    
    handler: {
      handler: 'lambdas/getcityInfo.handler',
      events: [
        {
          http: {
            path: 'getcityInfo',
            method: 'GET',
            cors: true
          }
        }
      ]
    }
  },
};

module.exports = serverlessConfiguration;
