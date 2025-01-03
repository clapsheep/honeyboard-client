import StudentInfoSkeleton from '@/components/molecules/StudentInfo/StudentInfoSkeleton';

const StudentInfoSkeletonList = () => {
    return (
        <ul>
            {Array.from({ length: 10 }).map((_, index) => (
                <StudentInfoSkeleton key={index} />
            ))}
        </ul>
    );
};

export default StudentInfoSkeletonList;
