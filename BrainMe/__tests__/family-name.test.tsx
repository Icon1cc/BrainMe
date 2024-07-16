import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import FamilyName from '../app/(app)/(profile)/accounts/family-name';
import { Stack, Link, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TextInput, View, Text, Pressable } from 'react-native';

jest.mock('expo-router', () => ({
    Stack: {
        Screen: jest.fn(() => null),
    },
    Link: jest.fn(({ children }) => children),
    useLocalSearchParams: jest.fn(),
}));

jest.mock('react-native-safe-area-context', () => ({
    useSafeAreaInsets: jest.fn(),
}));

jest.mock('../app/(app)/(profile)/accounts/name', () => {
    const React = require('react');
    const { View, TextInput, Text } = require('react-native');
    return {
        Edit: (props: { value: string, onChangeText: (text: string) => void, characterLeft: number }) => (
            <View>
                <TextInput
                    testID="edit-input"
                    value={props.value}
                    onChangeText={props.onChangeText}
                />
                <Text testID="character-left">{props.characterLeft}</Text>
            </View>
        ),
    };
});

describe('FamilyName', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        (useSafeAreaInsets as jest.Mock).mockReturnValue({ top: 10 });
        (useLocalSearchParams as jest.Mock).mockReturnValue({ param: 'initialValue' });
    });

    it('renders correctly with initial value', () => {
        const { getByTestId, debug } = render(<FamilyName />);

        debug(); // Output the entire rendered component

        const input = getByTestId('edit-input');
        expect(input.props.value).toBe('initialValue');
        expect(getByTestId('character-left').props.children).toBe(8);
    });

    it('updates input value and character left count', () => {
        const { getByTestId } = render(<FamilyName />);

        const input = getByTestId('edit-input');
        fireEvent.changeText(input, 'newValue');

        expect(input.props.value).toBe('newValue');
        expect(getByTestId('character-left').props.children).toBe(12);
    });

    it('updates URL with correct parameters when pressing Update', () => {
        const { getByTestId, debug } = render(<FamilyName />);

        const updateButton = getByTestId('update-button');
        fireEvent.press(updateButton);

        expect(Link).toHaveBeenCalledWith(
            expect.objectContaining({
                href: expect.objectContaining({
                    pathname: '/(app)/(profile)/accounts/',
                    params: { title: 'familyName', param: 'initialValue' },
                }),
            }),
            {}
        );
    });
});