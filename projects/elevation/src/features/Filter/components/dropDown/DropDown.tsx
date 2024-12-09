import DropDownPicker from 'react-native-dropdown-picker';
import React from 'react';
import { useState } from 'react';

export default function DropDownSize() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'S', value: 'Small' },
        { label: 'M', value: 'Medium' },
        { label: 'L', value: 'Large' },

    ]);

    return (
        <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
        />
    );
}
