import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import MainLayout from './layouts/MainLayout';
import {
    AdditionalInfoOAuth,
    Error404,
    Login,
    PlayList,
    SignUp,
} from './pages';
import LoginCallback from './pages/LoginCallback';
import Schedule from './pages/Schedule';

function App() {
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

                <Route element={<MainLayout />}>
                    <Route path="/" element={<Schedule />} />
                    <Route
                        path="track"
                        element={<div>모든 트랙 프로젝트 리스트</div>}
                    >
                        <Route
                            path="create"
                            element={<div>트랙 프로젝트 생성</div>}
                        />
                        <Route
                            path=":trackId"
                            element={<div>트랙 중 특정 트랙 프로젝트</div>}
                        >
                            <Route
                                path="create"
                                element={<div>팀 생성 및 게시글 작성</div>}
                            />
                            <Route
                                path=":projectId"
                                element={<div>특정 프로젝트 팀의 보드</div>}
                            >
                                <Route
                                    path="edit"
                                    element={
                                        <div>특정 프로젝트 팀의 보드 수정</div>
                                    }
                                />
                            </Route>
                        </Route>
                    </Route>
                    <Route path="final" element={<div>파이널 리스트</div>}>
                        <Route
                            path=":teamId"
                            element={<div>파이널 팀의 보드 리스트</div>}
                        >
                            <Route
                                path="create"
                                element={<div>파이널 팀생성</div>}
                            />

                            <Route
                                path="edit"
                                element={<div>파이널 팀의 정보 수정</div>}
                            />
                            <Route
                                path=":boardId"
                                element={<div>파이널 팀의 보드 Detail</div>}
                            >
                                <Route
                                    path="create"
                                    element={<div>파이널 팀의 보드생성</div>}
                                />

                                <Route
                                    path="edit"
                                    element={<div>파이널 팀의 보드 수정</div>}
                                />
                            </Route>
                        </Route>
                    </Route>
                    <Route path="algorithm">
                        <Route
                            index
                            element={
                                <Navigate to="/algorithm/concept" replace />
                            }
                        />
                        <Route
                            path="concept"
                            element={<div>Algorithm Concept</div>}
                        >
                            <Route
                                path="create"
                                element={<div>Algorithm Concept Create</div>}
                            />
                            <Route
                                path=":conceptId"
                                element={<div>Algorithm Concept Detail</div>}
                            />
                            <Route
                                path="edit"
                                element={<div>Algorithm Concept Edit</div>}
                            />
                        </Route>
                        <Route
                            path="problem"
                            element={<div>Algorithm Problem</div>}
                        >
                            <Route
                                path="create"
                                element={<div>Algorithm Problem Create</div>}
                            />
                            <Route
                                path=":problemId"
                                element={<div>Algorithm Problem Detail</div>}
                            >
                                <Route
                                    path="edit"
                                    element={<div>Algorithm Problem Edit</div>}
                                />
                            </Route>

                            <Route
                                path="solution"
                                element={<div>Algorithm Problem Solution</div>}
                            >
                                <Route
                                    path="create"
                                    element={
                                        <div>Algorithm Problem Solution</div>
                                    }
                                />
                                <Route
                                    path=":solutionId"
                                    element={
                                        <div>Algorithm Problem Solution</div>
                                    }
                                >
                                    <Route
                                        path="edit"
                                        element={
                                            <div>
                                                Algorithm Problem Solution
                                            </div>
                                        }
                                    />
                                </Route>
                            </Route>
                        </Route>
                    </Route>
                    <Route path="web" element={<div>Web</div>}>
                        <Route path="concept" element={<div>Web Concept</div>}>
                            <Route
                                path="create"
                                element={<div>Web Create</div>}
                            />
                            <Route
                                path=":conceptId"
                                element={<div>Web Detail</div>}
                            >
                                <Route
                                    path="edit"
                                    element={<div>Web Edit</div>}
                                />
                            </Route>
                        </Route>
                        <Route
                            path="recomend"
                            element={<div>Web Recomend</div>}
                        >
                            <Route
                                path="create"
                                element={<div>Web Create</div>}
                            />
                            <Route
                                path=":recomendId"
                                element={<div>Web Detail</div>}
                            >
                                <Route
                                    path="edit"
                                    element={<div>Web Edit</div>}
                                />
                            </Route>
                        </Route>
                    </Route>
                    <Route path="music">
                        <Route index element={<Navigate to="/music/list" />} />
                        <Route path="list" element={<PlayList />} />
                        <Route
                            path="search"
                            element={<div>Search Music</div>}
                        />
                    </Route>
                    <Route path="admin" element={<div>Admin</div>}>
                        <Route
                            index
                            element={<Navigate to="/admin/student" replace />}
                        />
                        <Route
                            path="student"
                            element={<div>Admin Student</div>}
                        />
                        <Route
                            path="generation"
                            element={<div>generation Student</div>}
                        />
                    </Route>
                    <Route path="mypage" element={<div>My Page</div>}>
                        <Route
                            index
                            element={
                                <Navigate to="/mypage/project/track" replace />
                            }
                        />
                        <Route path="project" element={<div>my project</div>}>
                            <Route path="track" element={<div>my track</div>} />
                            <Route path="final" element={<div>my final</div>} />
                        </Route>
                        <Route
                            path="algorithm"
                            element={<div>my algorithm</div>}
                        />
                        <Route path="bookmark" element={<div>my bookmark</div>}>
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

                <Route path="*" element={<Error404 />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
