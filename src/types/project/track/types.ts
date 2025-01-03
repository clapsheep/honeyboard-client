export interface TrackProjectBoard {
    projectId: string;
    trackId: string;
    teamId: string;
    title: string;
    url: string;
    thumbnail: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
}

export interface TrackProjectBoardDetail extends TrackProjectBoard {
    content: string;
}
