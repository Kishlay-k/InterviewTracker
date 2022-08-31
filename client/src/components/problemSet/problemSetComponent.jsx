import React from 'react'
import Question from '../../components/question/question';
import Page from '../../components/pagination/pagination';
import { problemset } from '../../redux/problemset/problemSetSelector';
import { connect } from 'react-redux'

import './problemSetComponent.scss'

const ProblemSetComponent = ({ questionPerPage, paginate, page, problemset}) => {
    return (
        <div className = 'problemset'>
            <ol className="list-group list-group-flush">
                {   problemset?.map(e => 
                        <Question key={ e.id } question={ e }/>
                    )
                }
            </ol>
            <div className="pagination">
            <Page items ={450/questionPerPage} paginate = {paginate} page = {page}/>
            </div>
        </div>
    )
};

const mapStateToProps = (state) => ({
    problemset: problemset(state)
});

export default connect(mapStateToProps)(ProblemSetComponent);