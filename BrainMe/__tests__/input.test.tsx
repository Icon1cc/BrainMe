import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Input from '@/components/auth/input';

describe('Input Component', () => {
    it('renders correctly with all props', () => {
        const { getByPlaceholderText, getByText } = render(
            <Input
                title="Email"
                placeholder="Enter your email"
                keyboardType="email-address"
                onChangeText={() => {}}
                textAlign="center"
                maxlength={50}
                secureTextEntry={false}
            />
        );

        expect(getByText('Email')).toBeTruthy();
        expect(getByPlaceholderText('Enter your email')).toBeTruthy();
    });

    it('calls onChangeText with the correct text', () => {
        const onChangeTextMock = jest.fn();
        const { getByPlaceholderText } = render(
            <Input
                title="Email"
                placeholder="Enter your email"
                keyboardType="email-address"
                onChangeText={onChangeTextMock}
                textAlign="center"
                maxlength={50}
                secureTextEntry={false}
            />
        );

        const input = getByPlaceholderText('Enter your email');
        fireEvent.changeText(input, 'test@example.com');
        expect(onChangeTextMock).toHaveBeenCalledWith('test@example.com');
    });

    it('renders with secureTextEntry', () => {
        const { getByPlaceholderText } = render(
            <Input
                title="Password"
                placeholder="Enter your password"
                onChangeText={() => {}}
                secureTextEntry={true}
            />
        );

        const input = getByPlaceholderText('Enter your password');
        expect(input.props.secureTextEntry).toBe(true);
    });

    it('renders with the correct keyboardType', () => {
        const { getByPlaceholderText } = render(
            <Input
                title="Phone"
                placeholder="Enter your phone number"
                keyboardType="phone-pad"
                onChangeText={() => {}}
            />
        );

        const input = getByPlaceholderText('Enter your phone number');
        expect(input.props.keyboardType).toBe('phone-pad');
    });
});
