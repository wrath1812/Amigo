import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useAuth} from "../context/AuthContext";
import apiHelper from "../helper/apiHelper";
import PAGES from '../constants/pages';
import Loader from '../components/Loader';

function TransactionFormScreen({ navigation,route: { params: { group } } }) {
  const {user}=useAuth();
  const [loading,setIsLoading]=useState(false);
  const [transactionData, setTransactionData] = useState({
    amount: 0,
    description: '',
    paidBy: user._id,
    group: group._id,
    date: new Date(),
    splitAmong: []
  });

  useEffect(()=>{
    if(!transactionData.amount || transactionData.amount==0)
    {
      setTransactionData((prev) => ({
        ...prev,
        splitAmong: [],
      }));
    }
    const perUserPayment=transactionData.amount/group.members.length;
    setTransactionData((prev) => {

      return {
      ...prev,
      splitAmong:group.members.map(({_id})=>({
        amount:perUserPayment,
        user:_id
      })),
    }});


  },[transactionData.amount])

    const handleInputChange = (field, value) => {
      setTransactionData((prev) => ({
        ...prev,
        [field]: value,
      }));
    };


 

 
  const handleSubmit = async () => {
    setIsLoading(true);
    const {data}=await apiHelper.post("/transaction",transactionData);
    alert(JSON.stringify(data));
    navigation.navigate(PAGES.TRANSACTION,{group});

  };

  return loading?<Loader/>:(
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Amount:</Text>
      <TextInput
  style={styles.input}
  onChangeText={(text) => handleInputChange('amount', parseInt(text, 10))}
  value={transactionData.amount} // Ensure the value is a string
  keyboardType="numeric"
/>

      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleInputChange('description', text)}
        value={transactionData.description}
      />


      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  button: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#e7e7e7',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
  },
  participantButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#ddd',
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default TransactionFormScreen;
