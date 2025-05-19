import { Amplify } from 'aws-amplify';

export const configureAmplify = () => {
  console.log('Iniciando configuração do Amplify...');
  Amplify.configure({
    Auth: {
      Cognito: {
        userPoolClientId: '6pp7bqtrir970u7rrn67nkktch',
        userPoolId: 'us-west-2_WPgUGyt78',
        userPoolEndpoint: 'https://cognito-idp.us-west-2.amazonaws.com/us-west-2_WPgUGyt78'
      }
    }
  });
  console.log('Amplify configurado:', Amplify.getConfig());
};

