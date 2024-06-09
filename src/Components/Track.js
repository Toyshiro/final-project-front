import Task from './Task';

function Track(props) {

    let trackStyle = {
        backgroundColor: 'rgb(85, 82, 82)',
        height: '100%',
        width: '30%',
        margin: '10px',
        borderRadius: '10px'
    }
    let result = getTasksList(props.trackType);
    //console.warn(result);
    return (
        <div style={trackStyle}>
            {[...Array(result.length)].map((item, index) => <Task props={result[index]}/>)}
        </div>
    );
}

function getTasksList(tracktype) {
    switch (tracktype) {
        case 'backlog':
            return [
                {
                    taskId: '1',
                    taskName: 'Наименование задачи',
                    taskPriority: 1
                },
                {
                    taskId: '1337',
                    taskName: 'Очень длинное наименование задачи',
                    taskPriority: 3
                },
                {
                    taskId: '148888',
                    taskName: 'Очень очень очень очень очень очень очень длинное наименование задачи',
                    taskPriority: 4
                }

            ];
        case 'inprogress':
            return [
                {
                    taskId: '12',
                    taskName: 'Наименование задачи',
                    taskPriority: 1
                },
                {
                    taskId: '148288',
                    taskName: 'Очень очень очень очень очень очень очень длинное наименование задачи',
                    taskPriority: 4
                }

            ];
        case 'done':
            return [
                {
                    taskId: '22222',
                    taskName: 'Очень очень очень очень очень очень очень длинное наименование задачи',
                    taskPriority: 4
                }
            ];
    }
}

export default Track;