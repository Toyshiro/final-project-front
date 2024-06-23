import Board from './Board';
import ProjectList from './ProjectList';
import UserInfo from './UserInfo';

function Sidebar(props) {

    let style = {
        backgroundColor: 'whitesmoke',
        height: '100%',
        width: '10%'
    };

    let buttonStyle = {
        borderRadius: '5px',
        borderColor: 'grey',
        display: 'flex',
        margin: '10px',
        width: '90%'
    }

    function getPlace(e){
        switch(e.target.name){
            case 'userInfo':
                return props.handlePlace(<UserInfo />);
                case 'board':
                return props.handlePlace(<Board />);
                case 'projectList':
                return props.handlePlace(<ProjectList />);
            default:
                return <></>;
        }
    }

    return (
        <div style={style}>
            <div>
                <button className="focus" style={buttonStyle} name='userInfo' onClick={getPlace}>Мой аккаунт</button>
                <button className='focus' style={buttonStyle} name='board' onClick={getPlace}>Мои задачи</button>
                <button className='focus' style={buttonStyle} name='projectList' onClick={getPlace}>Проекты</button>
                <button className='focus' style={buttonStyle} name='userInfo' onClick={getPlace}>Пользователи(админ)</button>
            </div>
        </div>
    );
}

export default Sidebar;