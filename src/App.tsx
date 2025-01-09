import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import MainLayout from './layouts/MainLayout';
import PrivateRoute from './layouts/PrivateRoute';
import {
    AdditionalInfoOAuth,
    AlgorithmGuideCreateUpdate,
    AlgorithmGuideDetail,
    AlgorithmGuideList,
    AlgorithmProblemCreateUpdate,
    AlgorithmProblemDetail,
    AlgorithmProblemList,
    AlgorithmSolutionCreateUpdate,
    AlgorithmSolutionDetail,
    BMAlgorithmConcept,
    BMAlgorithmSolution,
    BMWebConcept,
    BMWebRecommend,
    Error404,
    FinalProjectCreate,
    FinalProjectDetail,
    FinalProjectList,
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
    TrackProjectCreateUpdate,
    TrackProjectDetail,
    TrackProjectList,
    TrackProjectTeamCreateUpdate,
    FinalProjectBoardCreateUpdate,
    FinalProjectBoardDetail,
    FinalProjectTeamUpdate,
    TrackProjectBoardCreateUpdate,
    TrackProjectBoardDetail,
    WebGuideList,
    WebGuideDetail,
    WebGuideCreateUpdate,
    WebRecommendList,
    WebRecommendDetail,
    WebRecommendCreateUpdate,
} from './pages';

import { BasicModal } from './components/organisms';
import { useModalStore } from './stores/modalStore';

function App() {
    const { closeModal, isOpen, modalProps } = useModalStore();
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login/callback" element={<LoginCallback />} />
                <Route
                    path="/find-password"
                    element={<div>Find Password</div>}
                />
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
                                element={
                                    <TrackProjectCreateUpdate mode="create" />
                                }
                            />
                            <Route
                                path="track/:trackProjectId/edit"
                                element={
                                    <TrackProjectCreateUpdate mode="edit" />
                                }
                            />
                            <Route
                                path="track/:trackProjectId"
                                element={<TrackProjectDetail />}
                            />
                            <Route
                                path="track/:trackProjectId/create"
                                element={
                                    <TrackProjectTeamCreateUpdate mode="create" />
                                }
                            />
                            <Route
                                path="track/:trackProjectId/team/:trackTeamId/edit"
                                element={
                                    <TrackProjectTeamCreateUpdate mode="edit" />
                                }
                            />
                            <Route
                                path="track/:trackProjectId/team/:trackTeamId/board"
                                element={
                                    <TrackProjectBoardCreateUpdate mode="create" />
                                }
                            />
                            <Route
                                path="track/:trackProjectId/team/:trackTeamId/board/:boardId/edit"
                                element={
                                    <TrackProjectBoardCreateUpdate mode="edit" />
                                }
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
                                path="final/:finalProjectId"
                                element={<FinalProjectDetail />}
                            />

                            <Route
                                path="final/:finalProjectId/edit"
                                element={<FinalProjectUpdate />}
                            />
                            <Route
                                path="final/:finalProjectId/team/:finaleTeamId/edit"
                                element={<FinalProjectTeamUpdate />}
                            />
                            <Route
                                path="final/:finalProjectId/board/create"
                                element={
                                    <FinalProjectBoardCreateUpdate mode="create" />
                                }
                            />
                            <Route
                                path="final/:finalProjectId/board/:boardId/edit"
                                element={
                                    <FinalProjectBoardCreateUpdate mode="edit" />
                                }
                            />

                            <Route
                                path="final/:finalProjectId/board/:boardId"
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
                                    element={
                                        <AlgorithmGuideCreateUpdate mode="create" />
                                    }
                                />
                                <Route
                                    path="concept/:guideId/edit"
                                    element={
                                        <AlgorithmGuideCreateUpdate mode="edit" />
                                    }
                                />

                                <Route
                                    path="problem"
                                    element={<AlgorithmProblemList />}
                                />
                                <Route
                                    path="problem/create"
                                    element={
                                        <AlgorithmProblemCreateUpdate mode="create" />
                                    }
                                />
                                <Route
                                    path="problem/:problemId/edit"
                                    element={
                                        <AlgorithmProblemCreateUpdate mode="edit" />
                                    }
                                />
                                <Route
                                    path="problem/:problemId"
                                    element={<AlgorithmProblemDetail />}
                                />

                                <Route
                                    path="problem/:problemId/create"
                                    element={
                                        <AlgorithmSolutionCreateUpdate mode="create" />
                                    }
                                />
                                <Route
                                    path="problem/:problemId/solution/:solutionId/edit"
                                    element={
                                        <AlgorithmSolutionCreateUpdate mode="edit" />
                                    }
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
                                    element={
                                        <WebGuideCreateUpdate mode="create" />
                                    }
                                />
                                <Route
                                    path="concept/:guideId/edit"
                                    element={
                                        <WebGuideCreateUpdate mode="edit" />
                                    }
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
                                    element={
                                        <WebRecommendCreateUpdate mode="create" />
                                    }
                                />

                                <Route
                                    path="recommend/:recommendId/edit"
                                    element={
                                        <WebRecommendCreateUpdate mode="edit" />
                                    }
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
                                    path="web/recomend"
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
                onCancelClick={closeModal}
            />
        </BrowserRouter>
    );
}

export default App;
