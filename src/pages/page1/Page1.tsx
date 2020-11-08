
import React from 'react'
import Count from '../../containers/count'

class Test extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        console.log(8989)
    }
    render() {
        return <div>test</div>
    }
}

export default function Page1(props: any) {
    return <div>
        page1
        <Count test={Test}/>
    </div>
}