import React from 'react';
import { View, Text, Button } from 'react-native';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LeaderBoard from '@/app/(app)/(leaderboard)/leaderboard';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

// Mocking react-native modules
jest.mock('react-native/Libraries/Settings/Settings', () => ({
    get: jest.fn(),
    set: jest.fn(),
    addListener: jest.fn(),
    removeListeners: jest.fn(),
}));

// Mocking other modules
jest.mock('convex/react', () => ({
    useQuery: jest.fn(),
}));

jest.mock('@/convex/_generated/api', () => ({
    api: {
        user: {
            all: 'user.all',
        },
    },
}));

const mockUsers = [
    { _id: '1', file: 'file1.png', username: 'User1', points: 50, gamesPlayed: 10 },
    { _id: '2', file: 'file2.png', username: 'User2', points: 60, gamesPlayed: 15 },
    { _id: '3', file: 'file3.png', username: 'User3', points: 70, gamesPlayed: 20 },
    { _id: '4', file: 'file4.png', username: 'User4', points: 80, gamesPlayed: 25 },
    { _id: '5', file: 'file5.png', username: 'User5', points: 90, gamesPlayed: 30 },
];

beforeEach(() => {
    (useQuery as jest.Mock).mockReturnValue(mockUsers);
});

jest.mock('@/components/leaderboard/header', () => (props: any) => {
    return (
        <View>
            <Text>{props.title}</Text>
            <Button title="Forward" onPress={() => props.onPress('forward')} />
            <Button title="Backward" onPress={() => props.onPress('backward')} />
        </View>
    );
});

jest.mock('@/components/leaderboard/podium/top-podium', () => (props: any) => {
    return (
        <View>
            {props.top3users.map((user: any) => (
                <View key={user._id}>
                    <Text>{user.username}</Text>
                </View>
            ))}
        </View>
    );
});

jest.mock('@/components/leaderboard/podium/ranks', () => (props: any) => {
    return (
        <View>
            <Text>{props.username}</Text>
        </View>
    );
});

it('renders correctly and displays users sorted by points by default', async () => {
    const { getByText } = render(<LeaderBoard />);

    await waitFor(() => {
        expect(getByText('ranking')).toBeTruthy();
        expect(getByText('User1')).toBeTruthy();
        expect(getByText('User2')).toBeTruthy();
        expect(getByText('User3')).toBeTruthy();
    });
});

it('changes sorting parameter to games played and updates the list', async () => {
    const { getByText, getByRole } = render(<LeaderBoard />);

    await waitFor(() => {
        expect(getByText('ranking')).toBeTruthy();
    });

    fireEvent.press(getByRole('button', { name: 'Forward' }));

    await waitFor(() => {
        expect(getByText('games played')).toBeTruthy();
        expect(getByText('User5')).toBeTruthy();
        expect(getByText('User4')).toBeTruthy();
        expect(getByText('User3')).toBeTruthy();
    });
});

// Add more test cases as needed
