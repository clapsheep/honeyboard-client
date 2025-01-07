import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import MainLayout from './layouts/MainLayout';
import PrivateRoute from './layouts/PrivateRoute';
import {
    AdditionalInfoOAuth,
    AlgorithmConceptList,
    AlgorithmProblemList,
    AlgorithmProblemSolutionDetail,
    BMAlgorithmConcept,
    BMAlgorithmSolution,
    BMWebConcept,
    BMWebRecommend,
    CreateAlgorithmConcept,
    CreateAlgorithmProblem,
    CreateAlgorithmProblemSolution,
    CreateFinalTeam,
    CreateTrackProject,
    CreateWebConcept,
    CreateWebRecommend,
    Error404,
    FinalList,
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
    TrackList,
    UpdateAlgorithmConcept,
    UpdateAlgorithmProblem,
    UpdateAlgorithmProblemSolution,
    UpdateTrackProjectBoard,
    UpdateWebConcept,
    UpdateWebRecommend,
    WebConceptDetail,
    WebConceptList,
    WebRecommendDetail,
    WebRecommendList,
} from './pages';

import { BasicModal } from './components/organisms';
import { useModalStore } from './stores/modalStore';
import CreateFinalProjectBoard from './pages/project/final/CreateFinalProjectBoard';

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
                                path="track/create"
                                element={<CreateTrackProject />}
                            />
                            <Route path="track" element={<TrackList />} />
                            <Route
                                path="track/:trackId"
                                element={<div>트랙 중 특정 트랙 프로젝트</div>}
                            />
                            <Route
                                path="track/:trackId/create"
                                element={<div>팀 생성 및 게시글 작성</div>}
                            />
                            <Route
                                path="track/:trackId/:projectId"
                                element={<div>특정 프로젝트 팀의 보드</div>}
                            />
                            <Route
                                path="track/:trackId/:projectId/edit"
                                element={<UpdateTrackProjectBoard />}
                            />

                            <Route path="final" element={<FinalList />} />
                            <Route
                                path="final/:teamId"
                                element={<div>파이널 팀의 보드 리스트</div>}
                            />
                            <Route
                                path="final/create"
                                element={<CreateFinalTeam />}
                            />

                            <Route
                                path="final/:teamId/edit"
                                element={<div>파이널 팀의 정보 수정</div>}
                            />
                            <Route
                                path="final/:teamId/:boardId"
                                element={<div>파이널 팀의 보드 Detail</div>}
                            />
                            <Route
                                path="final/:teamId/create"
                                element={<CreateFinalProjectBoard />}
                            />

                            <Route
                                path="final/:teamId/:boardId/edit"
                                element={<div>파이널 팀의 보드 수정</div>}
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
                                    element={<AlgorithmConceptList />}
                                />
                                <Route
                                    path="concept/create"
                                    element={<CreateAlgorithmConcept />}
                                />
                                <Route
                                    path="concept/:conceptId"
                                    element={
                                        <div>Algorithm Concept Detail</div>
                                    }
                                />
                                <Route
                                    path="concept/:conceptId/edit"
                                    element={<UpdateAlgorithmConcept />}
                                />

                                <Route
                                    path="problem"
                                    element={<AlgorithmProblemList />}
                                />
                                <Route
                                    path="problem/create"
                                    element={<CreateAlgorithmProblem />}
                                />
                                <Route
                                    path="problem/:problemId/edit"
                                    element={<UpdateAlgorithmProblem />}
                                />
                                <Route
                                    path="problem/:problemId"
                                    element={
                                        <div>
                                            Algorithm Problem Solution List
                                        </div>
                                    }
                                />

                                <Route
                                    path="problem/:problemId/:solutionId"
                                    element={<AlgorithmProblemSolutionDetail />}
                                />
                                <Route
                                    path="problem/:problemId/create"
                                    element={<CreateAlgorithmProblemSolution />}
                                />

                                <Route
                                    path="problem/:problemId/:solutionId/edit"
                                    element={<UpdateAlgorithmProblemSolution />}
                                />
                            </Route>

                            <Route path="web">
                                <Route
                                    index
                                    element={
                                        <Navigate to="/study/web/concept?page=1" />
                                    }
                                />
                                <Route
                                    path="concept"
                                    element={<WebConceptList />}
                                />
                                <Route
                                    path="concept/create"
                                    element={<CreateWebConcept />}
                                />
                                <Route
                                    path="concept/:conceptId"
                                    element={<WebConceptDetail />}
                                />
                                <Route
                                    path="concept/:conceptId/edit"
                                    element={<UpdateWebConcept />}
                                />

                                <Route
                                    path="recommend"
                                    element={<WebRecommendList />}
                                />
                                <Route
                                    path="recommend/create"
                                    element={<CreateWebRecommend />}
                                />
                                <Route
                                    path="recommend/:recommendId"
                                    element={<WebRecommendDetail />}
                                />
                                <Route
                                    path="recommend/:recommendId/edit"
                                    element={<UpdateWebRecommend />}
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
