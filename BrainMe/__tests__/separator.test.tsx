import React from 'react';
import { render } from '@testing-library/react-native';
import Separator from '@/components/auth/separator';

describe('Separator Component', () => {
    it('renders correctly', () => {
        const { getByText, getAllByTestId } = render(<Separator />);
        
        expect(getByText('or sign up with')).toBeTruthy();
        
        const lines = getAllByTestId('separator-line');
        expect(lines.length).toBe(2);
    });
});
