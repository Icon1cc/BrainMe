import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Structure } from '@/components/auth/structure';
import Colors from '@/constants/Colors';

jest.mock('react-native-safe-area-context', () => ({
    useSafeAreaInsets: () => ({ top: 10, bottom: 0, left: 0, right: 0 }),
}));

describe('Structure Component', () => {
    it('renders correctly with title and subtitle', () => {
        const { getByText } = render(
            <Structure title="Test Title" subtitle="Test Subtitle">
                <Text>Child Component</Text>
            </Structure>
        );

        expect(getByText('Test Title')).toBeTruthy();
        expect(getByText('Test Subtitle')).toBeTruthy();
    });

    it('renders children components', () => {
        const { getByText } = render(
            <Structure title="Test Title" subtitle="Test Subtitle">
                <Text>Child Component 1</Text>
                <Text>Child Component 2</Text>
            </Structure>
        );

        expect(getByText('Child Component 1')).toBeTruthy();
        expect(getByText('Child Component 2')).toBeTruthy();
    });

    it('applies safe area insets correctly', () => {
        const { getByTestId } = render(
            <Structure title="Test Title" subtitle="Test Subtitle">
                <Text>Child Component</Text>
            </Structure>
        );

        const container = getByTestId('structure-container');
        expect(container.props.style).toEqual(
            expect.objectContaining({
                paddingTop: 10,
                backgroundColor: Colors.primary,
                flex: 1,
            })
        );
    });
});
