import React from 'react';
import { closeModal } from '../../actions/modal_action';
import { connect } from 'react-redux';

import AddPlaylistForm from './add_playlist_form';
import AddSongToPlaylist from './add_songToPlaylist';


function ModalPlaylists({modal, closeModal}) {
    if (!modal) {
        return null;
    }
    let component;
    
    switch (modal) {
        case 'newPlaylist':
            component = <AddPlaylistForm />;
            break;
        case 'addSong':
            component = <AddSongToPlaylist />;
            break;
        default:
            return null;
    }
    return(
        <div className="modal-background">
            <div className="modal-child" onClick={e => e.stopPropagation()}>
                { component }
            </div>
        </div>
    )
}



const msp = state => ({
    // currentUserId: state.session.currentUser.id,
    modal: state.ui.modal
});


const mdp = dispatch => ({
    closeModal: () => dispatch(closeModal())
});

export default connect(msp, mdp)(ModalPlaylists);