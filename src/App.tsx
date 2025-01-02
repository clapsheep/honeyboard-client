import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import MainLayout from './layouts/MainLayout';
import PrivateRoute from './layouts/PrivateRoute';
import {
    AdditionalInfoOAuth,
    AlgorithmConceptList,
    AlgorithmProblemList,
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
    PlayList,
    Schedule,
    SignUp,
    StudentManagement,
    TrackList,
    WebConceptDetail,
    WebConceptList,
    WebRecommendDetail,
    WebRecommendList,
} from './pages';

import { BasicModal } from './components/organisms';
import { useModalStore } from './stores/modalStore';
import { useUserStore } from './stores/userStore';

function App() {
    const { userInfo } = useUserStore();
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
                <Route element={<PrivateRoute isAuthenticated={!!userInfo} />}>
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
                                element={
                                    <div>특정 프로젝트 팀의 보드 수정</div>
                                }
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
                                element={<div>파이널 팀의 보드생성</div>}
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
                                    element={<div>Algorithm Concept Edit</div>}
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
                                    element={<div>Algorithm Problem Edit</div>}
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
                                    element={
                                        <div>Algorithm Problem Solution</div>
                                    }
                                />
                                <Route
                                    path="problem/:problemId/create"
                                    element={<CreateAlgorithmProblemSolution />}
                                />

                                <Route
                                    path="problem/:problemId/:solutionId/edit"
                                    element={
                                        <div>
                                            Algorithm Problem Solution Edit
                                        </div>
                                    }
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
                                    element={<div>Web Edit</div>}
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
                                    path="recommend/:recomendId"
                                    element={<WebRecommendDetail />}
                                />
                                <Route
                                    path="recommend/:recomendId/edit"
                                    element={<div>Web Edit</div>}
                                />
                            </Route>
                        </Route>
                        <Route path="music">
                            <Route
                                index
                                element={<Navigate to="/music/list" />}
                            />
                            <Route path="list" element={<PlayList />} />
                            <Route
                                path="search"
                                element={<div>Search Music</div>}
                            />
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
                        <Route path="mypage" element={<div>My Page</div>}>
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
                                path="project"
                                element={<div>my project</div>}
                            >
                                <Route
                                    path="track"
                                    element={<div>my track</div>}
                                />
                                <Route
                                    path="final"
                                    element={<div>my final</div>}
                                />
                            </Route>
                            <Route
                                path="algorithm"
                                element={<div>my algorithm</div>}
                            />
                            <Route
                                path="bookmark"
                                element={<div>my bookmark</div>}
                            >
                                <Route
                                    index
                                    element={
                                        <Navigate
                                            to="/mypage/bookmark/algorithm/concept"
                                            replace
                                        />
                                    }
                                />
                                <Route path="algorithm/concept" />
                                <Route path="algorithm/problem" />
                                <Route path="web/concept" />
                                <Route path="web/recomend" />
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
