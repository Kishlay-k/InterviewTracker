import React from 'react'
import { Link, withRouter } from 'react-router-dom'


const Topic = ({data, match}) => {
    console.log(match)
    return (
        <div className="tag">
            <Link to={`/problemset/topicwise/${data}`} className="badge badge-primary badge-pill">{data}</Link>
        </div>
    )
}

export default withRouter(Topic);