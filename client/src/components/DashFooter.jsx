import { useNavigate, useLocation } from 'react-router-dom'

const DashFooter = () => {

    const navigate = useNavigate()
    const { pathname } = useLocation()
    const onGoHomeClicked = () => navigate('/dash')

    let goHomeButton = null
    if(pathname !== '/dash') {
        goHomeButton = (
            <button
                className='dash-footer__button'
                title='Home'
                onClick={onGoHomeClicked}
            >
                Home
            </button>

        )
    }
    return (
        <footer className="dash-footer">
            {goHomeButton}
            <p>Dash Footer</p>
        </footer>
    )
}

export default DashFooter
