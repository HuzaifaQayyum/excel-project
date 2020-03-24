module.exports = { 
    mongodbUri: 'mongodb://localhost:27017/excel-report',
    nodemailerApiKey: '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',
    companyEmailAddress: 'Excel-Report@test-project.com',
    jwtPassword: 'some_password',
    verificationTokensValidTill: 3 * 24 * 60 * 60 * 1000, // 3 days,
    mainTokenValidTill: 30 * 24 * 60 * 60 * 1000, // 30 days,
    clientUrl: `http://localhost:4200`
};
