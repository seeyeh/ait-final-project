import { Link } from 'react-router-dom'

const DashHeader = () => {
  return (
    <header className='dash-header'>
        <div className="dash-header__container">
            <Link>
                <h1>Dash Header</h1>
            </Link>
        </div>
    </header>
  )
}

export default DashHeader
