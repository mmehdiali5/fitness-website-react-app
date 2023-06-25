import React, {useEffect} from "react";
import {useLocation} from "react-router-dom";
import Feed from "../Feed/feed";
import NavigationSidebar from "../nav/index.js";
import SearchList from "./search-list.js";

import {getAllUsersThunk} from "../services/follow-thunks";

function Search() {
    const location = useLocation();
    const searchQuery = new URLSearchParams(location.search).get("query");

    return (
        <div style={{backgroundColor: "#f2f2f2"}}>

            <Feed/>

            <div className="row">
                <div className="col-2 wd-nav">
                    <NavigationSidebar/>
                </div>
                <div className="col-1">
                </div>
                <div className="col-6 wd-post">
                    <SearchList searchKeyword={searchQuery}/>
                </div>
            </div>
        </div>
    );

};

export default Search;