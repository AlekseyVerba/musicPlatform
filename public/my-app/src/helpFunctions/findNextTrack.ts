import { ITrack } from "../types/track/"

export const findNextTrack = (trackID: string, tracks: ITrack[]) => {
    const nextTrackID = tracks.findIndex(track => track._id === trackID)
    
    if (tracks[nextTrackID + 1]) {
        return tracks[nextTrackID + 1]
    } else {
        return tracks[0]
    }
}