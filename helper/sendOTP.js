import apiHelper from './apiHelper';
async function sendOTP(phoneNumber) {
    apiHelper.post('/auth/sendOTP', { phoneNumber });
}

export default sendOTP;
