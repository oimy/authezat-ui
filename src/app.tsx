import SigninPage from "./main/pages/signin";
import "./css/app.scss";
import {BrowserRouter, Route, Routes} from "react-router";
import Index from "./main/pages";
import {ROUTE_MILESTONES} from "./routes.ts";

function App() {
    return (<>
        <main>
            <BrowserRouter>
                <Routes>
                    <Route path="/auth/signin" element={<Index title={"오테자 - 로그인"}><SigninPage/></Index>}/>
                    <Route path="/error/found" element={<Index title={"페이지를 찾을 수 없습니다"}><SigninPage/></Index>}/>

                    {ROUTE_MILESTONES.map((route) =>
                        <Route path={route.path}
                               element={<Index title={route.title}>
                                   <route.page/>
                               </Index>}>
                        </Route>)}
                    {/*<Route path="*" element={<Navigate to="/error/found" replace/>}/>*/}
                </Routes>
            </BrowserRouter>
        </main>
    </>);
}

export default App;
