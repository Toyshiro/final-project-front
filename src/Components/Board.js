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
    let buttonStyle = {
        borderRadius: '5px',
        borderColor: 'grey',
        float: "right"
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
        
        const curIndex = currentTrack.tasks.indexOf(currentTask);
        currentTrack.tasks.splice(curIndex, 1);

        const dropIndex = track.tasks.indexOf(task);
        track.tasks.splice(dropIndex + 1, 0, currentTask);
        
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

    function showAddPanel(e){
        e.target.parentNode.parentNode.getElementsByClassName('addTask')[0].style.display = 'block';
    }
    function hideAddPanel(e){
        e.target.parentNode.style.display = 'none';
    }

    function addTaskQuary(task){
        //todo запрос к бд
        return {
            taskId: Math.floor(Math.random() * (10000 - 1000) + 1000),
            taskName: task.taskName,
            taskPriority: task.taskPriority,
            taskState: task.taskState,
            execId: task.execId
        };
    }

    function addTask(e){
        let elem = e.target.parentNode;
        let selects = elem.getElementsByTagName('select');
        let state = elem.parentNode.id;
        let stateArr = ['backlog', 'inprogress', 'done']; //TODO
        let newTask = {
            taskName: elem.getElementsByTagName('input')[0].value,
            taskPriority: selects[0].value,
            taskState: stateArr.indexOf(state),
            execId: selects[1].value
        };
        console.error(newTask);
        var result = addTaskQuary(newTask);
        hideAddPanel(e);
        setTracks(tracks.map((track, index) => {
            if(index == result.taskState){
                track.tasks.splice(0, 0, result);
                return track;
            }
            return track;
        }));
    }
    var executors = getExecutorsList();

    return (
        <div style={trackPlaceStyle}>
            {
                tracks.map(track =>
                    <div style={trackStyle} id={track.id}>
                        <div
                            onDragStart={(e) => dragStartHandler(e, track, null)}
                            onDragEnd={(e) => dragEndHandler(e)}
                            onDragOver={(e) => dragOverHandler(e)}
                            onDragLeave={(e) => dragLeaveHandler(e)}
                            onDrop={(e) => dragDropHandler(e, track, null)}
                            style={taskStyle} className="taskItem">
                            {track.id}
                            <button style={buttonStyle} onClick={(e) => showAddPanel(e)}>+</button>
                        </div>
                        <div style={taskStyle} className='addTask'
                        >
                            <input style={taskSignatureStyle}></input>
                            <select style={taskDropdownButtonStyle}>
                                <option value={0} >low</option>
                                <option value={1}>normal</option>
                                <option value={2}>major</option>
                                <option value={4}>critical</option>
                            </select>
                            <select style={taskDropdownButtonStyle}>
                                {executors.map((item) => <option value={item.id}>{item.name}</option>)}
                            </select>
                            <button style={buttonStyle} onClick={(e) => hideAddPanel(e)}>Отмена</button>
                            <button style={buttonStyle} onClick={(e) => addTask(e)}>Добавить</button>
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
                                        <option selected={task.taskPriority == 0}>low</option>
                                        <option selected={task.taskPriority == 1}>normal</option>
                                        <option selected={task.taskPriority == 2}>major</option>
                                        <option selected={task.taskPriority == 3}>critical</option>
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