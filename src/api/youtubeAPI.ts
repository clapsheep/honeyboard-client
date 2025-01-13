import { api } from '@/utils/common/axiosInstance';
import axios from 'axios';

const { VITE_YOUTUBE_API_KEY } = import.meta.env;
export interface Youtube {
    id: string;
    videoId: string;
    title: string;
    channel: string;
    generationId: string;
    createdAt: string;
}

export type YoutubeList = Pick<
    Youtube,
    'id' | 'videoId' | 'title' | 'channel'
>[];

export const getMusicList = async (): Promise<YoutubeList> => {
    const { data } = await api.get(`/youtube/playlist`);

    return data;
};

export interface SearchMusicResponse {
    kind: string;
    etag: string;
    nextPageToken: string;
    prevPageToken?: string;
    regionCode: string;
    pageInfo: {
        totalResults: number;
        resultsPerPage: number;
    };
    items: {
        kind: string;
        etag: string;
        id: {
            kind: string;
            videoId: string;
            channelId?: string;
            playlistId?: string;
        };
        snippet: {
            publishedAt: string;
            channelId: string;
            title: string;
            description: string;
            thumbnails: {
                [key: string]: {
                    url: string;
                    width: number;
                    height: number;
                };
            };
            channelTitle: string;
            liveBroadcastContent: string;
            publishTime: string;
        };
    }[];
}

export const searchMusicAPI = async ({
    keyword,
    pageToken,
}: {
    keyword: string;
    pageToken?: string;
}): Promise<SearchMusicResponse> => {
    const { data } = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?type=video&part=snippet&q=${keyword}&maxResults=48&key=${VITE_YOUTUBE_API_KEY}`,
        { params: { pageToken } },
    );

    return data;
};

export const addMusicAPI = async (data: {
    videoId: string;
    title: string;
    channel: string;
}) => {
    const response = await api.post(`/youtube/playlist`, data);
    return response.data;
};

export const deleteMusicAPI = async (videoId: string) => {
    const response = await api.delete(`/youtube/playlist/${videoId}`);
    console.log(response.data);

    return response.data;
};
