const dev = {
    s3: {
        REGION: "us-east-1",
        BUCKET: "notes-minhmap",
    },
    apiGateway: {
        REGION: "us-east-1",
        URL: "https://5ug3p9ysil.execute-api.us-east-1.amazonaws.com/prod",
    },
    cognito: {
        REGION: "us-east-1",
        USER_POOL_ID: "us-east-1_SJU0ZgzR1",
        APP_CLIENT_ID: "9at7qbtmqkc4cp4b4072ft9s8",
        IDENTITY_POOL_ID: "us-east-1:6ae2cab3-c12c-42d7-9811-a38c93e0935a"
    }
};

//use the same s3 and api for now
const prod = {
    s3: {
        REGION: "us-east-1",
        BUCKET: "notes-minhmap",
    },
    apiGateway: {
        REGION: "us-east-1",
        URL: "https://5ug3p9ysil.execute-api.us-east-1.amazonaws.com/prod",
    },
    cognito: {
        REGION: "us-east-1",
        USER_POOL_ID: "us-east-1_SJU0ZgzR1",
        APP_CLIENT_ID: "9at7qbtmqkc4cp4b4072ft9s8",
        IDENTITY_POOL_ID: "us-east-1:6ae2cab3-c12c-42d7-9811-a38c93e0935a"
    }
};

const config = process.env.REACT_APP_STATE === 'prod' ? prod : dev;

export default {
    MAX_ATTACHMENT_SIZE: 5000000,
    ...config
};