    import { useState } from "react";

function ProjectList() {

    let style = {
        backgroundColor: 'lightgrey',
        width: '30%' 
    };
    let projInfoStyle = {
        backgroundColor: 'whitesmoke',
        width: '30%',
        marginLeft: '10px'
    };
    let taskStyle = {
        backgroundColor: 'whitesmoke',
        margin: '10px',
        fontFamily: 'Consolas',
        padding: '10px',
        color: 'grey',
        borderRadius: '10px',
        borderStyle: "groove",
    }
    const [projects, setProjects] = useState(getProjectList());
    return (
        <>
            <div style={style}>
                <ul>
                    {projects.map(proj => <li style={taskStyle}>{proj}</li>)}
                </ul>
            </div>
            <div style={projInfoStyle}>
                <div>Проект 1</div>
                <div>Список участников</div>
                <div>Доска задач</div>
            </div>
        </>
    );
}

function getProjectList(){
    return ['Проект1', 'Проект2', 'Проект3', 'Проект4', 'Проект5', 'Проект6', 'Проект7'];
}

export default ProjectList;