import { AxiosResponse } from 'axios';

import { api } from '@/utils/common/axiosInstance';
import { Image } from '@/types/Image';

const { VITE_BASE_API } = import.meta.env;

// 이미지 업로드
export const uploadImageAPI = async (
    file: File,
): Promise<AxiosResponse<Image>> => {
    const formData = new FormData();
    formData.append('file', file);

    return api.post(`${VITE_BASE_API}/image`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

// 이미지 삭제
export const deleteImageAPI = async (
    imageUrl: string,
): Promise<AxiosResponse<void>> => {
    return api.delete(`${VITE_BASE_API}/image`, {
        params: {
            imageUrl: imageUrl,
        },
    });
};
