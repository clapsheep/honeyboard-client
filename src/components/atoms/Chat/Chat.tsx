interface ChatProps {
    children: string;
    isMe?: boolean;
    time: string;
    name: string;
}
const Chat = ({ children, isMe = false, time, name }: ChatProps) => {
    return (
        <div className={`flex items-end gap-2 ${!isMe ? 'self-stretch' : ''}`}>
            {isMe ? (
                <>
                    <span className="text-text-sm font-medium text-gray-500">
                        {time}
                    </span>
                    <div className="rounded-bl-[20px] rounded-br-2xl rounded-tl-[20px] bg-blue-700 px-4 py-2">
                        <div className="text-text-md font-medium text-gray-25">
                            {children}
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="flex items-start gap-2">
                        <span className="text-text-md font-semibold text-gray-900">
                            {name}
                        </span>
                        <div className="rounded-bl-2xl rounded-br-[20px] rounded-tr-[20px] bg-gray-700 px-4 py-2">
                            <div className="text-text-md font-medium text-gray-25">
                                {children}
                            </div>
                        </div>
                    </div>
                    <span className="text-text-sm font-medium text-gray-500">
                        {time}
                    </span>
                </>
            )}
        </div>
    );
};
export default Chat;
