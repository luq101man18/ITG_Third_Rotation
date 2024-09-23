

import React from "react";
import { Alert } from "react-native";

export function checkCredentials(email: string, password: string) {
    if (email === 'luqman' && password === '1234')  {
        Alert.alert('success');
    } else {
        Alert.alert('fail');
    }
}


