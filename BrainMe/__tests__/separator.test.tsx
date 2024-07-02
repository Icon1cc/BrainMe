import React from 'react';
import { render } from '@testing-library/react-native';
import Separator from '@/components/auth/separator';

describe('Separator Component', () => {
    it('renders correctly', () => {
        const { getByText, getAllByTestId } = render(<Separator />);
        
        // Check if the text is rendered correctly
        expect(getByText('or sign up with')).toBeTruthy();
        
        // Check if there are two separator lines
        const lines = getAllByTestId('separator-line');
        expect(lines.length).toBe(2);
    });
});
