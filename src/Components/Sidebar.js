function Sidebar() {

    let style = {
        backgroundColor: 'whitesmoke',
        height: '100%',
        width: '10%'
    };

    return (
        <div style={style}>
            <div>
                <div>Мой аккаунт</div>
                <div>Мои задачи</div>
                <div>Проекты</div>
                <div>Пользователи(админ)</div>
            </div>
        </div>
    );
}

export default Sidebar;