import React from 'react';
import { render } from '@testing-library/react-native';
import Profile from '../app/(app)/(profile)/profile';
import { useQuery } from 'convex/react';
import { View, Text } from 'react-native';
import { api } from '@/convex/_generated/api';

// Mocking the required modules and components
jest.mock('convex/react', () => ({
    useQuery: jest.fn(),
}));

jest.mock('@/components/profile/structure', () => {
    const { View, Text } = require('react-native');
    return {
        Structure: ({ title, children }: { title: string, children: React.ReactNode }) => (
            <View>
                <Text>{title}</Text>
                {children}
            </View>
        ),
    };
});

jest.mock('@/components/profile/grid', () => {
    const { View, Text } = require('react-native');
    return {
        __esModule: true,
        default: (props: { ranking: number; gamesPlayed: number; points: number; completionRate: number; correctAnswers: number; wrongAnswers: number }) => (
            <View>
                <Text>Ranking: {props.ranking}</Text>
                <Text>Games Played: {props.gamesPlayed}</Text>
                <Text>Points: {props.points}</Text>
                <Text>Completion Rate: {props.completionRate}</Text>
                <Text>Correct Answers: {props.correctAnswers}</Text>
                <Text>Wrong Answers: {props.wrongAnswers}</Text>
            </View>
        ),
    };
});

jest.mock('@/components/profile/friends', () => {
    const { View, Text } = require('react-native');
    return {
        __esModule: true,
        default: ({ number, friends }: { number: number; friends: string[] }) => (
            <View>
                <Text>Friends Component</Text>
                <Text>Number of Friends: {number}</Text>
                {friends.map((friend, index) => (
                    <Text key={index}>Friend File: {friend}</Text>
                ))}
            </View>
        ),
    };
});

describe('Profile', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        (useQuery as jest.Mock).mockImplementation((queryName: any) => {
            if (queryName === api.user.myUser) {
                return {
                    data: {
                        _id: 'myUserId',
                        username: 'My User',
                        file: 'fileUrl',
                        ranking: 1,
                        gamesPlayed: 10,
                        points: 100,
                        completionRate: 90,
                        correctAnswers: 80,
                        wrongAnswers: 20,
                        friends: ['friend1', 'friend2'],
                    },
                    isLoading: false,
                };
            }
            if (queryName === api.user.getUserByIds) {
                return {
                    data: [
                        { _id: 'friend1', file: 'friend1Url' },
                        { _id: 'friend2', file: 'friend2Url' },
                    ],
                    isLoading: false,
                };
            }
            return { data: null, isLoading: false };
        });
    });

    it('renders correctly with initial values', () => {
        const { getByText, debug } = render(<Profile />);
        debug(); // This will print the rendered component tree to the console for debugging

        expect(getByText('My User')).toBeTruthy();
        expect(getByText('Ranking: 1')).toBeTruthy();
        expect(getByText('Games Played: 10')).toBeTruthy();
        expect(getByText('Points: 100')).toBeTruthy();
        expect(getByText('Completion Rate: 90')).toBeTruthy();
        expect(getByText('Correct Answers: 80')).toBeTruthy();
        expect(getByText('Wrong Answers: 20')).toBeTruthy();
        expect(getByText('Friends Component')).toBeTruthy();
        expect(getByText('Number of Friends: 2')).toBeTruthy();
        expect(getByText('Friend File: friend1Url')).toBeTruthy();
        expect(getByText('Friend File: friend2Url')).toBeTruthy();
    });
});
