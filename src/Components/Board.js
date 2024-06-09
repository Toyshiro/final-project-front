import Track from './Track';

function Board() {

    let trackPlaceStyle = {
        backgroundColor: 'lightgrey',
        width: '50%',
        margin: '10px',
        display: 'flex',
        borderRadius: '10px'
    }

    return (
        <div style={trackPlaceStyle}>
            <Track trackType='backlog'/>
            <Track trackType='inprogress'/>
            <Track trackType='done'/>
        </div>
    );
}

export default Board;