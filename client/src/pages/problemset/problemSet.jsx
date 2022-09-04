import React, { useEffect , useState } from 'react';
import { connect } from 'react-redux';
import { fetchQuestions } from '../../redux/problemset/problemSetActions';
import { isLoaded } from '../../redux/problemset/problemSetSelector';
import ProblemSetComponent from '../../components/problemSet/problemSetComponent';
import WithSpinner from '../../components/withSpinner/withSpinner';
import QuestionDetail from '../../pages/questionDetail/questionDetail';
import {Route, Switch} from 'react-router-dom';
import TopicWiseQuestions from '../topicWiseQuestions/topicWiseQuestions'

const ProblemSetWithSpinner = WithSpinner(ProblemSetComponent);

const Error404 = () => {
    return <h1>Error</h1>;
  }

function ProblemSet({ fetchQuestions, isLoaded, match }) {
    const [page,setPage] = useState(1);
    const [questionPerPage, setQuestionPerPage] = useState(50);

    useEffect(() => {
        const fetch = (page,questionPerPage)=>{
            fetchQuestions(page,questionPerPage);
        }
        fetch(page,questionPerPage);
    },[page,questionPerPage,fetchQuestions]);

    const paginate = (page) =>{
        setPage(page);
        setQuestionPerPage(50);
    }
    
    return (
        <div>
            <div>
                <Switch>
                    <Route exact path = {`${match.path}`}><ProblemSetWithSpinner paginate={ paginate } page = { page } questionPerPage={ questionPerPage } isLoading = { !isLoaded }/></Route>
                    <Route exact path = {`${match.path}/problem/:index`}><QuestionDetail/></Route>
                    <Route exact path = {`${match.path}/topicwise/:topic`}><TopicWiseQuestions/></Route>
                    <Route path = "*" component = {Error404} />
                </Switch>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    fetchQuestions: (page,questionPerPage) => dispatch(fetchQuestions(page,questionPerPage))   
});

const mapStateToProps = (state) => ({
    isLoaded: isLoaded(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(ProblemSet);