import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Footer from '@/components/auth/footer-text';

jest.mock('expo-router', () => {
    const React = require('react');
    return {
        Link: ({ children, href }: { children: React.ReactNode, href: string }) => React.cloneElement(children as React.ReactElement, { testID: href }),
    };
});

describe('Footer Component', () => {
    it('renders correctly with sign-up link', () => {
        const { getByText } = render(<Footer text="Don't have an account?" link="Sign up" />);
        expect(getByText("Don't have an account?")).toBeTruthy();
        expect(getByText('Sign up')).toBeTruthy();
    });

    it('renders correctly with sign-in link', () => {
        const { getByText } = render(<Footer text="Already have an account?" />);
        expect(getByText('Already have an account?')).toBeTruthy();
        expect(getByText('Sign in')).toBeTruthy();
    });

    it('navigates to the correct screen when the sign-up link is pressed', () => {
        const { getByTestId } = render(<Footer text="Don't have an account?" link="Sign up" />);
        const linkElement = getByTestId('/sign-up');
        fireEvent.press(linkElement);
        expect(linkElement).toBeTruthy();
    });

    it('navigates to the correct screen when the sign-in link is pressed', () => {
        const { getByTestId } = render(<Footer text="Already have an account?" />);
        const linkElement = getByTestId('/welcome');
        fireEvent.press(linkElement);
        expect(linkElement).toBeTruthy();
    });
});
