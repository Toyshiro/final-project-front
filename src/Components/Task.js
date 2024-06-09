function Task(props) {

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

    //console.warn(props)
    let result = getExecutorsList(props.props.taskId);
    return (
        <div style={taskStyle}>
            <span style={taskSignatureStyle}>{props.props.taskId}</span>
            <span style={taskSignatureStyle}>{props.props.taskName}</span>
            <select style={taskDropdownButtonStyle}>
                <option selected={props.props.taskPriority == 1}>low</option>
                <option selected={props.props.taskPriority == 2}>normal</option>
                <option selected={props.props.taskPriority == 3}>major</option>
                <option selected={props.props.taskPriority == 4}>critical</option>
            </select>
            <select style={taskDropdownButtonStyle}>
                {[...Array(result.length)].map((item, index) => <option selected = {result[index].selected}>{result[index].name}</option>)}
            </select>
        </div>
    );
}
//TODO доработать получение чтобы не дергать апи на каждую таску
function getExecutorsList(taskId){
    return [
        {selected: taskId == "1", name: 'Иванов И. И.'}, 
        {selected: taskId == "1337", name: 'Петров П. П.'},
        {selected: taskId == "148888", name:  'Жмышенко В. А.'},
        {selected: taskId == "12", name:  'Детров Д. В.'},
        {selected: taskId == "148288", name:  'Цист Я. Н.'},
        {selected: taskId == "22222", name:  'Детров Б. Д.'}
    ]
}


export default Task;