
import auth from '@react-native-firebase/auth';
async function sendOtp(phoneNumberWithPhoneNumber:string)
{
    const {_verificationId} = await auth().signInWithPhoneNumber(phoneNumberWithPhoneNumber);
  
    return _verificationId;
}

export default sendOtp;