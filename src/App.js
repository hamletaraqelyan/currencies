import React, {Fragment} from "react";
import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home/home";
import Header from "./components/header/header";
import ChatBot from "./components/chatBot/chatBot";

const App = () => {
    return (
        <Fragment>
            <Header/>
            <main className='main'>
                <Routes>
                    <Route exact path='/' element={<Home/>}/>
                </Routes>
            </main>
            <ChatBot/>
        </Fragment>
    );
}

export default App;
