import { Button } from '@/components/atoms';
import Title from '@/components/molecules/Title/Title';

const AlgorithmConCeptDetail = () => {
    return;
    <>
        <Title title="" isLiked={false} />;
        <section>
            <Button color="red" children="글 삭제" />
            <Button color="blue" children="글 수정" />
        </section>
    </>;
};

export default AlgorithmConCeptDetail;
