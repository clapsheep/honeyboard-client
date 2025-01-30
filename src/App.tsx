import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import MainLayout from './layouts/MainLayout';
import PrivateRoute from './layouts/PrivateRoute';
import {
    AdditionalInfoOAuth,
    AlgorithmGuideCreate,
    AlgorithmGuideDetail,
    AlgorithmGuideList,
    AlgorithmGuideUpdate,
    AlgorithmProblemCreate,
    AlgorithmProblemDetail,
    AlgorithmProblemList,
    AlgorithmProblemUpdate,
    AlgorithmSolutionCreate,
    AlgorithmSolutionDetail,
    AlgorithmSolutionUpdate,
    BMAlgorithmConcept,
    BMAlgorithmSolution,
    BMWebConcept,
    BMWebRecommend,
    ChangePassword,
    Error404,
    FinalProjectBoardCreate,
    FinalProjectBoardDetail,
    FinalProjectBoardUpdate,
    FinalProjectCreate,
    FinalProjectDetail,
    FinalProjectList,
    FinalProjectTeamUpdate,
    FinalProjectUpdate,
    GenerationManagement,
    Login,
    LoginCallback,
    MyAlgorithm,
    MyFinalProject,
    MyTrackProject,
    PlayList,
    Schedule,
    SearchMusic,
    SignUp,
    StudentManagement,
    TrackProjectBoardCreate,
    TrackProjectBoardDetail,
    TrackProjectBoardUpdate,
    TrackProjectCreate,
    TrackProjectDetail,
    TrackProjectList,
    TrackProjectTeamCreate,
    TrackProjectTeamUpdate,
    TrackProjectUpdate,
    WebGuideCreate,
    WebGuideDetail,
    WebGuideList,
    WebGuideUpdate,
    WebRecommendCreate,
    WebRecommendDetail,
    WebRecommendList,
    WebRecommendUpdate,
} from './pages';

import { BasicModal } from './components/organisms';
import { useModalStore } from './stores/modalStore';

