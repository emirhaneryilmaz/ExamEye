const cron = require('node-cron');
const checkAndSendEmail = require('./script'); 


cron.schedule('*/5 * * * *', async () => {
    console.log('Checking every 5 min...');
    await checkAndSendEmail();
});
