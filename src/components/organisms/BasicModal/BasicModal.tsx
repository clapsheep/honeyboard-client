interface BasicModalProps {
    icon?: string;
    title: string;
    subTitle?: string;
    onConfirmClick?: (e: React.MouseEvent) => void;
    onDeleteClick?: (e: React.MouseEvent) => void;
    onCancelClick: (e: React.MouseEvent) => void;
}
