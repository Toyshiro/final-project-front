import { useState } from 'react';

function Board() {

    let trackPlaceStyle = {
        backgroundColor: 'lightgrey',
        width: '50%',
        margin: '10px',
        display: 'flex',
        borderRadius: '10px'
    }
    let trackStyle = {
        backgroundColor: 'rgb(85, 82, 82)',
        height: '100%',
        width: '30%',
        margin: '10px',
        borderRadius: '10px'
    }
    let taskStyle = {
        backgroundColor: 'whitesmoke',
        margin: '10px',
        fontFamily: 'Consolas',
        padding: '10px',
        color: 'grey',
        borderRadius: '10px',
        borderStyle: "groove",
        cursor: 'grab'
    }
    let taskSignatureStyle = {
        marginTop: '10px',
        paddingLeft: '10px'
    }
    let taskDropdownButtonStyle = {
        borderRadius: '10px',
        borderColor: 'grey',
        borderStyle: 'groove',
        paddingLeft: '10px',
        marginTop: '10px',
        width: '100%',
        backgroundColor: 'whitesmoke'
    }

    const [tracks, setTracks] = useState(getBoard('testIdTODO'));
    const [currentTrack, setCurrentTrack] = useState(null);
    const [currentTask, setCurrentTask] = useState(null);

    function dragStartHandler(e, track, task) {
        setCurrentTrack(track);
        setCurrentTask(task);
    }
    function dragLeaveHandler(e) {
        e.target.style.boxShadow = 'none';
    }
    function dragEndHandler(e) {
        e.target.style.boxShadow = 'none';
    }
    function dragOverHandler(e) {
        e.preventDefault();
        if (e.target.className == 'taskItem') {
            e.target.style.boxShadow = '0 4px 3px blue';
        }
    }
    function dragDropHandler(e, track, task) {
        e.preventDefault();
        console.log(currentTrack);
        console.log(currentTask);
        console.log(tracks);

        const curIndex = currentTrack.tasks.indexOf(currentTask);
        currentTrack.tasks.splice(curIndex, 1);

        const dropIndex = track.tasks.indexOf(task);
        track.tasks.splice(dropIndex + 1, 0, currentTask);

        let res = tracks.map(t => {
            if (t.id == track.id) {
                return track;
            }
            if (t.id == currentTrack.id) {
                return currentTrack;
            }
            return t;
        })

        console.error(res);


        setTracks(tracks.map(t => {
            if (t.id == track.id) {
                return track;
            }
            if (t.id == currentTrack.id) {
                return currentTrack;
            }
            return t;
        }));
    }

    function getExecutorsList() {
        return [
            { id: "1", name: 'Иванов И. И.' },
            { id: "2", name: 'Петров П. П.' },
            { id: "3", name: 'Жмышенко В. А.' },
            { id: "4", name: 'Детров Д. В.' },
        ]
    }

    var executors = getExecutorsList();

    return (
        <div style={trackPlaceStyle}>
            {
                tracks.map(track =>
                    <div style={trackStyle}>
                        <div
                            onDragStart={(e) => dragStartHandler(e, track, null)}
                            onDragEnd={(e) => dragEndHandler(e)}
                            onDragOver={(e) => dragOverHandler(e)}
                            onDragLeave={(e) => dragLeaveHandler(e)}
                            onDrop={(e) => dragDropHandler(e, track, null)}
                            style={taskStyle} className="taskItem">
                            {track.id}
                        </div>

                        {
                            track.tasks.map(task =>
                                <div style={taskStyle}
                                    draggable={true}
                                    onDragStart={(e) => dragStartHandler(e, track, task)}
                                    onDragLeave={(e) => dragLeaveHandler(e)}
                                    onDragEnd={(e) => dragEndHandler(e)}
                                    onDragOver={(e) => dragOverHandler(e)}
                                    onDrop={(e) => dragDropHandler(e, track, task)}
                                    className="taskItem"
                                >
                                    <span style={taskSignatureStyle}>{task.taskId}</span>
                                    <span style={taskSignatureStyle}>{task.taskName}</span>
                                    <select style={taskDropdownButtonStyle}>
                                        <option selected={task.taskPriority == 1}>low</option>
                                        <option selected={task.taskPriority == 2}>normal</option>
                                        <option selected={task.taskPriority == 3}>major</option>
                                        <option selected={task.taskPriority == 4}>critical</option>
                                    </select>
                                    <select style={taskDropdownButtonStyle}>
                                        {executors.map((item) => <option selected={task.execId == item.id}>{item.name}</option>)}
                                    </select>
                                </div>
                            )
                        }
                    </div>
                )}
        </div>
    );
}

function getBoard(projectId) {
    return [
        {
            id: 'backlog',
            tasks: [
                {
                    taskId: '1',
                    taskName: 'Наименование задачи',
                    taskPriority: 1,
                    taskState: 0,
                    execId: 1
                },
                {
                    taskId: '1337',
                    taskName: 'Очень длинное наименование задачи',
                    taskPriority: 3,
                    taskState: 0,
                    execId: 2
                },
                {
                    taskId: '148888',
                    taskName: 'Очень очень очень очень очень очень очень длинное наименование задачи',
                    taskPriority: 4,
                    taskState: 0,
                    execId: 3
                }
            ]

        },
        {
            id: 'inprogress',
            tasks: [
                {
                    taskId: '12',
                    taskName: 'Наименование задачи',
                    taskPriority: 1,
                    taskState: 1,
                    execId: 4
                },
                {
                    taskId: '148288',
                    taskName: 'Очень очень очень очень очень очень очень длинное наименование задачи',
                    taskPriority: 4,
                    taskState: 1,
                    execId: 1
                }
            ]
        },
        {
            id: 'done',
            tasks: [
                {
                    taskId: '22222',
                    taskName: 'Очень очень очень очень очень очень очень длинное наименование задачи',
                    taskPriority: 4,
                    taskState: 2,
                    execId: 3
                }
            ]
        }

    ]
}

export default Board;