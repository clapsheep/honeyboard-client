import { Link } from 'react-router';

interface WebSiteCardProps {
    id: string;
    title: string;
    subTitle: string;
    site?: string;
}

const WebSiteCard = ({ id, title, subTitle, site }: WebSiteCardProps) => {
    return (
        <div className="block h-full w-full rounded border border-gray-300 bg-gray-25 shadow-lg">
            <Link to={`/study/web/recommend/${id}`} className="block">
                <div className="flex w-full flex-col items-start px-4 py-3">
                    <div className="flex w-full justify-between">
                        <p className="text-text-sm font-semibold text-gray-900">
                            {title}
                        </p>
                    </div>
                    <p className="text-text-xs font-medium text-gray-500">
                        {subTitle}
                    </p>
                </div>
            </Link>
            <div className="flex px-4 pb-3">
                {site ? (
                    <a
                        href={
                            site.startsWith('http') ? site : `https://${site}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block truncate text-text-xs font-medium text-blue-600"
                    >
                        {site}
                    </a>
                ) : (
                    <p className="text-text-xs font-medium text-gray-500">
                        첨부 링크 없음
                    </p>
                )}
            </div>
        </div>
    );
};

export default WebSiteCard;
