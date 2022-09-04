import React from 'react'
import Question from '../../components/question/question';
import Page from '../../components/pagination/pagination';
import {problemset} from '../../redux/problemset/problemSetSelector';
import {connect} from 'react-redux';
import TagsComponent from '../tagsComponent/tagsComponent';

import './problemSetComponent.scss'

const ProblemSetComponent = ({ questionPerPage, paginate, page, problemset}) => {
    return (
        <div className="d-flex justify-content-around flex-wrap">
            <div className = "problemset">

                <ol className="list-group">
                    <li className="list-group-item d-flex">
                            <div className="pr-4">#</div>
                            <div>
                                <div>Title</div>
                            </div>
                            <div className = "ml-auto">Comment</div>
                    </li>
                    {   problemset?.map(e => 
                            <Question key={ e.id } question={ e }/>
                        )
                    }
                </ol>
                <div className="pagination">
                <Page items ={450/questionPerPage} paginate = {paginate} page = {page}/>
                </div>
            </div>
            <TagsComponent/>
        </div>
    )
};

const mapStateToProps = (state) => ({
    problemset: problemset(state)
});

export default connect(mapStateToProps)(ProblemSetComponent);