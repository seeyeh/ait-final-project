import { Link } from 'react-router-dom'

const Public = () => {
  return (
    <section className='public'>
        <header>
            <h1>Work It Out!</h1>
        </header>
        <main className='public__main'>
            <p>
                Track your workouts, create workout templates, and more!
            </p>
        </main>
        <footer>
            <Link to="login">Login</Link>
            <Link to="dash">Dashboard</Link>
        </footer>
    </section>
  )
}

export default Public
