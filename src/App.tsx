import React from "react"

import { Routes, Route } from "react-router-dom"
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles"
import {ThemeProvider} from "@material-ui/styles"

import Appbar from "./components/Appbar/Appbar"
import Main from "./Pages/Main/Main"
import PartList from "./Pages/Parts/PartList"
import HelpPage from "./Pages/Help/Help"
import Builds from "./Pages/Builds/Builds"
import Parts from "./components/PartCards/PartCards"
import BuildPage from "./Pages/Builds/BuildPage/BuildPage"
import ScrollToTop from "./components/Misc/ScrollToTop"
import { QueryCache, ReactQueryCacheProvider } from "react-query"

let theme = createMuiTheme({
    palette: {
        primary: {
            main: "#FC6E20",
            contrastText: "#FFE7D0"
        },
        secondary: {
            main: '#FFE7D0',
            contrastText: "#FC6E20"
        },
        success: {
            main: "#FFE7D0"
        },
    },
})

theme = responsiveFontSizes(theme);

const queryCache = new QueryCache({
    defaultConfig: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
})

const App = () => {

    return(
        <ReactQueryCacheProvider queryCache={queryCache}>
            <ThemeProvider theme={theme} >
                <Appbar />
                <div>
                    <ScrollToTop />
                    <Routes>
                        <Route path="/builds" >
                            <Route path="/" element={<Builds />} />
                            <Route path="/:_id" element={<BuildPage />} />
                        </Route>
                        <Route path="/parts"  >
                            <Route path="/" element={<Parts />} />
                            <Route path="/:title" element={<PartList />} />
                        </Route>
                        <Route path="/help" element={<HelpPage />} />
                        <Route path="/" element={<Main />} />
                    </Routes>
                </div>
            </ThemeProvider>
        </ReactQueryCacheProvider>
        
        )
}

export default App