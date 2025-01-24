import { useState, useEffect } from 'react';
import { Alert, Button, Text, View } from 'react-native';
import { Local } from '../../enviroment';
import { Screen } from 'react-native-screens';
import { useStripe } from '@stripe/stripe-react-native';

export default function PaymentScreen() {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);
    const [paymentSheetEnabled, setPaymentSheetEnabled] = useState(false);
    const [clientSecret, setClientSecret] = useState<string>();
  
    const fetchPaymentSheetParams = async () => {
      const response = await fetch(`${Local.baseUrl}payment-sheet`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }, body: JSON.stringify({ items: [{ currency: 'aed', amount: 10 }] }),
      });
      const { paymentIntent, ephemeralKey, customer } = await response.json();
      setClientSecret(paymentIntent);
      return {
        paymentIntent,
        ephemeralKey,
        customer,
      };
    };
  
    const initializePaymentSheet = async () => {
      const {
        paymentIntent,
        ephemeralKey,
        customer,
      } = await fetchPaymentSheetParams();
  
      const { error } = await initPaymentSheet({
        merchantDisplayName: "Example, Inc.",
        customerId: customer,
        style: 'alwaysDark',
        customFlow: false,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
        //methods that complete payment after a delay, like SEPA Debit and Sofort.
        allowsDelayedPaymentMethods: true,
        defaultBillingDetails: {
          name: 'Jane Doe',
        }
      });
      if (!error) {
        setLoading(true);
      }
    };
  
    const openPaymentSheet = async () => {
      if (!clientSecret) {
        Alert.alert("Error", "Payment setup is incomplete");
        return;
      }
    
      try {
        setLoading(true);
    
        // Simulate a delay for loading, if needed
        await new Promise((resolve) => setTimeout(resolve, 2500));
    
        const { error } = await presentPaymentSheet();
    
        if (error) {
          Alert.alert(`Error code: ${error.code}`, error.message);
        } else {
          Alert.alert('Success', 'The payment was confirmed successfully');
          setPaymentSheetEnabled(false);
        }
      } catch (e) {
        console.error("Error presenting payment sheet:", e);
        Alert.alert("Error", "Something went wrong while presenting the payment sheet");
      } finally {
        setLoading(false);
      }
    };
    

    useEffect(() => {
      initializePaymentSheet();
    }, []);
  
    return (
      <View style={{ marginTop: 610 }}>
        <Screen>
            <Text>{clientSecret}</Text>
        <Button
          disabled={!loading}
          title="Checkout"
          onPress={openPaymentSheet}
        />
      </Screen>
      </View>
    );
  }