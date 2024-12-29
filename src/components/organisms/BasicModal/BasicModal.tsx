import { Icon, ModalButton } from '@/components/atoms';

interface BasicModalProps {
    icon?: string;
    title: string;
    subTitle?: string;
    onConfirmClick?: (e: React.MouseEvent) => void;
    onDeleteClick?: (e: React.MouseEvent) => void;
    onCancelClick: (e: React.MouseEvent) => void;
}

const BasicModal = ({
    icon,
    title,
    subTitle,
    onConfirmClick,
    onDeleteClick,
    onCancelClick,
}: BasicModalProps) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="w-full max-w-[352px] rounded-xl border bg-gray-25 p-6">
                <section className="flex justify-center pb-5">
                    {icon && <Icon id={icon} size={48} />}
                </section>

                <section
                    className={`pb-${subTitle ? 2 : 8} text-center text-text-xl font-bold text-gray-900`}
                >
                    {title}
                </section>
                {subTitle && (
                    <section className="pb-8 text-center text-sm font-medium text-gray-600">
                        {subTitle}
                    </section>
                )}
                <section className="flex space-x-2">
                    {onConfirmClick && (
                        <ModalButton
                            type="button"
                            action="confirm"
                            onClick={onConfirmClick}
                        />
                    )}

                    <ModalButton
                        type="button"
                        action="cancel"
                        onClick={onCancelClick}
                    />
                    {onDeleteClick && (
                        <ModalButton
                            type="button"
                            action="delete"
                            onClick={onDeleteClick}
                        />
                    )}
                </section>
            </div>
        </div>
    );
};

export default BasicModal;
