import { useDispatch } from "react-redux";
import SearchStats from "./search-stats";
import { BsXLg } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { AiFillCheckCircle } from "react-icons/ai";

const SearchItem = ({ search }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMessageClick = () => {
    // Handle message button click here
    // You can dispatch an action or perform any other logic
  };
  const handleFollowClick = () => {
    // Handle follow button click here
    // You can dispatch an action or perform any other logic
  };

  const handleUsernameClick = () => {
    navigate(`/details/${search.searchUserName}`);
  };

  return (
    <>
      <li className="list-group-item">
        <div className="row">
          <div className="col-auto">
            <img
              width={50}
              className="float-end rounded-circle"
              src={`${search.profilePicture}`}
              height={48}
              width={48}
            />
          </div>
          <div className="col-10">
            <div className="tuit-info">
              <span
                className="fw-bolder username-link"
                onClick={handleUsernameClick}
              >
                {search.firstName}
              </span>
              <span className="handle">{search.lastName}</span>
              <button
                className="float-end follow-button"
                onClick={handleFollowClick}
              >
                Follow
              </button>

              <button
                className="float-end message-button"
                onClick={handleMessageClick}
              >
                Message
              </button>
            </div>
          </div>
          <div className="col-auto">
            <div className="tuit-stats-container">
              <SearchStats search={search} />
            </div>
          </div>
        </div>
      </li>
    </>
  );
};

export default SearchItem;
