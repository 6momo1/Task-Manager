import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({title,addCloseButton,showAddTask}) => {
      
    return (
        <header className="header">
            <h1>{title}</h1>
            <Button color={showAddTask? "blue" : "green"} text={showAddTask? "Close" : "Add"} onClick={addCloseButton} />
        </header>
    )
}

Header.defaultProps = {
    title: "Task Tracker"
}

Header.propTypes = {
    title: PropTypes.string
}

export default Header