function App() {
    const { isOpen, modalProps } = useModalStore();
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login/callback" element={<LoginCallback />} />
                <Route path="/find-password" element={<ChangePassword />} />
                <Route
                    path="/oauth/:domain/additional"
                    element={<AdditionalInfoOAuth />}
                />
                <Route element={<PrivateRoute />}>
                    <Route element={<MainLayout />}>
                        <Route path="/" element={<Schedule />} />
                        <Route path="project">
                            <Route
                                index
                                element={<Navigate to="/project/track" />}
                            />

                            <Route
                                path="track"
                                element={<TrackProjectList />}
                            />
                            <Route
                                path="track/create"
                                element={<TrackProjectCreate />}
                            />
                            <Route
                                path="track/:trackProjectId/edit"
                                element={<TrackProjectUpdate />}
                            />
                            <Route
                                path="track/:trackProjectId"
                                element={<TrackProjectDetail />}
                            />
                            <Route
                                path="track/:trackProjectId/create"
                                element={<TrackProjectTeamCreate />}
                            />
                            <Route
                                path="track/:trackProjectId/team/:trackTeamId/edit"
                                element={<TrackProjectTeamUpdate />}
                            />
                            <Route
                                path="track/:trackProjectId/team/:trackTeamId/board"
                                element={<TrackProjectBoardCreate />}
                            />
                            <Route
                                path="track/:trackProjectId/team/:trackTeamId/board/:boardId/edit"
                                element={<TrackProjectBoardUpdate />}
                            />
                            <Route
                                path="track/:trackProjectId/team/:trackTeamId/board/:boardId"
                                element={<TrackProjectBoardDetail />}
                            />

                            <Route
                                path="final"
                                element={<FinalProjectList />}
                            />

                            <Route
                                path="final/create"
                                element={<FinalProjectCreate />}
                            />

                            <Route
                                path="final/:finaleProjectId"
                                element={<FinalProjectDetail />}
                            />

                            <Route
                                path="final/:finaleProjectId/edit"
                                element={<FinalProjectUpdate />}
                            />
                            <Route
                                path="final/:finaleProjectId/team/:finaleTeamId/edit"
                                element={<FinalProjectTeamUpdate />}
                            />
                            <Route
                                path="final/:finaleProjectId/board/create"
                                element={<FinalProjectBoardCreate />}
                            />
                            <Route
                                path="final/:finaleProjectId/board/:boardId/edit"
                                element={<FinalProjectBoardUpdate />}
                            />

                            <Route
                                path="final/:finaleProjectId/board/:boardId"
                                element={<FinalProjectBoardDetail />}
                            />
                        </Route>
                        <Route path="study">
                            <Route
                                index
                                element={<Navigate to="/study/algorithm" />}
                            />
                            <Route path="algorithm">
                                <Route
                                    index
                                    element={
                                        <Navigate
                                            to="/study/algorithm/concept"
                                            replace
                                        />
                                    }
                                />
                                <Route
                                    path="concept"
                                    element={<AlgorithmGuideList />}
                                />
                                <Route
                                    path="concept/:guideId"
                                    element={<AlgorithmGuideDetail />}
                                />
                                <Route
                                    path="concept/create"
                                    element={<AlgorithmGuideCreate />}
                                />
                                <Route
                                    path="concept/:guideId/edit"
                                    element={<AlgorithmGuideUpdate />}
                                />

                                <Route
                                    path="problem"
                                    element={<AlgorithmProblemList />}
                                />
                                <Route
                                    path="problem/create"
                                    element={<AlgorithmProblemCreate />}
                                />
                                <Route
                                    path="problem/:problemId/edit"
                                    element={<AlgorithmProblemUpdate />}
                                />
                                <Route
                                    path="problem/:problemId"
                                    element={<AlgorithmProblemDetail />}
                                />

                                <Route
                                    path="problem/:problemId/create"
                                    element={<AlgorithmSolutionCreate />}
                                />
                                <Route
                                    path="problem/:problemId/solution/:solutionId/edit"
                                    element={<AlgorithmSolutionUpdate />}
                                />

                                <Route
                                    path="problem/:problemId/solution/:solutionId"
                                    element={<AlgorithmSolutionDetail />}
                                />
                            </Route>

                            <Route path="web">
                                <Route
                                    index
                                    element={
                                        <Navigate to="/study/web/concept" />
                                    }
                                />
                                <Route
                                    path="concept"
                                    element={<WebGuideList />}
                                />

                                <Route
                                    path="concept/:guideId"
                                    element={<WebGuideDetail />}
                                />
                                <Route
                                    path="concept/create"
                                    element={<WebGuideCreate />}
                                />
                                <Route
                                    path="concept/:guideId/edit"
                                    element={<WebGuideUpdate />}
                                />

                                <Route
                                    path="recommend"
                                    element={<WebRecommendList />}
                                />
                                <Route
                                    path="recommend/:recommendId"
                                    element={<WebRecommendDetail />}
                                />
                                <Route
                                    path="recommend/create"
                                    element={<WebRecommendCreate />}
                                />

                                <Route
                                    path="recommend/:recommendId/edit"
                                    element={<WebRecommendUpdate />}
                                />
                            </Route>
                        </Route>
                        <Route path="music">
                            <Route
                                index
                                element={<Navigate to="/music/list" />}
                            />
                            <Route path="list" element={<PlayList />} />
                            <Route path="search" element={<SearchMusic />} />
                        </Route>
                        <Route path="admin">
                            <Route
                                index
                                element={
                                    <Navigate to="/admin/student" replace />
                                }
                            />
                            <Route
                                path="student"
                                element={<StudentManagement />}
                            />
                            <Route
                                path="generation"
                                element={<GenerationManagement />}
                            />
                        </Route>
                        <Route path="mypage">
                            <Route
                                index
                                element={
                                    <Navigate
                                        to="/mypage/project/track"
                                        replace
                                    />
                                }
                            />
                            <Route path="project">
                                <Route
                                    index
                                    element={
                                        <Navigate
                                            to="/mypage/project/track"
                                            replace
                                        />
                                    }
                                />
                                <Route
                                    path="track"
                                    element={<MyTrackProject />}
                                />
                                <Route
                                    path="final"
                                    element={<MyFinalProject />}
                                />
                            </Route>
                            <Route path="algorithm" element={<MyAlgorithm />} />
                            <Route path="bookmark">
                                <Route
                                    index
                                    element={
                                        <Navigate
                                            to="/mypage/bookmark/algorithm/concept"
                                            replace
                                        />
                                    }
                                />
                                <Route
                                    path="algorithm/concept"
                                    element={<BMAlgorithmConcept />}
                                />
                                <Route
                                    path="algorithm/problem"
                                    element={<BMAlgorithmSolution />}
                                />
                                <Route
                                    path="web/concept"
                                    element={<BMWebConcept />}
                                />
                                <Route
                                    path="web/recommend"
                                    element={<BMWebRecommend />}
                                />
                            </Route>
                        </Route>
                    </Route>
                </Route>
                <Route path="*" element={<Error404 />} />
            </Routes>
            <BasicModal
                isOpen={isOpen}
                title={modalProps?.title ?? ''}
                icon={modalProps?.icon}
                subTitle={modalProps?.subTitle}
                onConfirmClick={modalProps?.onConfirmClick}
                onDeleteClick={modalProps?.onDeleteClick}
                onCancelClick={modalProps?.onCancelClick}
            />
        </BrowserRouter>
    );
}

export default App;
