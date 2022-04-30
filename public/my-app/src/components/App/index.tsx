import Navbar from "../Navbar"
import { Routes, Route, Navigate } from "react-router-dom"
import RegForm from "../Forms/RegForm"
import TracksPage from "../../pages/Tracks";
import LogForm from "../Forms/LogForm";
import "./index.scss"
import { useEffect } from "react";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import FirstStep from "../FirstStep";
import SecondStep from "../SecondStep";
import ThirdStep from "../ThirdStep";
import CreateTrack from "../../pages/CreateTrack";
import Player from "../Player";
import CurrentTrackPage from "../../pages/CurrentTrackPage";
import AlbumsPage from "../../pages/AlbumsPage";
import UsersPage from "../../pages/UsersPage";
import CreateAlbum from "../../pages/CreateAlbum";
import FirstCreateAlbum from "../AlbumCreate/FirstCreateAlbum";
import SecondCreateAlbum from "../AlbumCreate/SecondCreateAlbum";
import ThirdCreateAlbum from "../AlbumCreate/ThirdCreateAlbum";
import CurrentAlbum from "../../pages/CurrentAlbum";
import TracksInAlbum from "../CurrentAlbum/TracksInAlbum";
import AddTracksFromAll from "../CurrentAlbum/AddTracksFromAll";
import Comments from "../CurrentAlbum/Comments"
import CurrentProfile from "../../pages/CurrentProfile";
import Followers from "../CurrentProfile/Followers";
import Followings from "../CurrentProfile/Followings"
import TracksInProfie from "../CurrentProfile/TracksInProfie"
import AlbumsInProfile from "../CurrentProfile/AlbumsInCurrentProfile"
import MyFriendTracks from "../../pages/MyFriendsTracks";
import MyTracks from "../../pages/MyTracks";

function App() {

  const { actionAuth } = useActions()
  const { user: { isAuth }, player: { activeTrack } } = useTypedSelector(state => state)

  useEffect(() => {
    actionAuth()
  }, [])

  return (
    <div>
      <Navbar />
      <div className="content">


        {
          isAuth ?
            <Routes>
              <Route path="/tracks" element={<TracksPage />} />
              <Route path="/tracks/:trackID" element={<CurrentTrackPage />} />
              <Route path="/create-track" element={<CreateTrack />}>
                <Route path="first" element={<FirstStep />} />
                <Route path="second" element={<SecondStep />} />
                <Route path="third" element={<ThirdStep />} />
              </Route>
              <Route path="/albums" element={<AlbumsPage />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/albums/create-album" element={<CreateAlbum />}>
                <Route path="first" element={<FirstCreateAlbum />} />
                <Route path="second" element={<SecondCreateAlbum />} />
                <Route path="third" element={<ThirdCreateAlbum />} />
              </Route>
              <Route path="/albums/:albumID" element={<CurrentAlbum/>}>
                <Route path="tracks" element={<TracksInAlbum />} />
                <Route path="add-from-all-tracks" element={<AddTracksFromAll />} />
                <Route path="add-from-my-tracks" element={<AddTracksFromAll />} />
                <Route path="comments" element={<Comments />} />
                
              </Route>
              <Route path="/users/:userID" element={<CurrentProfile />}>
                <Route path="follewers" element={<Followers />} />
                <Route path="following" element={<Followings />} />
                <Route path="tracks" element={<TracksInProfie />} />
                <Route path="albums" element={<AlbumsInProfile />} />
              </Route>

              <Route path="/my-friends-tracks" element={<MyFriendTracks />} />
              <Route path="/my-tracks" element={<MyTracks />}/>
              <Route path="*" element={<Navigate to="/tracks" />} />
            </Routes>
            :

            <Routes>
              <Route path="/auth/registr" element={<RegForm />} />
              <Route path="/auth/login" element={<LogForm />} />
              <Route path="/tracks" element={<TracksPage />} />
              <Route path="/tracks/:trackID" element={<CurrentTrackPage />} />
              <Route path="/albums" element={<AlbumsPage />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/albums/:albumID" element={<CurrentAlbum/>}>
                <Route path="tracks" element={<TracksInAlbum />} />
                <Route path="comments" element={<Comments />} />
              </Route>

              <Route path="/users/:userID" element={<CurrentProfile />}>
                <Route path="follewers" element={<Followers />} />
                <Route path="following" element={<Followings />} />
                <Route path="tracks" element={<TracksInProfie />} />
                <Route path="albums" element={<AlbumsInProfile />} />
                
              </Route>

              <Route path="*" element={<Navigate to="/auth/login" />} />
              
            </Routes>

        }





      </div>
      <Player />

    </div>
  );
}

export default App;
