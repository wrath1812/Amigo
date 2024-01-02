import React, { useState, useEffect, useCallback } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    FlatList,
    Image,
    Pressable
} from 'react-native';
import { Button } from 'react-native-paper';
import Loader from '../components/Loader';
import apiHelper from '../helper/apiHelper';
import { useFocusEffect } from '@react-navigation/native';
import COLOR from '../constants/Colors';
import { calcHeight, calcWidth,getFontSizeByWindowWidth } from '../helper/res';
import { useAuth } from '../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import GroupIcon from '../components/GroupIcon';
import { DatePickerModal } from 'react-native-paper-dates';
function convertISODateToCustomFormat(isoDate) {
    const date = new Date(isoDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHour = hours % 12 || 12; // Convert 24h to 12h format and treat 0 as 12
    return `${day}/${month}/${year} at ${formattedHour}:${minutes} ${ampm}`;
  }
  
  
function ExpenseScreen({ navigation }) {
    const [loading, setLoading] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const { user } = useAuth();
    const [range, setRange] = React.useState({ startDate: undefined, endDate: undefined });
  const [open, setOpen] = React.useState(false);

   const onDismiss = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

 const onConfirm = React.useCallback(
    ({ startDate, endDate }) => {
      setOpen(false);
      setRange({ startDate, endDate });
    },
    [setOpen, setRange]
  );
    useFocusEffect(
        useCallback(() => {
            (async () => {
                setLoading(true);
                try {
                    const { data } = await apiHelper('/transaction/expenses');
                    setTransactions(data);
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            })();
        }, [user.id]),
    );

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Expense Summary</Text>

            <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
        <Button onPress={() => setOpen(true)} uppercase={false} mode="outlined">
          Pick range
        </Button>
        <DatePickerModal
          locale="en"
          mode="range"
          visible={open}
          onDismiss={onDismiss}
          startDate={range.startDate}
          endDate={range.endDate}
          onConfirm={onConfirm}
        />
        <Text>{JSON.stringify(range?.startDate)}</Text>
        <Text>{JSON.stringify(range?.endDate)}</Text>
      </View>


            {loading ? (
                <Loader />
            ) : transactions.length === 0 ? (
                <Text style={styles.noTransactionsText}>No Transactions Found</Text>
            ) : (
                <FlatList
                    data={transactions}
                    keyExtractor={(item, index) => item.id || index.toString()}
                    renderItem={({ item }) => (
                        <View style={{
                            flexDirection:"row",
                            paddingVertical:calcHeight(1),
                            justifyContent:"space-around",
                            borderBottomWidth:1,
                            borderBottomColor: "rgba(255, 255, 255, 0.13)",
                            alignItems:"center",
                        }}>
                            <View style={{
                            flexDirection:"row",
                            paddingVertical:calcHeight(1),
                            justifyContent:"space-around",
                            alignItems:"center",
                            width:"50%"

                        }}>
                                <View>
                            <GroupIcon size={{
                                width:calcHeight(5),
                                height:calcHeight(5)
                            }}/>
                            </View>
                            <View style={{
                                gap:calcHeight(1)
                            }}>
                                <Text style={{
                                    color:COLOR.BUTTON,
                                    fontWeight:"bold",
                                    fontSize:getFontSizeByWindowWidth(15)
                                }}>{item.description}</Text>
                                <Text style={{
                                    color:"white"
                                }}>{item.group}</Text>
                                <Text style={{
                                    color:"white",
                                    fontSize:getFontSizeByWindowWidth(8)
                                }}>{convertISODateToCustomFormat(item.date)}</Text>
                                </View>
                                </View>
                                <Text style={{
                                    color:"white",
                                    fontSize:getFontSizeByWindowWidth(15)
                                }}>${item.amount}</Text>
                        </View>
                    )}
                    style={styles.list}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.APP_BACKGROUND,
    },
    header: {
        fontSize: getFontSizeByWindowWidth(19),
        color: COLOR.TEXT,
        fontWeight: 'bold',
        margin:calcHeight(5)
    }
    // ... other styles
});

export default ExpenseScreen;
