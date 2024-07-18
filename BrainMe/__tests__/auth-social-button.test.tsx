import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AuthSocialButton from '@/components/auth/auth-social-button';

describe('AuthSocialButton Component', () => {
    const providers = ['google', 'apple', 'facebook'];

    it('renders correctly with different providers', () => {
        providers.forEach(provider => {
            const { getByTestId } = render(<AuthSocialButton onPress={() => { }} provider={provider} activity={false} />);
            const button = getByTestId('auth-social-button');
            expect(button).toBeTruthy();
        });
    });

    it('calls onPress when pressed', () => {
        const onPressMock = jest.fn();
        const { getByTestId } = render(<AuthSocialButton onPress={onPressMock} provider="google" activity={false} />);
        const button = getByTestId('auth-social-button');
        fireEvent.press(button);
        expect(onPressMock).toHaveBeenCalledTimes(1);
    });

    it('renders the correct image for each provider', () => {
        providers.forEach(provider => {
            const { getByTestId } = render(<AuthSocialButton onPress={() => { }} provider={provider} activity={false} />);
            const image = getByTestId(`${provider}-image`);
            expect(image).toBeTruthy();
        });
    });
});
