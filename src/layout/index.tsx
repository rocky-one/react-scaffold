import LoginLayout from './loginLayout'
import Layout1 from './layout1'

export default (props: any = {}) => {

    if (!props.type === 'login') {
        return <LoginLayout {...props} />
    }

    return <Layout1 {...props} />
}