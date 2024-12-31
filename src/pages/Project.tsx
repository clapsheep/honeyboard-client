import { Button, SelectOption, TabButton } from '@/components/atoms';
import { TeamTag } from '@/components/molecules';
import Title from '@/components/molecules/Title/Title';
import { ProjectCard } from '@/components/organisms';
import { useEffect, useState } from 'react';
import { Routes } from 'react-router';

const Project = () => {
    // const generationId = 12;

    // useEffect(() => {
    //     const url = `/api/v1/project/finale?generation=${generationId}`;
    //     const fetchData = async () => {
    //         const [projectData, setProjectData] = useState<unknown[]>([]);
    //         try {
    //             const response = await fetch(url);
    //             if (!response.ok) {
    //                 throw new Error('NetWork response was not ok');
    //             }
    //             const result = await response.json();
    //             setProjectData(result);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };

    //     fetchData();
    // }, []);

    return (
        <>
            <Header BrowserRouter={Routes} />
            <nav className="pt-4">
                <TeamTag onClick={() => alert('팀태그')} />
            </nav>
            <main>
                <ProjectCard
                    title=""
                    subTitle=""
                    onClick={() => alert('게시글')}
                />
            </main>
        </>
    );
};

export default Project;
