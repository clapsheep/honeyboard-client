import { Meta, StoryObj } from '@storybook/react';
import SearchBar from './SearchBar';

const meta: Meta<typeof SearchBar> = {
    component: SearchBar,
    title: 'Components/Molecules/SearchBar',
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof SearchBar>;

export default meta;

type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {
    args: {
        id: 'searchStudent',
        label: '학생 검색',
        placeholder: '이름을 입력하세요.',
        results: [],
        onClickResult: () => {},
        onChange: () => {},
    },
};

export const Search: Story = {
    args: {
        id: 'searchStudent',
        label: '학생 검색',
        placeholder: '이름을 입력하세요.',
        results: [
            { id: '1', name: '박성문' },
            { id: '1', name: '박성문' },
            { id: '1', name: '박성문' },
        ],
        onClickResult: () => {},
        onChange: () => {},
    },
};

export const YoutubeSearch: Story = {
    args: {
        id: 'searchStudent',
        label: '학생 검색',
        placeholder: '이름을 입력하세요.',
        results: [
            { id: '1', name: '박성문' },
            { id: '1', name: '박성문' },
            { id: '1', name: '박성문' },
        ],
        onClickResult: () => {},
        onClickSearch: () => {},
        onChange: () => {},
    },
};
