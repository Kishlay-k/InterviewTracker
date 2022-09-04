/* eslint-disable eqeqeq */
import React from 'react'
import Question from '../../components/question/question';
import Page from '../../components/pagination/pagination';
import {problemset} from '../../redux/problemset/problemSetSelector';
import {getUserSelector} from '../../redux/user/userSelector';
import {connect} from 'react-redux';
import TagsComponent from '../tagsComponent/tagsComponent';

import './problemSetComponent.scss'

const ProblemSetComponent = ({ questionPerPage, paginate, page, problemset,user,topic}) => {
    const tp = topic || "All Questions";
    return (
        <div className="d-flex justify-content-around flex-wrap">
            <div className = "problemset">
                <h6>{tp}</h6>
                <ol className="list-group">
                    <li className="list-group-item d-flex">
                        <div className="pr-4">#</div>
                        <div>
                            <div>Title</div>
                        </div>
                        {
                            user ? <div className = "ml-auto">Solved</div> : null
                        }
                    </li>
                    {   
                        problemset?.map(e => {
                            let checked = user?.solved.find(el => el == e.id);
                            return <Question key={ e.id } question={ e } checked = {checked}/>
                        })
                    }
                </ol>
                <div className="pagination">
                {
                    questionPerPage ? 
                        <div>
                            <Page items ={450/questionPerPage} paginate = {paginate} page = {page}/>
                        </div>
                    : 
                        null
                }
                </div>
                
            </div>
            <TagsComponent/>
        </div>
    )
};

const mapStateToProps = (state) => ({
    problemset: problemset(state),
    user: getUserSelector(state)
});

export default connect(mapStateToProps)(ProblemSetComponent);