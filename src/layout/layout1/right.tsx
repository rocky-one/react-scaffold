import {
    Link
} from "react-router-dom";
import CreateRouter from '../../pages/createRouter'

export default (props) => {
    return <div>
        {props.children}
        <div>rightTitle</div>
        <Link to="/page2/page2_1">我是/page2/page2_1</Link>
        {
            props.routes ? <CreateRouter routes={props.routes} /> : null
        }
    </div>
}