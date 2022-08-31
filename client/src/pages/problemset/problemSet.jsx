import React, { useEffect , useState} from 'react';
import { connect } from 'react-redux';
import { fetchQuestions } from '../../redux/problemset/problemSetActions';
import { problemset } from '../../redux/problemset/problemSetSelector';
import Question from '../../components/question/question';
import Page from '../../components/pagination/pagination';

import './problemSet.scss';

function ProblemSet({ fetchQuestions, problemset }) {

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
        <div className = 'problemset'>
            { problemset?.map(e => 
                <Question key={ e.id } question={ e }/>
                ) 
            }
            <Page items ={450/questionPerPage} paginate = {paginate} page = {page}/>
           
        </div>

        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    fetchQuestions: (page,questionsPerPage) => dispatch(fetchQuestions(page,questionsPerPage))   
});

const mapStateToProps = (state) => ({
    problemset: problemset(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(ProblemSet);