import * as userActionCreators from "./userActionCreators"
import * as trackActionCreators from "./trackActionCreators"
import * as createTrackActionCreators from "./createTrackActionCreator"
import * as playerActionCreators from "./playerActionCreator"
import * as albumActionCreators from "./albumActionCreator"
import * as userListActionCreators from "./userListActionCreators"
import * as createAlbumActionCreators from "./createAlbumActionCreators"
import * as currentAlbumActionCreator from "./currentAlbumCreatorAction"
import * as currentProfileActionCreator from "./currentProfileCreatorActions"
import * as filterActionCreators from "./filterActionCreators"
import * as tracksFromFollowing from "./tracksFromFollowingCreatorAction"

export default {
    ...userActionCreators,
    ...trackActionCreators,
    ...createTrackActionCreators,
    ...playerActionCreators,
    ...albumActionCreators,
    ...userListActionCreators,
    ...createAlbumActionCreators,
    ...currentAlbumActionCreator,
    ...currentProfileActionCreator,
    ...filterActionCreators,
    ...tracksFromFollowing
}