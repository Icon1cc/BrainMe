import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Button from '@/components/auth/action-button';
import Colors from '@/constants/Colors';
import { ReactTestInstance } from 'react-test-renderer';

describe('Button Component', () => {
    it('renders correctly', () => {
        const { getByText } = render(<Button text="Press me" onPress={() => { }} />);
        expect(getByText('Press me')).toBeTruthy();
    });

    it('calls onPress when pressed', () => {
        const onPressMock = jest.fn();
        const { getByText } = render(<Button text="Press me" onPress={onPressMock} />);
        fireEvent.press(getByText('Press me'));
        expect(onPressMock).toHaveBeenCalledTimes(1);
    });

    it('applies correct styles when not pressed', () => {
        const { getByText } = render(<Button text="Press me" onPress={() => { }} />);
        const textElement = getByText('Press me');
        expect(textElement).toBeTruthy();

        const pressable = textElement.parent?.parent as ReactTestInstance;
        expect(pressable).toBeTruthy();

        const style = pressable.props.style[1];
        expect(style).toEqual({
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colors.primary,
            borderRadius: 15,
        });
    });
});
